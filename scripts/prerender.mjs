/**
 * Post-build SEO step (runs after `vite build`).
 *
 * Link-preview crawlers (WhatsApp, X, LinkedIn, Slack, Discord) don't run JavaScript, so every
 * address gets its own static HTML with the right <title>, description, canonical link, Open Graph
 * and Twitter tags and JSON-LD. Preview images:
 *   - a yap uses its "Share image" from /admin, otherwise a generated card showing its title
 *   - a project uses its live site's own preview image, else its /admin thumbnail, else a card
 *   - the home, Yap Zone and Projects pages get generated cards
 * Also writes sitemap.xml and robots.txt. Everything is derived from src/content, so a new
 * yap published from /admin gets its preview on the next Vercel build automatically.
 */
import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { livePreviewImage } from "../api/_lib/live-preview.js";

const SITE = (process.env.SITE_URL || "https://martin-jack.vercel.app").replace(/\/$/, "");
const DIST = "dist";
const CONTENT = "src/content";

// keep in sync with `profile` in src/lib/data.ts
const profile = {
	name: "Martin Jack Magonagona",
	first: "Martin",
	role: "Software Engineer",
	location: "Blantyre, Malawi",
	email: "martinmagonagona@gmail.com",
	github: "https://github.com/devmartin-9000",
	linkedin: "https://linkedin.com/in/martin-jack9000",
	twitter: "@devmartin9000",
};

/* ------------------------------------------------------------------ content */

const readDir = (dir) =>
	fs
		.readdirSync(path.join(CONTENT, dir))
		.filter((f) => f.endsWith(".json"))
		.map((f) => ({ id: f.replace(/\.json$/, ""), ...JSON.parse(fs.readFileSync(path.join(CONTENT, dir, f), "utf8")) }));

// same ordering and numbering as src/lib/data.ts
const yaps = readDir("yaps")
	.sort((a, b) => b.date.localeCompare(a.date))
	.map((y, i, all) => ({ ...y, no: all.length - i }));
const projects = readDir("projects").sort((a, b) => a.order - b.order);

/* -------------------------------------------------------------- helpers */

const esc = (s = "") =>
	String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clip = (s = "", n = 160) => {
	const t = String(s).replace(/\s+/g, " ").trim();
	return t.length <= n ? t : t.slice(0, n - 1).replace(/\s+\S*$/, "") + "…";
};
const abs = (p) => (/^https?:\/\//.test(p) ? p : SITE + (p.startsWith("/") ? p : "/" + p));
const write = (file, data) => {
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, data);
};
const pad = (n) => String(n).padStart(2, "0");

/* -------------------------------------------------- preview image cards */

const font = (weight) =>
	fs.readFileSync(`node_modules/@fontsource/geist-sans/files/geist-sans-latin-${weight}-normal.woff`);
const fonts = [
	{ name: "Geist", data: font(500), weight: 500, style: "normal" },
	{ name: "Geist", data: font(600), weight: 600, style: "normal" },
];
const logo = `data:image/png;base64,${fs.readFileSync("public/assets/logo-mj-512.png").toString("base64")}`;

/** tiny element factory for satori: h(type, style, ...children) */
const h = (type, style, ...children) => ({
	type,
	props: {
		style: { display: "flex", ...style },
		children: children.flat().filter((c) => c !== null && c !== false && c !== undefined && c !== ""),
	},
});

/** 1200×630 brand card: dark, orange glow, logo, kicker, big title, footer, faint watermark word */
function card({ kicker, title, subtitle, footerLeft, footerRight, watermark }) {
	const size = title.length > 70 ? 58 : title.length > 42 ? 70 : 84;
	return h(
		"div",
		{
			width: 1200,
			height: 630,
			position: "relative",
			backgroundColor: "#121212",
			backgroundImage:
				"radial-gradient(circle at 92% 0%, rgba(255,97,34,0.55), rgba(255,97,34,0) 55%), radial-gradient(circle at 0% 100%, rgba(255,97,34,0.18), rgba(255,97,34,0) 50%)",
			color: "white",
			fontFamily: "Geist",
		},
		watermark &&
			h(
				"div",
				{
					position: "absolute",
					right: 40,
					bottom: -90,
					fontSize: 360,
					fontWeight: 600,
					letterSpacing: -20,
					color: "rgba(255,255,255,0.05)",
				},
				watermark
			),
		// padding lives on an inset frame so the card stays exactly 1200×630
		h(
			"div",
			{ position: "absolute", top: 64, left: 72, right: 72, bottom: 60, flexDirection: "column", justifyContent: "space-between" },
		h(
			"div",
			{ alignItems: "center", gap: 18 },
			h("div", {
				width: 64,
				height: 64,
				borderRadius: 16,
				backgroundColor: "white",
				backgroundImage: `url(${logo})`,
				backgroundSize: "48px 48px",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}),
			h("div", { fontSize: 26, fontWeight: 600, letterSpacing: 4, color: "rgba(255,255,255,0.6)" }, kicker.toUpperCase())
		),
		h(
			"div",
			{ flexDirection: "column", gap: 22, maxWidth: 1000 },
			h("div", { fontSize: size, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }, title),
			subtitle && h("div", { fontSize: 32, color: "#ff6122", lineHeight: 1.3 }, subtitle)
		),
		h(
			"div",
			{ justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "rgba(255,255,255,0.55)" },
			h("div", {}, footerLeft),
			h("div", { color: "rgba(255,255,255,0.85)" }, footerRight)
		)
		)
	);
}

