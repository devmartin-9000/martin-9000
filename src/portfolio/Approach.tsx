import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowDot, Eyebrow } from "./shared";

type Step = {
	n: string;
	label: string;
	title: ReactNode;
	body: string;
	art: ReactNode;
	light?: boolean;
	/** pushes alternate cards down for the staggered row */
	offset?: boolean;
};

/** Concentric dial, standing in for the reference's scanner close-up. */
const Dial = (
	<div className="absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[repeating-radial-gradient(circle,#3a3a3a_0_1px,transparent_1px_9px)] opacity-70 [mask-image:radial-gradient(circle,#000_40%,transparent_70%)]" />
);

/** Warm amber glow, standing in for the serum bottle. */
const Glow = (
	<>
		<div className="absolute left-1/2 top-[18%] h-40 w-40 -translate-x-1/2 rounded-full bg-kinetic/60 blur-3xl" />
		<div className="absolute left-1/2 top-[14%] h-36 w-14 -translate-x-1/2 rounded-[14px] bg-gradient-to-b from-[#3b2a20] via-[#7a3d17] to-[#1a1310] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]" />
		<div className="absolute left-1/2 top-[10%] h-6 w-8 -translate-x-1/2 rounded-t-md bg-[#1d1d1d]" />
	</>
);

/** Fine diagonal strands, standing in for the hair macro shot. */
const Strands = (
	<div className="absolute inset-x-0 top-0 h-3/5 bg-[repeating-linear-gradient(105deg,transparent_0_7px,rgba(255,255,255,0.13)_7px_8px)] [mask-image:linear-gradient(180deg,#000,transparent)]" />
);

/** Ripples in a pale drop, standing in for the dropper shot. */
const Ripple = (
	<div className="absolute -right-10 top-[8%] h-52 w-52 rounded-full bg-[repeating-radial-gradient(circle,rgba(199,140,60,0.25)_0_1px,transparent_1px_12px)] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]">
		<div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#f7d48a] to-[#c9862d] shadow-[0_8px_20px_rgba(201,134,45,0.5)]" />
	</div>
);

const steps: Step[] = [
	{
		n: "01",
		label: "Discovery",
		title: "Understand the Problem First",
		body: "I map the workflows, users and edge cases before a line of code is written.",
		art: Dial,
	},
	{
		n: "02",
		label: "Build",
		title: (
			<>
				Interfaces That Get <span className="text-kinetic">Real Results</span>
			</>
		),
		body: "Fast, accessible React and TypeScript front-ends people enjoy using.",
		art: Glow,
		offset: true,
	},
	{
		n: "03",
		label: "Testing",
		title: "Stable Code From the Root",
		body: "Playwright suites and data checks that catch problems before users do.",
		art: Strands,
	},
	{
		n: "04",
		label: "Ongoing Care",
		title: "A Product Ready for What's Next",
		body: "Documentation, fixes and steady iteration long after launch day.",
		art: Ripple,
		light: true,
		offset: true,
	},
];

export default function Approach() {
	return (
		<section id="approach" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 md:px-10 md:py-28">
			<div data-reveal className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
				<div>
					<Eyebrow>My approach</Eyebrow>
					<h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.03em]">
						Thoughtful Engineering
						<br />
						for <span className="text-kinetic">Faster, Reliable</span> Releases.
					</h2>
				</div>
				<div className="md:pb-1">
					<p className="max-w-[300px] text-[13px] leading-relaxed text-ink/45">
						Six years across sales, accounting, support and engineering taught me to build
						for the people using the product, not just the spec.
					</p>
					<a href="#projects" className="group mt-5 flex w-fit items-center gap-3 text-[12px] font-medium">
						<span className="grid h-8 w-8 place-items-center rounded-full ring-1 ring-ink/20 transition-colors group-hover:bg-ink group-hover:text-white">
							→
						</span>
						Explore Projects
					</a>
				</div>
			</div>

			<div className="mt-10 grid grid-cols-2 gap-2.5 sm:gap-4 md:mt-14 lg:grid-cols-4">
				{steps.map((s, i) => (
					<article
						key={s.n}
						data-reveal={i + 1}
						className={cn(
							"group relative flex min-h-[270px] flex-col overflow-hidden rounded-[18px] p-3.5 sm:min-h-[360px] sm:rounded-[22px] sm:p-5",
							s.light ? "bg-gradient-to-b from-[#f3efe9] to-[#e4ddd3] text-ink" : "bg-[#121212] text-white",
							s.offset && "translate-y-5 lg:translate-y-8"
						)}
					>
						{s.art}
						<span
							className={cn(
								"relative w-fit rounded-full px-2 py-1 text-[8px] font-medium sm:px-2.5 sm:text-[9px]",
								s.light ? "bg-white/70 text-ink/60" : "bg-white/10 text-white/70 ring-1 ring-white/10"
							)}
						>
							{s.n} / {s.label}
						</span>
						<div className="relative mt-auto pt-24 sm:pt-40">
							<h3 className="max-w-[200px] text-[15px] sm:text-[19px] font-medium leading-[1.2] tracking-tight">{s.title}</h3>
							<p className={cn("mt-3 max-w-[210px] text-[11px] leading-relaxed", s.light ? "text-ink/50" : "text-white/50")}>
								{s.body}
							</p>
							<ArrowDot dark={s.light} className="mt-4 h-7 w-7 sm:mt-5 sm:h-8 sm:w-8" />
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
