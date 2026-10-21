import {
	type BrandIcon,
	siDotnet,
	siJavascript,
	siNextdotjs,
	siNodedotjs,
	siGnubash,
	siGooglebigquery,
	siPython,
	siReact,
	siTailwindcss,
	siTypescript,
} from "@/lib/brand-icons";
import { Coffee, Drama } from "lucide-react";
import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Frame } from "@/components/ui";
import { viscous } from "@/lib/motion";

const services = [
	{
		n: "01",
		title: ["Full-stack", "Engineering"],
		body: "React and TypeScript interfaces, backed by Node, Express, Java and Python services and the APIs that connect them.",
		arc: "conic-gradient(from 120deg,#facc15,#fb923c,#ec4899,#facc15)",
		dark: true,
	},
	{
		n: "02",
		title: ["Test", "Automation"],
		body: "Playwright suites, legacy framework migrations and Java automation for Salesforce-based enterprise apps, so teams can change things without fear.",
		arc: "conic-gradient(from 90deg,#a5f3fc,#38bdf8,#3b82f6,#a5f3fc)",
	},
	{
		n: "03",
		title: ["Data Analytics", "& Documentation"],
		body: "Data analytics with BigQuery workflows, validation checks and A/B reporting, backed by clear guides and reproducible code that outlive the project.",
		arc: "conic-gradient(from 100deg,#bef264,#22c55e,#0d9488,#bef264)",
	},
];

/** Real brand mark, in the brand's own colour */
const brand = (i: BrandIcon): ReactNode => (
	<svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
		<path d={i.path} fill={`#${i.hex}`} />
	</svg>
);

const tools: { name: string; items: string; bar: string; icon: ReactNode }[] = [
	{ name: "JAVA", items: "Enterprise automation", bar: "linear-gradient(90deg,#ffb020,#ffd54a)", icon: <Coffee className="h-8 w-8 text-[#e76f00]" strokeWidth={1.5} /> },
	{ name: "PYTHON", items: "Scripting & data", bar: "linear-gradient(90deg,#8590ad,#a3acc4)", icon: brand(siPython) },
	{ name: "TYPESCRIPT", items: "Type-safe front and back end", bar: "linear-gradient(90deg,#5dbb5a,#8ed58a)", icon: brand(siTypescript) },
	{ name: "REACT", items: "HTML · CSS · component libraries", bar: "linear-gradient(90deg,#1faa59,#46c97c)", icon: brand(siReact) },
	{ name: "NODE.JS", items: "APIs · Express", bar: "linear-gradient(90deg,#3f8a3a,#6bbd5b)", icon: brand(siNodedotjs) },
	{ name: "JAVASCRIPT", items: "The everyday language", bar: "linear-gradient(90deg,#e6c200,#f7df1e)", icon: brand(siJavascript) },
	{ name: "NEXT.JS", items: "React framework", bar: "linear-gradient(90deg,#2b2b2b,#5a5a5a)", icon: brand(siNextdotjs) },
	{ name: "TAILWIND", items: "Design systems · Figma", bar: "linear-gradient(90deg,#27b7c9,#6fd8e3)", icon: brand(siTailwindcss) },
	// Java and Playwright have no mark in the icon set: a coffee cup and theatre masks stand in
	{ name: "PLAYWRIGHT", items: "Test automation", bar: "linear-gradient(90deg,#2f6fb5,#5f9bd6)", icon: <Drama className="h-8 w-8 text-[#2ead33]" strokeWidth={1.5} /> },
	{ name: "SQL", items: "BigQuery · Reporting", bar: "linear-gradient(90deg,#8b7566,#b09c8d)", icon: brand(siGooglebigquery) },
	{ name: "BASH & BAT", items: "Workflow scripting", bar: "linear-gradient(90deg,#e0361b,#ff6a3d)", icon: brand(siGnubash) },
	{ name: "C# / .NET", items: "Still exploring", bar: "linear-gradient(90deg,#ec4b9c,#f48dc3)", icon: brand(siDotnet) },
];

/** Numbered services (click a card to make it the active, dark one), then the stack as step-style tool cards (click one to shuffle them all) */
export default function Services() {
	const [order, setOrder] = useState(services.map((_, i) => i));
	const toFront = (i: number) => setOrder((o) => [i, ...o.filter((x) => x !== i)]);

	const [toolOrder, setToolOrder] = useState(tools.map((_, i) => i));
	const shuffle = () =>
		setToolOrder((o) => {
			const a = [...o];
			for (let i = a.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[a[i], a[j]] = [a[j], a[i]];
			}
			return a;
		});

	return (
		<Frame id="skills" className="bg-[#f3f3f1] px-5 py-12 md:px-12">
			<h2 data-egg="melt" className="mx-auto mb-8 w-fit text-2xl font-bold tracking-tight">Services</h2>
			<div className="grid gap-4 md:grid-cols-3">
				{order.map((i, pos) => {
					const s = services[i];
					const dark = pos === 0;
					return (
						<motion.article
							key={s.n}
							layout
							transition={viscous}
							onClick={() => toFront(i)}
							className={`group relative min-h-[320px] cursor-pointer overflow-hidden rounded-[24px] p-6 transition-colors duration-700 ${
								dark ? "bg-ink text-white" : "bg-white text-ink shadow-sm ring-1 ring-black/5 hover:shadow-xl"
							}`}
						>
							<span data-egg="melt" className="absolute right-5 top-4 text-3xl font-light">{s.n}</span>
							<div
								className="absolute -bottom-40 -right-36 h-64 w-64 rounded-full opacity-90 transition-transform duration-[1400ms] ease-out group-hover:-translate-x-6 group-hover:-translate-y-6 group-hover:rotate-[50deg]"
								style={{
									background: s.arc,
									mask: "radial-gradient(circle, transparent 62%, #000 63%)",
									WebkitMask: "radial-gradient(circle, transparent 62%, #000 63%)",
								}}
							/>
							<h3 data-egg="melt" className="relative mt-24 w-fit text-2xl font-medium leading-tight tracking-tight">
								{s.title[0]}
								<br />
								{s.title[1]}
							</h3>
							<p className={`relative mt-3 max-w-[210px] text-[11px] leading-relaxed transition-colors duration-700 ${dark ? "text-white/70" : "text-ink/55"}`}>{s.body}</p>
						</motion.article>
					);
				})}
			</div>

			<div className="mt-14">
				<p className="text-[11px] text-slate">Skills system · some I use daily, others I'm still exploring</p>
				<p data-egg="melt" className="mx-auto w-fit cursor-pointer select-none text-center text-[clamp(6rem,22vw,16rem)] font-medium leading-[0.9] tracking-tight">Stack</p>
				<div className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
					{toolOrder.map((i) => {
						const t = tools[i];
						return (
							<motion.div
								key={t.name}
								layout
								transition={viscous}
								onClick={shuffle}
								className="group h-full cursor-pointer rounded-[20px] bg-white p-4 shadow-[0_14px_28px_-14px_rgba(40,60,90,0.35)] ring-1 ring-white transition-[box-shadow,translate] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_36px_-14px_rgba(40,60,90,0.5)]"
							>
								<div data-egg="magnet" className="mx-auto mb-2 grid h-9 w-9 place-items-center">{t.icon}</div>
								<div data-egg="ink" data-egg-color="#141414" className="rounded-sm py-1 text-center text-[10px] font-extrabold tracking-wider text-white" style={{ background: t.bar }}>
									{t.name}
								</div>
								<p className="mt-2 text-center text-[9px] text-ink/50">{t.items}</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</Frame>
	);
}
