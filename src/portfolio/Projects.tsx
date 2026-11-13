import { featured, profile } from "@/lib/data";
import { ArrowDot, Eyebrow, PillButton, Thumb } from "./shared";

export default function Projects() {
	return (
		<section id="projects" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 pb-20 pt-8 md:px-10 md:pb-28">
			<div className="flex flex-wrap items-end justify-between gap-6">
				<div>
					<Eyebrow>Selected work</Eyebrow>
					<h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.03em]">
						Products I've <span className="text-kinetic">Built</span>
						<br />
						and Shipped.
					</h2>
				</div>
				<PillButton href={profile.github} light external>
					All projects on GitHub
				</PillButton>
			</div>

			<div className="mt-12 grid gap-4 md:grid-cols-2">
				{featured.map((p, i) => (
					<a
						key={p.id}
						href={p.url}
						target="_blank"
						rel="noreferrer"
						className="group flex flex-col overflow-hidden rounded-[22px] bg-[#121212] p-2 text-white"
					>
						<div className="relative aspect-[1.9] overflow-hidden rounded-[16px] bg-white">
							<Thumb project={p} className="object-top transition-transform duration-700 group-hover:scale-[1.04]" />
							<span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-medium text-white/80 backdrop-blur">
								{String(i + 1).padStart(2, "0")} / {p.category}
							</span>
						</div>
						<div className="flex items-end justify-between gap-6 px-3 pb-3 pt-5">
							<div>
								<h3 className="text-[19px] font-medium tracking-tight">{p.name}</h3>
								<p className="mt-1 text-[12px] text-white/50">{p.tagline}</p>
							</div>
							<ArrowDot />
						</div>
					</a>
				))}
			</div>
		</section>
	);
}
