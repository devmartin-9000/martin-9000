import { useEffect } from "react";

/**
 * Easter-egg engine.
 *
 * Any element tagged with `data-egg="<kind>"` gets a liquid hover effect and
 * a different one on click. Effects are driven by event delegation, so
 * components only need the attribute:
 *
 *   melt    text ripples like heated oil on hover; click melts it and drips
 *   drip    shape wobbles into a blob on hover; click squashes and splashes
 *   blob    like drip but bigger and slower (large artwork)
 *   ink     liquid fills the element from the pointer; click splashes
 *   magnet  element leans toward the cursor; click spins and splashes
 *   spin    wobbles on hover; click spins an elastic 720 and splashes
 *
 * `data-egg-color` overrides the colour of fills and droplets.
 */

type Kind = "melt" | "drip" | "blob" | "ink" | "magnet" | "spin";

const SEL = "[data-egg]";
const ORANGE = "#ff6122";
const rand = (a: number, b: number) => a + Math.random() * (b - a);

const kindOf = (el: Element) => ((el as HTMLElement).dataset.egg || "drip") as Kind;

function colorOf(el: HTMLElement) {
	if (el.dataset.eggColor) return el.dataset.eggColor;
	const cs = getComputedStyle(el);
	const bg = cs.backgroundColor;
	if (bg && bg !== "transparent" && !/^rgba\(0, 0, 0, 0\)$/.test(bg)) return bg;
	return cs.color;
}

/* ---------- goo layer: a fixed overlay whose children melt into each other ---------- */

let layer: HTMLDivElement | null = null;
let live = 0;

function getLayer() {
	if (layer) return layer;
	layer = document.createElement("div");
	Object.assign(layer.style, {
		position: "fixed",
		inset: "0",
		pointerEvents: "none",
		zIndex: "9999",
		filter: "url(#goo)",
	});
	document.body.appendChild(layer);
	return layer;
}

function drop(x: number, y: number, size: number, color: string, keyframes: Keyframe[], opts: KeyframeAnimationOptions) {
	const d = document.createElement("div");
	Object.assign(d.style, {
		position: "absolute",
		left: `${x - size / 2}px`,
		top: `${y - size / 2}px`,
		width: `${size}px`,
		height: `${size}px`,
		borderRadius: "50%",
		background: color,
	});
	getLayer().appendChild(d);
	live++;
	const a = d.animate(keyframes, { fill: "forwards", ...opts });
	a.onfinish = () => {
		d.remove();
		live--;
		if (live === 0 && layer) {
			layer.remove();
			layer = null;
		}
	};
}

function splash(x: number, y: number, color: string, n = 10, power = 1) {
	drop(x, y, 26 * power, color, [{ transform: "scale(.2)" }, { transform: "scale(1.3)", offset: 0.25 }, { transform: "scale(0)" }], {
		duration: 750,
		easing: "ease-out",
	});
	for (let i = 0; i < n; i++) {
		const ang = rand(0, Math.PI * 2);
		const dist = rand(50, 130) * power;
		const s = rand(7, 16) * Math.sqrt(power);
		const dx = Math.cos(ang) * dist;
		const dy = Math.sin(ang) * dist;
		drop(
			x,
			y,
			s,
			color,
			[
				{ transform: "translate(0,0) scale(1)" },
				{ transform: `translate(${dx}px,${dy}px) scale(.9)`, offset: 0.6 },
				{ transform: `translate(${dx * 1.08}px,${dy * 1.08 + 16}px) scale(0)` },
			],
			{ duration: rand(800, 1300), easing: "cubic-bezier(.16,.84,.3,1)" }
		);
	}
}

/** Drops that bulge out of the bottom edge, stretch on a neck and fall */
function drips(rect: DOMRect, color: string, n: number) {
	for (let i = 0; i < n; i++) {
		const x = rand(rect.left + rect.width * 0.1, rect.right - rect.width * 0.1);
		const y = rect.bottom - rect.height * 0.25;
		const size = rand(9, 15);
		drop(x, y, size * 1.5, color, [{ transform: "scale(.2)" }, { transform: "scale(1)", offset: 0.3 }, { transform: "scale(1)", offset: 0.7 }, { transform: "scale(0)" }], {
			duration: 1400,
			delay: i * 120,
		});
		drop(
			x,
			y,
			size,
			color,
			[
				{ transform: "translateY(0) scaleY(1)" },
				{ transform: "translateY(10px) scaleY(1.3)", offset: 0.25 },
				{ transform: `translateY(${rand(90, 170)}px) scaleY(1.6)`, offset: 0.85 },
				{ transform: `translateY(${rand(110, 190)}px) scale(.2)` },
			],
			{ duration: rand(1000, 1500), delay: i * 120, easing: "cubic-bezier(.5,0,.9,.5)" }
		);
	}
}

/* ---------- melt: SVG turbulence displacement, tweened ---------- */

