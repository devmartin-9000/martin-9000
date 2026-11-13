import { BookOpen, ChartColumn, Component, FlaskConical, Monitor, Terminal } from "lucide-react";
import {
	siDotnet,
	siGnubash,
	siGooglebigquery,
	siJavascript,
	siNextdotjs,
	siNodedotjs,
	siPython,
	siReact,
	siTailwindcss,
	siTypescript,
	type BrandIcon,
} from "@/lib/brand-icons";
import { Eyebrow } from "./shared";

type Tech = { name: string; icon?: BrandIcon };

const stack: Tech[] = [
	{ name: "React", icon: siReact },
	{ name: "TypeScript", icon: siTypescript },
	{ name: "JavaScript", icon: siJavascript },
	{ name: "Next.js", icon: siNextdotjs },
	{ name: "Tailwind CSS", icon: siTailwindcss },
	{ name: "Node.js", icon: siNodedotjs },
	{ name: "Playwright" },
	{ name: "Java" },
	{ name: "BigQuery", icon: siGooglebigquery },
	{ name: "Python", icon: siPython },
	{ name: ".NET", icon: siDotnet },
	{ name: "Bash", icon: siGnubash },
];

const abilities = [
	{
		icon: Monitor,
		title: "Front-end engineering",
		body: "Responsive, accessible React and TypeScript interfaces, from landing pages to dashboards.",
	},
	{
		icon: Component,
		title: "Component systems",
		body: "Reusable component libraries that keep UI consistent across products and teams.",
	},
	{
		icon: FlaskConical,
		title: "Test automation",
		body: "Playwright and Java suites for enterprise apps, including Salesforce-based systems.",
	},
	{
		icon: ChartColumn,
		title: "Data & analytics",
		body: "BigQuery workflows, e-commerce event tracking and A/B test analysis.",
	},
	{
		icon: Terminal,
		title: "Tooling & scripting",
		body: "Bash and .bat tooling that removes repetitive work from the development loop.",
	},
	{
		icon: BookOpen,
		title: "Documentation & support",
		body: "Clear guides, product docs and direct, calm communication with clients.",
	},
];

function TechIcon({ tech }: { tech: Tech }) {
	if (!tech.icon) {
		return (
			<span className="grid h-7 w-7 place-items-center rounded-md bg-white/10 text-[11px] font-semibold text-white/80">
				{tech.name.slice(0, 2)}
			</span>
		);
	}
	return (
		<svg viewBox="0 0 24 24" className="h-7 w-7 fill-white/80" aria-hidden>
			<path d={tech.icon.path} />
		</svg>
	);
}

export default function Skills() {
	return (
		<section id="skills" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 md:px-10 md:py-28">
			<Eyebrow>Skills</Eyebrow>
			<h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.03em]">
				The Tools I <span className="text-kinetic">Build</span> With.
			</h2>

			<div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
				{/* tech stack */}
				<div className="relative overflow-hidden rounded-[22px] bg-[#121212] p-5 text-white sm:p-7">
					<div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-kinetic/25 blur-3xl" aria-hidden />
					<div className="relative flex items-center justify-between">
						<span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-medium text-white/70 ring-1 ring-white/10">
							Tech stack
						</span>
						<span className="text-[11px] text-white/35">{stack.length} tools</span>
					</div>
					<ul className="relative mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
						{stack.map((t) => (
							<li
								key={t.name}
								className="flex aspect-square flex-col items-center justify-center gap-2.5 rounded-[16px] bg-white/[0.04] text-center ring-1 ring-white/[0.06] transition-colors hover:bg-white/[0.09]"
							>
								<TechIcon tech={t} />
								<span className="px-1 text-[10px] leading-tight text-white/60">{t.name}</span>
							</li>
						))}
					</ul>
				</div>

				{/* abilities */}
				<ul className="grid grid-cols-2 gap-2.5 sm:gap-4">
					{abilities.map((a, i) => (
						<li key={a.title} className="flex flex-col rounded-[18px] bg-[#f4f3f1] p-4 sm:rounded-[22px] sm:p-5">
							<div className="flex items-center justify-between">
								<span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink">
									<a.icon size={16} />
								</span>
								<span className="text-[10px] text-ink/35">{String(i + 1).padStart(2, "0")}</span>
							</div>
							<h3 className="mt-8 text-[14px] font-medium leading-tight tracking-tight sm:text-[16px]">{a.title}</h3>
							<p className="mt-2 text-[11px] leading-relaxed text-ink/55 sm:text-[12px]">{a.body}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
