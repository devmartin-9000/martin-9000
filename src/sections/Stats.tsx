import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Frame, Reveal } from "@/components/ui";
import { viscous } from "@/lib/motion";

const stats = [
	["6+ yrs", "Cumulative experience across tech, accounting, sales and operations."],
	["800+", "Legacy automated tests migrated and stabilised on Playwright."],
	["11", "Products designed and built, from POS systems to developer tools."],
];

/** Low-poly shape from the "crumple" concept, used as the stats image */
const facets: [string, string][] = [
	["120,40 210,20 260,90 190,120", "#161616"],
	["210,20 300,60 290,140 260,90", "#262626"],
	["260,90 290,140 250,210 200,170", "#0d0d0d"],
	["190,120 260,90 200,170 130,150", "#1f1f1f"],
	["60,100 120,40 190,120 130,150", "#2b2b2b"],
	["60,100 130,150 100,230 40,190", "#111"],
	["130,150 200,170 170,250 100,230", "#202020"],
	["200,170 250,210 220,280 170,250", "#171717"],
	["100,230 170,250 220,280 130,290", "#0a0a0a"],
	["40,190 100,230 130,290 60,270", "#1c1c1c"],
];

export default function Stats() {
	// click the blue card to rotate the three columns around
	const [order, setOrder] = useState([0, 1, 2]);
	const rotate = () => setOrder((o) => [o[2], o[0], o[1]]);

	const cols: ReactNode[] = [
		<div key="stats" className="group relative">
			<div
				data-egg="magnet"
				data-egg-color="#ff6122"
				className="absolute left-[46%] top-[2%] h-[96%] w-[58%] text-kinetic transition-transform duration-1000 ease-out group-hover:-translate-x-4 group-hover:-translate-y-3 group-hover:rotate-[-6deg]"
			>
				<svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden>
					<path fill="currentColor" d="M10 10h150v70H90l150 150-50 50L40 130v50H10z" />
				</svg>
			</div>
			<div className="relative space-y-6 md:pr-10">
				{stats.map(([n, t], i) => (
					<Reveal key={n} delay={i * 0.08}>
						<p data-egg="melt" className="display w-fit cursor-pointer text-[clamp(2.8rem,6vw,4.4rem)] font-black transition-transform duration-500 hover:translate-x-2">
							{n}
						</p>
						<p className="mt-1 max-w-[240px] text-[11px] leading-snug text-ink/80">{t}</p>
					</Reveal>
				))}
			</div>
		</div>,
		<div key="card" className="mx-auto w-full max-w-[250px]">
			<div
				data-egg="blob"
				data-egg-color="#1fb2f5"
				onClick={rotate}
				role="button"
				aria-label="Shuffle the layout"
				className="group relative aspect-[3/4] cursor-pointer drop-shadow-[0_24px_24px_rgba(0,0,0,0.25)] transition-transform duration-700 hover:-rotate-3 hover:scale-105"
			>
				<div className="absolute inset-0 bg-[#1fb2f5]" style={{ clipPath: "polygon(0 8%,100% 0,100% 90%,50% 100%,0 90%)" }}>
					<div className="absolute left-[10%] top-[16%] aspect-square w-[70%] rounded-full bg-[#e8310f] transition-transform duration-1000 group-hover:translate-x-3 group-hover:scale-110" />
					<svg viewBox="0 0 340 320" className="animate-drift absolute bottom-[8%] left-[6%] h-[70%] w-[90%]" aria-hidden>
						{facets.map(([pts, fill]) => (
							<polygon key={pts} points={pts} fill={fill} stroke="#3a3a3a" strokeWidth=".6" />
						))}
					</svg>
				</div>
			</div>
		</div>,
		<div key="text">
			<h2 data-egg="melt" className="text-lg font-bold leading-tight">
				Blantyre, Malawi. The transformation of a sales rep into a software engineer.
			</h2>
			<p className="mt-3 text-[11px] leading-relaxed text-ink/65">
				From the sales floor to enterprise test automation: bash and .bat
				tooling that removes repetitive work, validation checks that keep
				data honest, and the documentation that keeps it all maintainable.
			</p>
			<a href="#experience" data-egg="ink" className="mt-5 inline-block bg-ink px-8 py-3 text-xs font-medium text-white">
				See the journey
			</a>
		</div>,
	];

	return (
		<Frame className="bg-[#e7e6e3] px-6 py-12 md:px-12">
			<div className="grid items-center gap-8 md:grid-cols-3">
				{order.map((i) => (
					<motion.div key={i} layout transition={viscous}>
						{cols[i]}
					</motion.div>
				))}
			</div>
		</Frame>
	);
}