async function renderCard(file, options) {
	const svg = await satori(card(options), { width: 1200, height: 630, fonts });
	const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
	write(path.join(DIST, file), png);
	return "/" + file.replace(/\\/g, "/");
}

/* ------------------------------------------------------------ head tags */

const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
const START = "<!-- seo:start -->";
const END = "<!-- seo:end -->";
if (!template.includes(START) || !template.includes(END)) {
	throw new Error("index.html is missing the <!-- seo:start --> / <!-- seo:end --> markers");
}

const person = {
	"@type": "Person",
	"@id": `${SITE}/#person`,
	name: profile.name,
	givenName: "Martin Jack",
	familyName: "Magonagona",
	jobTitle: profile.role,
	url: SITE,
	image: abs("/assets/logo-mj-512.png"),
	email: `mailto:${profile.email}`,
	address: { "@type": "PostalAddress", addressLocality: "Blantyre", addressCountry: "MW" },
	sameAs: [profile.github, profile.linkedin, "https://twitter.com/devmartin9000"],
	knowsAbout: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Test automation", "Playwright", "BigQuery", "Supabase"],
};

function head({ title, description, url, image, imageAlt, type = "website", jsonld, extra = [] }) {
	const tags = [
		`<title>${esc(title)}</title>`,
		`<meta name="description" content="${esc(description)}" />`,
		`<link rel="canonical" href="${esc(url)}" />`,
		`<meta property="og:type" content="${type}" />`,
		`<meta property="og:site_name" content="Martin Jack" />`,
		`<meta property="og:locale" content="en_US" />`,
		`<meta property="og:url" content="${esc(url)}" />`,
		`<meta property="og:title" content="${esc(title)}" />`,
		`<meta property="og:description" content="${esc(description)}" />`,
		`<meta property="og:image" content="${esc(image)}" />`,
		`<meta property="og:image:alt" content="${esc(imageAlt || title)}" />`,
		`<meta name="twitter:card" content="summary_large_image" />`,
		`<meta name="twitter:site" content="${profile.twitter}" />`,
		`<meta name="twitter:creator" content="${profile.twitter}" />`,
		`<meta name="twitter:title" content="${esc(title)}" />`,
		`<meta name="twitter:description" content="${esc(description)}" />`,
		`<meta name="twitter:image" content="${esc(image)}" />`,
		...extra,
		`<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": jsonld }).replace(/</g, "\\u003c")}</script>`,
	];
	return `${START}\n    ${tags.join("\n    ")}\n    ${END}`;
}