function tween(from: number, to: number, ms: number, fn: (v: number) => void, done?: () => void) {
	const t0 = performance.now();
	let raf = 0;
	const step = (t: number) => {
		const p = Math.min(1, (t - t0) / ms);
		const e = 1 - Math.pow(1 - p, 3);
		fn(from + (to - from) * e);
		if (p < 1) raf = requestAnimationFrame(step);
		else done?.();
	};
	raf = requestAnimationFrame(step);
	return () => cancelAnimationFrame(raf);
}

let meltEl: HTMLElement | null = null;
let meltVal = 0;
let meltStop: (() => void) | null = null;

function melt(el: HTMLElement, to: number, ms = 800) {
	const map = document.getElementById("meltMap");
	if (!map) return;
	if (meltEl && meltEl !== el) {
		meltEl.style.filter = "";
		meltVal = 0;
	}
	meltEl = el;
	el.style.filter = "url(#melt)";
	meltStop?.();
	meltStop = tween(
		meltVal,
		to,
		ms,
		(v) => {
			meltVal = v;
			map.setAttribute("scale", String(v));
		},
		() => {
			if (to === 0 && meltEl === el) {
				el.style.filter = "";
				meltEl = null;
			}
		}
	);
}

/* ---------- ink: blobs grow from the pointer and merge into a fill ---------- */

type Ink = { anims: Animation[] };
const inks = new WeakMap<HTMLElement, Ink>();

function inkEnter(el: HTMLElement, e: PointerEvent) {
	const st = inks.get(el);
	if (st && st.anims.some((a) => !(a.playbackRate < 0 && a.playState === "finished"))) {
		st.anims.forEach((a) => {
			a.playbackRate = 1;
			a.play();
		});
		return;
	}
	el.querySelectorAll(":scope > [data-egg-ink]").forEach((n) => n.remove());
	if (getComputedStyle(el).position === "static") el.style.position = "relative";
	el.style.isolation = "isolate";

	const r = el.getBoundingClientRect();
	const x = e.clientX - r.left;
	const y = e.clientY - r.top;
	const R = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
	const scale = (2 * R + 70) / 28;

	const wrap = document.createElement("div");
	wrap.setAttribute("data-egg-ink", "");
	Object.assign(wrap.style, { position: "absolute", inset: "0", zIndex: "-1", overflow: "hidden", borderRadius: "inherit", pointerEvents: "none" });
	const goo = document.createElement("div");
	Object.assign(goo.style, { position: "absolute", inset: "0", filter: "url(#goo)" });
	wrap.appendChild(goo);
	el.prepend(wrap);

	const color = el.dataset.eggColor || ORANGE;
	const anims = [
		[0, 0],
		[-16, 12],
		[18, -12],
		[2, 20],
	].map(([ox, oy], i) => {
		const c = document.createElement("div");
		Object.assign(c.style, {
			position: "absolute",
			left: `${x + ox - 14}px`,
			top: `${y + oy - 14}px`,
			width: "28px",
			height: "28px",
			borderRadius: "50%",
			background: color,
		});
		goo.appendChild(c);
		return c.animate([{ transform: "scale(0)" }, { transform: `scale(${scale})` }], {
			duration: 950,
			delay: i * 70,
			easing: "cubic-bezier(.6,.05,.2,1)",
			fill: "both",
		});
	});
	inks.set(el, { anims });
}

function inkLeave(el: HTMLElement) {
	inks.get(el)?.anims.forEach((a) => {
		a.playbackRate = -1.6;
		a.play();
	});
}

/* ---------- per-kind behaviour ---------- */

const wobble = (el: HTMLElement, big: boolean) =>
	el.animate(
		[
			{},
			{ borderRadius: "62% 38% 46% 54% / 55% 62% 38% 45%", transform: `scale(${big ? 1.06 : 1.14}) rotate(${big ? 3 : 6}deg)`, offset: 0.3 },
			{ borderRadius: "38% 62% 54% 46% / 42% 38% 62% 58%", transform: `scale(${big ? 0.97 : 0.94}) rotate(${big ? -3 : -5}deg)`, offset: 0.62 },
			{},
		],
		{ duration: big ? 1900 : 1300, easing: "cubic-bezier(.45,0,.25,1)" }
	);

const squash = (el: HTMLElement) =>
	el.animate(
		[{ transform: "scale(1)" }, { transform: "scale(1.35,.68)", offset: 0.25 }, { transform: "scale(.82,1.28)", offset: 0.5 }, { transform: "scale(1.06,.96)", offset: 0.75 }, { transform: "scale(1)" }],
		{ duration: 800, easing: "cubic-bezier(.3,1.4,.5,1)" }
	);

const magnets = new Set<HTMLElement>();

function enter(el: HTMLElement, e: PointerEvent) {
	switch (kindOf(el)) {
		case "melt":
			melt(el, 12, 1000);
			break;
		case "drip":
			wobble(el, false);
			break;
		case "blob":
			wobble(el, true);
			break;
		case "ink":
			inkEnter(el, e);
			break;
		case "magnet":
			el.style.transition = "transform .45s cubic-bezier(.2,.9,.3,1.35)";
			magnets.add(el);
			break;
		case "spin":
			el.animate([{}, { transform: "rotate(14deg) scale(1.18)", offset: 0.4 }, { transform: "rotate(-8deg) scale(.96)", offset: 0.75 }, {}], { duration: 800, easing: "ease-in-out" });
			break;
	}
}

