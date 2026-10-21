import {
	Briefcase,
	CalendarDays,
	Coffee,
	IdCard,
	Mail,
	MessagesSquare,
	Monitor,
	Phone,
	Printer,
	type LucideIcon,
} from "lucide-react";
import { Frame, Reveal } from "@/components/ui";

const services = [
	{
		n: "01",
		title: ["Front-end", "Engineering"],
		body: "Responsive React, TypeScript and Tailwind interfaces, plus reusable component libraries that keep teams consistent and delivery fast.",
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
		title: ["Data &", "Documentation"],
		body: "BigQuery workflows, validation checks and A/B reporting, backed by clear guides and reproducible code that outlive the project.",
		arc: "conic-gradient(from 100deg,#bef264,#22c55e,#0d9488,#bef264)",
	},
];

const tools: { name: string; items: string; bar: string; icon: LucideIcon }[] = [
	{ name: "JAVA", items: "Enterprise automation", bar: "linear-gradient(90deg,#ffb020,#ffd54a)", icon: MessagesSquare },
	{ name: "PYTHON", items: "Scripting & data", bar: "linear-gradient(90deg,#8590ad,#a3acc4)", icon: Monitor },
	{ name: "TYPESCRIPT", items: "JavaScript · Node · Express", bar: "linear-gradient(90deg,#5dbb5a,#8ed58a)", icon: Coffee },
	{ name: "REACT", items: "Next.js · HTML · CSS", bar: "linear-gradient(90deg,#1faa59,#46c97c)", icon: Mail },
	{ name: "TAILWIND", items: "Design systems · Figma", bar: "linear-gradient(90deg,#27b7c9,#6fd8e3)", icon: IdCard },
	{ name: "PLAYWRIGHT", items: "Test automation", bar: "linear-gradient(90deg,#2f6fb5,#5f9bd6)", icon: Phone },
	{ name: "SQL", items: "BigQuery · Reporting", bar: "linear-gradient(90deg,#8b7566,#b09c8d)", icon: CalendarDays },
	{ name: "BASH & BAT", items: "Workflow scripting", bar: "linear-gradient(90deg,#e0361b,#ff6a3d)", icon: Briefcase },
	{ name: "C# / .NET", items: "Still exploring", bar: "linear-gradient(90deg,#ec4b9c,#f48dc3)", icon: Printer },
];

/** Numbered services cards (01 active/black), then the stack as typography + step-style tool cards */
export default function Services() {
	return (
		<Frame id="skills" className="bg-[#f3f3f1] px-5 py-12 md:px-12">
			<h2 className="mb-8 text-center text-2xl font-bold tracking-tight">Services</h2>
			<div className="grid gap-4 md:grid-cols-3">
				{services.map((s, i) => (
					<Reveal key={s.n} delay={i * 0.08}>
						<article
							className={`relative min-h-[320px] overflow-hidden rounded-[24px] p-6 ${
								s.dark ? "bg-ink text-white" : "bg-white text-ink shadow-sm ring-1 ring-black/5"
							}`}
						>
							<span className="absolute right-5 top-4 text-3xl font-light">{s.n}</span>
							<div
								className="absolute -bottom-40 -right-36 h-64 w-64 rounded-full opacity-90"
								style={{
									background: s.arc,
									mask: "radial-gradient(circle, transparent 62%, #000 63%)",
									WebkitMask: "radial-gradient(circle, transparent 62%, #000 63%)",
								}}
							/>
							<h3 className="relative mt-24 text-2xl font-medium leading-tight tracking-tight">
								{s.title[0]}
								<br />
								{s.title[1]}
							</h3>
							<p className={`relative mt-3 max-w-[210px] text-[11px] leading-relaxed ${s.dark ? "text-white/70" : "text-ink/55"}`}>{s.body}</p>
						</article>
					</Reveal>
				))}
			</div>

			<div className="mt-14">
				<div className="flex items-end justify-between gap-4">
					<p className="text-[11px] text-slate">Skills system · some I use daily, others I'm still exploring</p>
				</div>
				<p className="select-none text-center text-[clamp(6rem,22vw,16rem)] font-medium leading-[0.9] tracking-tight">Stack</p>
				<div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
					{tools.map((t, i) => (
						<Reveal key={t.name} delay={(i % 3) * 0.05}>
							<div className="h-full rounded-[20px] bg-white p-4 shadow-[0_14px_28px_-14px_rgba(40,60,90,0.35)] ring-1 ring-white">
								<t.icon size={28} strokeWidth={1.1} className="mx-auto mb-2 text-ink/70" />
								<div className="rounded-sm py-1 text-center text-[10px] font-extrabold tracking-wider text-white" style={{ background: t.bar }}>
									{t.name}
								</div>
								<p className="mt-2 text-center text-[9px] text-ink/50">{t.items}</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</Frame>
	);
}
