/**
 * Chrome 101 CSS audit. Run after `npm run build`: `npm run check:css`.
 *
 * Parses the built CSS and reports every property, value, selector or at-rule that Chrome 101
 * does not support, unless it is already safe:
 *   - it sits inside an @supports block that tests for that feature (progressive enhancement), AND
 *     the same selector sets the same property outside @supports (the fallback Chrome 101 uses), or
 *   - a -webkit- prefixed twin is declared in the same rule.
 * Exits with code 1 when something is unsafe, so it can guard CI.
 */
import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const dir = "dist/assets";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".css"));
if (!files.length) throw new Error("No CSS in dist/assets. Run `npm run build` first.");

// Features newer than Chrome 101, with the version that introduced them.
const PROPS = {
	translate: 104,
	scale: 104,
	rotate: 104,
	"scrollbar-width": 121,
	"scrollbar-color": 121,
	"mask-image": 120,
	"mask-composite": 120,
	"mask-size": 120,
	"mask-position": 120,
	"mask-repeat": 120,
	"mask-mode": 120,
	"text-wrap": 114,
	"text-wrap-style": 130,
	"container-type": 105,
	"container-name": 105,
	container: 105,
	"field-sizing": 123,
	"view-transition-name": 111,
	"anchor-name": 125,
	"position-anchor": 125,
	"interpolate-size": 129,
	"transition-behavior": 117,
	overlay: 117,
	"text-box": 133,
	"margin-trim": 999,
};
const VALUES = [
	[/color-mix\(/i, "color-mix()", 111],
	[/\boklch\(/i, "oklch()", 111],
	[/\boklab\(/i, "oklab()", 111],
	[/(^|[^a-z-])lch\(/i, "lch()", 111],
	[/(^|[^a-z-])lab\(/i, "lab()", 111],
	[/\bin (oklab|oklch|srgb|srgb-linear|lab|lch|hsl|hwb|xyz|display-p3)\b/i, "gradient colour interpolation (in …)", 111],
	[/\bfrom\s+(#|rgb|hsl|var|currentcolor)/i, "relative colour (from …)", 119],
	[/light-dark\(/i, "light-dark()", 123],
	[/\d(dvh|svh|lvh|dvw|svw|lvw|dvi|svi|dvb|svb)\b/i, "dynamic viewport units", 108],
	[/\d(cqw|cqh|cqi|cqb|cqmin|cqmax)\b/i, "container query units", 105],
	[/\d(rlh|rcap|rch|rex|ric)\b/i, "root font units", 111],
	[/\blinear\(/i, "linear() easing", 113],
	[/\b(round|mod|rem)\(/i, "stepped value functions", 125],
	[/\b(sin|cos|tan|asin|acos|atan|atan2)\(/i, "trig functions", 111],
	[/\b(pow|sqrt|hypot|log|exp)\(/i, "exponential functions", 120],
	[/\bcalc-size\(/i, "calc-size()", 129],
	[/\banchor\(/i, "anchor()", 125],
];
const SELECTORS = [
	[/:has\(/, ":has()", 105],
	[/(^|[\s,>+~(])&/, "native nesting (&)", 112],
	[/:user-(valid|invalid)/, ":user-valid", 119],
	[/:popover-open/, ":popover-open", 114],
	[/::(details-content|picker|scroll-marker)/, "new pseudo-elements", 131],
];
const AT_RULES = { container: 105, scope: 118, "starting-style": 117, "position-try": 125, "view-transition": 126 };

/** @supports condition text of every ancestor */
const supportsOf = (node) => {
	const out = [];
	for (let p = node.parent; p; p = p.parent) if (p.type === "atrule" && p.name === "supports") out.push(p.params);
	return out.join(" && ");
};
const testsFor = (cond, needle) => cond.toLowerCase().includes(needle);

const problems = [];
for (const file of files) {
	const root = postcss.parse(fs.readFileSync(path.join(dir, file), "utf8"));

	const css = root.toString();
	// every declaration, grouped by selector + property, to look for fallbacks
	const bySelectorProp = new Map();
	const selectorsOf = (rule) => rule.selectors ?? [rule.selector];
	root.walkDecls((d) => {
		if (d.parent.type !== "rule") return;
		for (const sel of selectorsOf(d.parent)) {
			const key = `${sel}|${d.prop}`;
			if (!bySelectorProp.has(key)) bySelectorProp.set(key, []);
			bySelectorProp.get(key).push(d);
		}
	});
	const isModern = (value) => VALUES.some(([re]) => re.test(value));
	/**
	 * A fallback is the same selector + property declared somewhere Chrome 101 applies it
	 * (outside the feature's @supports, or inside an @supports not (…) override) with a value
	 * Chrome 101 understands.
	 */
	const hasFallback = (d) =>
		selectorsOf(d.parent).every((sel) =>
			(bySelectorProp.get(`${sel}|${d.prop}`) ?? []).some((o) => {
				if (o === d || isModern(o.value)) return false;
				const cond = supportsOf(o).toLowerCase();
				return !cond || cond.includes("not (") || !/color-mix|lab|lch|oklab|oklch| in /.test(cond);
			})
		);
	const hasWebkitTwin = (d) => d.parent.nodes?.some((n) => n.type === "decl" && n.prop === `-webkit-${d.prop}`);
	// covered globally: transforms rebuilt from Tailwind's --tw-* vars, WebKit scrollbar hiding
	const globallyCovered = (d) =>
		((d.prop === "translate" || d.prop === "scale") &&
			/var\(--tw-(translate|scale)/.test(d.value) &&
			css.includes("@supports not (translate")) ||
		(d.prop === "scrollbar-width" && d.value === "none" && css.includes("::-webkit-scrollbar{display:none}"));
	const where = (n) => (n.parent?.selector ?? n.parent?.params ?? "").slice(0, 90);

	root.walkAtRules((a) => {
		if (AT_RULES[a.name]) problems.push({ file, what: `@${a.name}`, since: AT_RULES[a.name], where: a.params.slice(0, 90) });
	});
	root.walkRules((r) => {
		for (const [re, what, since] of SELECTORS) {
			if (re.test(r.selector) && !testsFor(supportsOf(r), "selector(")) problems.push({ file, what, since, where: r.selector.slice(0, 90) });
		}
	});
	root.walkDecls((d) => {
		const cond = supportsOf(d);
		const prop = d.prop.toLowerCase();
		if (cond.toLowerCase().includes("not (")) return; // already an old-browser override
		if (PROPS[prop]) {
			if (!(hasWebkitTwin(d) || hasFallback(d) || globallyCovered(d))) {
				problems.push({ file, what: `${prop}: …`, since: PROPS[prop], where: where(d) });
			}
		}
		for (const [re, what, since] of VALUES) {
			if (!re.test(d.value)) continue;
			if (!hasFallback(d)) problems.push({ file, what, since, where: `${where(d)} { ${d.prop}: ${d.value.slice(0, 60)} }` });
			break; // one report per declaration
		}
	});
}

if (!problems.length) {
	console.log(`css-compat-audit: OK, nothing in ${files.join(", ")} needs newer than Chrome 101 without a fallback.`);
} else {
	const byWhat = Object.groupBy ? Object.groupBy(problems, (p) => p.what) : problems.reduce((g, p) => ((g[p.what] ??= []).push(p), g), {});
	console.log(`css-compat-audit: ${problems.length} issue(s) for Chrome 101\n`);
	for (const [what, list] of Object.entries(byWhat)) {
		console.log(`- ${what} (Chrome ${list[0].since}+) × ${list.length}`);
		for (const p of list.slice(0, 6)) console.log(`    ${p.where}`);
		if (list.length > 6) console.log(`    … and ${list.length - 6} more`);
	}
	process.exitCode = 1;
}
