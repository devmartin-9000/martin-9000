import { useState, type CSSProperties } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { byId, profile, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const grain =
	"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

/** Projects shown in the carousel, in this order. */
const featured = ["vetta", "kashcraze", "fintriqs", "raveona"].map(byId);

/** The live site's preview, floated inside the dark glossy tile from the reference. */
function Thumb({ project }: { project: Project }) {
	return (
		<div className="w-[84%] -rotate-[4deg] overflow-hidden rounded-[14px] bg-white shadow-[0_24px_40px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-500 group-hover/card:rotate-0 group-hover/card:scale-[1.03]">
			<img
				src={project.thumbnail}
				alt={`${project.name} preview`}
				loading="lazy"
				className="aspect-[1.9] w-full object-cover object-top"
			/>
		</div>
	);
}

function Card({ project, index }: { project: Project; index: number }) {
	const stats = [
		{ value: project.category, label: "Category" },
		{ value: project.tags[0], label: "Focus" },
		{ value: String(index + 1).padStart(2, "0"), label: `of ${featured.length}` },
	];
	return (
		<article className="flex h-full flex-col gap-6 group/card rounded-[44px] bg-[#efefef] p-2 md:flex-row md:gap-9">
			<div className="grid aspect-square shrink-0 place-items-center rounded-[40px] bg-[radial-gradient(circle_at_50%_40%,#2a2a2d,#0b0b0c_75%)] shadow-[inset_0_2px_6px_rgba(255,255,255,0.12),0_10px_30px_-10px_rgba(0,0,0,0.5)] ring-[6px] ring-white md:h-full">
				<Thumb project={project} />
			</div>

			<div className="flex flex-1 flex-col px-4 pb-6 md:py-7 md:pr-10 md:pl-0">
				<div className="flex items-center gap-2">
					<span className="h-5 w-7 bg-[repeating-linear-gradient(115deg,#141414_0_2px,transparent_2px_4px)] [clip-path:polygon(20%_0,100%_0,80%_100%,0_100%)]" />
					<span className="text-[13px] font-semibold uppercase tracking-[0.28em]">{project.name}</span>
				</div>

				<h3 className="mt-6 text-[clamp(1.3rem,2.2vw,1.65rem)] font-medium leading-[1.2] tracking-tight">
					{project.tagline}
				</h3>
				<p className="mt-3 line-clamp-3 max-w-[330px] text-[13px] leading-relaxed text-ink/70">
					{project.description}
				</p>
				<a
					href={project.url}
					target="_blank"
					rel="noreferrer"
					className="group mt-5 flex w-fit items-center gap-2 text-[13px] font-medium underline underline-offset-4"
				>
					Visit Project
					<span className="grid h-4 w-4 place-items-center rounded-full bg-ink/40 text-white transition-colors group-hover:bg-ink">
						<ArrowRight size={10} />
					</span>
				</a>

				<dl className="mt-auto flex flex-wrap gap-x-10 gap-y-4 pt-8">
					{stats.map((s) => (
						<div key={s.label}>
							<dt className="whitespace-nowrap text-[clamp(1.1rem,2vw,1.45rem)] font-normal tracking-tight">{s.value}</dt>
							<dd className="mt-1 text-[11px] text-ink/70">{s.label}</dd>
						</div>
					))}
				</dl>
			</div>
		</article>
	);
}

export default function Work() {
	const [active, setActive] = useState(0);
	const n = featured.length;
	const go = (d: number) => setActive((a) => (a + d + n) % n);

	return (
		<section
			id="work"
			className="relative overflow-hidden rounded-[28px] bg-[#0d0d0d] px-3 py-16 md:px-16 md:py-24"
		>
			<div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen" style={{ backgroundImage: grain }} />
			<div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[260px] -translate-x-1/4 rotate-[25deg] bg-white/25 blur-3xl" />

			<div className="relative overflow-hidden rounded-[40px] bg-white px-3 pb-12 pt-14 md:rounded-[48px] md:px-6 md:pb-14 md:pt-20">
				<div className="mx-auto flex w-fit items-center gap-3 rounded-full bg-[#f2f2f2] px-3 py-1.5 text-[10px] uppercase">
					<span className="text-ink/45">003</span>
					<span className="flex items-center gap-1.5 font-medium">
						<span className="h-1.5 w-1.5 rounded-full bg-ink" /> Selected Work
					</span>
				</div>
				<h2 className="mt-5 text-center text-[clamp(2.2rem,5vw,3.6rem)] font-medium tracking-[-0.035em]">
					What I've Built
				</h2>

				{/* carousel */}
				<div className="relative mx-auto mt-12 md:h-[380px] md:max-w-[900px]">
					{featured.map((p, i) => {
						let off = i - active;
						if (off > n / 2) off -= n;
						if (off < -n / 2) off += n;
						const visible = Math.abs(off) <= 1;
						return (
							<div
								key={p.id}
								aria-hidden={off !== 0}
								className={cn(
									"transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:absolute md:inset-y-0 md:left-1/2 md:w-[86%] md:[transform:var(--t)]",
									off === 0 ? "relative z-20" : "hidden md:block",
									off !== 0 && "pointer-events-none z-10",
									!visible && "md:opacity-0"
								)}
								style={
									{
										"--t": `translateX(calc(-50% + ${off * 16}%)) scale(${off === 0 ? 1 : 0.82})`,
										opacity: off === 0 ? 1 : visible ? 0.55 : 0,
									} as CSSProperties
								}
							>
								<Card project={p} index={i} />
							</div>
						);
					})}

					<button
						onClick={() => go(-1)}
						aria-label="Previous project"
						className="absolute left-2 top-[24%] z-30 grid h-10 w-10 place-items-center rounded-full bg-black text-white shadow-[0_6px_14px_rgba(0,0,0,0.35)] md:-left-4 md:top-1/2 md:-translate-y-1/2"
					>
						<ChevronLeft size={16} />
					</button>
					<button
						onClick={() => go(1)}
						aria-label="Next project"
						className="absolute right-2 top-[24%] z-30 grid h-10 w-10 place-items-center rounded-full bg-black text-white shadow-[0_6px_14px_rgba(0,0,0,0.35)] md:-right-4 md:top-1/2 md:-translate-y-1/2"
					>
						<ChevronRight size={16} />
					</button>
				</div>

				<div className="mt-9 flex justify-center gap-2">
					{featured.map((p, i) => (
						<button
							key={p.id}
							onClick={() => setActive(i)}
							aria-label={`Show ${p.name}`}
							className={cn(
								"h-1.5 rounded-full transition-all",
								i === active
									? "w-8 bg-[linear-gradient(90deg,#f9c7d6,#c6d4ff,#a8e1ff)]"
									: "w-1.5 bg-black/15 hover:bg-black/30"
							)}
						/>
					))}
				</div>

				<div className="mt-10 flex justify-center">
					<a
						href={profile.github}
						target="_blank"
						rel="noreferrer"
						className="rounded-full bg-[#111] px-5 py-3 text-[13px] text-white shadow-[0_0_0_2px_#fff,0_0_0_3px_rgba(150,160,255,0.45),0_10px_24px_-8px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5"
					>
						Explore all on GitHub
					</a>
				</div>
			</div>
		</section>
	);
}