const pages = [];
function page(route, meta) {
	const html = template.replace(new RegExp(`${START}[\\s\\S]*?${END}`), head({ ...meta, url: abs(route) }));
	write(path.join(DIST, route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`), html);
	pages.push({ route, lastmod: meta.lastmod });
}

/* ---------------------------------------------------------------- pages */

const generated = (file, opts) => renderCard(file, opts).then(abs);

// home
page("/", {
	title: `${profile.name} | ${profile.role} in ${profile.location}`,
	description: `Hi, I'm ${profile.first}, a ${profile.role.toLowerCase()} from ${profile.location}. I design and build fast, accessible web apps end to end, with automated testing and data you can trust.`,
	image: await generated("og/home.png", {
		kicker: `${profile.role} · ${profile.location}`,
		title: `Hi, I'm ${profile.first}.`,
		subtitle: "I design, build and ship reliable web apps.",
		footerLeft: "Front-end · Test automation · Data",
		footerRight: SITE.replace(/^https?:\/\//, ""),
		watermark: "build",
	}),
	imageAlt: `${profile.name}, ${profile.role}`,
	jsonld: [person, { "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: "Martin Jack", publisher: { "@id": `${SITE}/#person` } }],
});

// Yap Zone list
page("/yap", {
	title: `Yap Zone · Rants and opinions by ${profile.first}`,
	description: "Unfiltered yapping and mildly spicy rants about code, bugs, users and the occasional spreadsheet.",
	image: await generated("og/yap.png", {
		kicker: "Yap Zone",
		title: "Unfiltered Yapping & Mildly Spicy Rants.",
		footerLeft: `${yaps.length} rants and counting`,
		footerRight: `by ${profile.first}`,
		watermark: "yap",
	}),
	jsonld: [
		person,
		{
			"@type": "Blog",
			name: "Yap Zone",
			url: abs("/yap"),
			author: { "@id": `${SITE}/#person` },
			blogPost: yaps.map((y) => ({ "@type": "BlogPosting", headline: y.title, url: abs(`/yap/${y.id}`), datePublished: y.date })),
		},
	],
});

// each yap
for (const y of yaps) {
	const image = y.thumbnail
		? abs(y.thumbnail)
		: await generated(`og/yap/${y.id}.png`, {
				kicker: `Yap Zone · Rant #${pad(y.no)}`,
				title: y.title,
				footerLeft: `Mood: ${y.mood} · ${y.minutes} min yap`,
				footerRight: `by ${profile.first}`,
				watermark: "yap",
			});
	page(`/yap/${y.id}`, {
		title: `${y.title} · Yap Zone`,
		description: clip(y.excerpt || y.body),
		image,
		type: "article",
		lastmod: y.date,
		extra: [
			`<meta property="article:published_time" content="${esc(y.date)}" />`,
			`<meta property="article:author" content="${esc(profile.name)}" />`,
			`<meta property="article:section" content="Yap Zone" />`,
		],
		jsonld: [
			person,
			{
				"@type": "BlogPosting",
				headline: y.title,
				description: clip(y.excerpt || y.body),
				image,
				datePublished: y.date,
				dateModified: y.date,
				url: abs(`/yap/${y.id}`),
				mainEntityOfPage: abs(`/yap/${y.id}`),
				author: { "@id": `${SITE}/#person` },
				timeRequired: `PT${y.minutes}M`,
			},
		],
	});
}

// Projects list
page("/projects", {
	title: `Projects · Everything ${profile.first} has built and shipped`,
	description: clip(`${projects.length} products built and shipped: ${projects.map((p) => p.name).join(", ")}.`),
	image: await generated("og/projects.png", {
		kicker: "All projects",
		title: "Everything I've Built and Shipped.",
		footerLeft: `${projects.length} projects`,
		footerRight: `by ${profile.first}`,
		watermark: "ship",
	}),
	jsonld: [
		person,
		{
			"@type": "ItemList",
			name: "Projects",
			itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/projects/${p.id}`), name: p.name })),
		},
	],
});

// each project: the live site's own preview image, else the thumbnail from /admin, else a card.
// The card is always generated, because /api/preview falls back to it at runtime too.
const live = await Promise.all(projects.map((p) => livePreviewImage(p.url)));
for (const [i, p] of projects.entries()) {
	const card = await generated(`og/projects/${p.id}.png`, {
		kicker: `Project ${pad(i + 1)} · ${p.category}`,
		title: p.name,
		subtitle: p.tagline || undefined,
		footerLeft: (p.stack || []).slice(0, 4).join(" · "),
		footerRight: `by ${profile.first}`,
		watermark: "ship",
	});
	const image = live[i] || (p.thumbnail ? abs(p.thumbnail) : card);
	const description = clip(p.tagline ? `${p.tagline}. ${p.description}` : p.description || `${p.name}, built by ${profile.name}.`);
	page(`/projects/${p.id}`, {
		title: `${p.name}${p.tagline ? ` · ${p.tagline}` : ""} | ${profile.first}'s projects`,
		description,
		image,
		imageAlt: `${p.name} preview`,
		jsonld: [
			person,
			{
				"@type": "SoftwareApplication",
				name: p.name,
				description,
				applicationCategory: "WebApplication",
				operatingSystem: "Web",
				image,
				...(p.url ? { url: p.url } : {}),
				author: { "@id": `${SITE}/#person` },
				...(p.stack?.length ? { keywords: p.stack.join(", ") } : {}),
			},
		],
	});
}

/* ------------------------------------------------------ sitemap, robots */

write(
	path.join(DIST, "sitemap.xml"),
	`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
		.map(
			(p) =>
				`  <url><loc>${esc(abs(p.route))}</loc>${p.lastmod ? `<lastmod>${p.lastmod.slice(0, 10)}</lastmod>` : ""}</url>`
		)
		.join("\n")}\n</urlset>\n`
);
write(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`prerender: ${pages.length} pages, sitemap.xml, robots.txt (${SITE})`);