function leave(el: HTMLElement) {
	switch (kindOf(el)) {
		case "melt":
			melt(el, 0, 1000);
			break;
		case "ink":
			inkLeave(el);
			break;
		case "magnet":
			magnets.delete(el);
			el.style.transform = "";
			break;
	}
}

function click(el: HTMLElement, e: MouseEvent) {
	const color = colorOf(el);
	const r = el.getBoundingClientRect();
	const cx = e.clientX || r.left + r.width / 2;
	const cy = e.clientY || r.top + r.height / 2;
	switch (kindOf(el)) {
		case "melt":
			melt(el, 30, 500);
			window.setTimeout(() => melt(el, 0, 1400), 560);
			drips(r, color, Math.min(6, Math.round(r.width / 55) + 2));
			break;
		case "drip":
			squash(el);
			splash(r.left + r.width / 2, r.top + r.height / 2, color, 9);
			break;
		case "blob":
			squash(el);
			splash(cx, cy, color, 16, 1.7);
			break;
		case "ink":
			splash(cx, cy, el.dataset.eggColor || ORANGE, 11, 0.9);
			break;
		case "magnet":
			el.animate([{ transform: el.style.transform || "none" }, { transform: "rotate(360deg) scale(1.3)", offset: 0.5 }, { transform: "rotate(360deg) scale(1)" }], {
				duration: 900,
				easing: "cubic-bezier(.34,1.4,.5,1)",
			});
			splash(r.left + r.width / 2, r.top + r.height / 2, color, 8, 0.8);
			break;
		case "spin":
			el.animate([{ transform: "rotate(0) scale(1)" }, { transform: "rotate(540deg) scale(1.4)", offset: 0.6 }, { transform: "rotate(720deg) scale(1)" }], {
				duration: 1200,
				easing: "cubic-bezier(.34,1.3,.4,1)",
			});
			splash(r.left + r.width / 2, r.top + r.height / 2, color, 12, 1.1);
			break;
	}
}

/* ---------- mount: filters + delegated listeners ---------- */

const chain = (t: EventTarget | null) => {
	const out: HTMLElement[] = [];
	let el = (t as Element | null)?.closest?.(SEL) as HTMLElement | null;
	while (el) {
		out.push(el);
		el = el.parentElement?.closest(SEL) as HTMLElement | null;
	}
	return out;
};

export function Eggs() {
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const hovered = new WeakSet<Element>();
		const hoverable = (e: PointerEvent) => e.pointerType !== "touch";

		const over = (e: PointerEvent) => {
			if (!hoverable(e)) return;
			for (const el of chain(e.target)) {
				if (hovered.has(el)) continue;
				hovered.add(el);
				enter(el, e);
			}
		};
		const out = (e: PointerEvent) => {
			if (!hoverable(e)) return;
			for (const el of chain(e.target)) {
				if (e.relatedTarget && el.contains(e.relatedTarget as Node)) continue;
				if (!hovered.has(el)) continue;
				hovered.delete(el);
				leave(el);
			}
		};
		const move = (e: PointerEvent) => {
			magnets.forEach((el) => {
				const r = el.getBoundingClientRect();
				const dx = (e.clientX - (r.left + r.width / 2)) * 0.35;
				const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
				const m = 14;
				el.style.transform = `translate(${Math.max(-m, Math.min(m, dx))}px,${Math.max(-m, Math.min(m, dy))}px) scale(1.12)`;
			});
		};
		const onClick = (e: MouseEvent) => {
			const el = chain(e.target)[0];
			if (el) click(el, e);
		};

		document.addEventListener("pointerover", over);
		document.addEventListener("pointerout", out);
		document.addEventListener("pointermove", move);
		document.addEventListener("click", onClick);
		return () => {
			document.removeEventListener("pointerover", over);
			document.removeEventListener("pointerout", out);
			document.removeEventListener("pointermove", move);
			document.removeEventListener("click", onClick);
		};
	}, []);

	return (
		<svg aria-hidden style={{ position: "absolute", width: 0, height: 0 }}>
			<defs>
				<filter id="goo" colorInterpolationFilters="sRGB">
					<feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
					<feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="g" />
					<feComposite in="SourceGraphic" in2="g" operator="atop" />
				</filter>
				<filter id="melt" x="-20%" y="-30%" width="140%" height="180%" colorInterpolationFilters="sRGB">
					<feTurbulence type="fractalNoise" baseFrequency="0.006 0.018" numOctaves="1" seed="4" result="n">
						<animate attributeName="baseFrequency" dur="4s" values="0.006 0.018;0.011 0.03;0.006 0.018" repeatCount="indefinite" />
					</feTurbulence>
					<feDisplacementMap id="meltMap" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
				</filter>
			</defs>
		</svg>
	);
}
