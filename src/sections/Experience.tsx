import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui";
import { motion } from "motion/react";
import { jobs } from "@/lib/data";

/** "Blog section" carousel, on the primary orange, with dark cards */
export default function Experience() {
	const track = useRef<HTMLDivElement>(null);
	const scroll = (dir: number) =>
		track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

	return (
		<motion.section
			id="experience"
			initial={{ opacity: 0, y: 36 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
			className="w-full scroll-mt-24 overflow-hidden rounded-[28px] bg-kinetic px-4 py-10 text-white md:px-12"
		>
			<div className="mb-8 flex items-center justify-between gap-4">
				<div className="w-fit rounded-full border border-white/50 bg-white/10 px-8 py-2 text-sm font-medium">Experience</div>
				<div className="flex gap-2">
					<button onClick={() => scroll(-1)} aria-label="Previous" className="grid h-8 w-8 place-items-center rounded-full bg-black/15 hover:bg-black/25">
						<ChevronLeft size={16} />
					</button>
					<button onClick={() => scroll(1)} aria-label="Next" className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white">
						<ChevronRight size={16} />
					</button>
				</div>
			</div>

			<div ref={track} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				{jobs.map((j, i) => (
					<Reveal key={j.id} className="w-[84%] shrink-0 snap-start sm:w-[calc((100%-3rem)/4)]">
						<article className="flex h-full flex-col overflow-hidden rounded-md bg-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
							<div className="relative h-28 overflow-hidden bg-gradient-to-br from-[#141414] via-[#2a1409] to-[#7a2c0c]">
								<div className="absolute -right-6 top-0 h-full w-1/3 skew-x-[-8deg] bg-gradient-to-b from-[#ffb08a] to-[#ff6122] opacity-90" />
								<div className="absolute -left-4 bottom-[-30px] h-24 w-24 rounded-full bg-white/30 blur-2xl" />
								<span className="absolute left-3 top-3 text-xs font-black tracking-tighter">MJ</span>
								<span className="absolute bottom-2 right-3 text-4xl font-light text-white/90">0{i + 1}</span>
							</div>
							<div className="flex flex-1 flex-col p-4">
								<p className="text-[9px] font-medium uppercase tracking-wider text-white/60">{j.period}</p>
								<h3 className="mt-1 text-sm font-bold leading-tight">{j.role}</h3>
								<p className="text-[11px] text-white/70">{j.company}</p>
								<ul className="mt-3 space-y-1.5 text-[10px] leading-snug text-white/65">
									{j.points.slice(0, 3).map((p) => (
										<li key={p} className="border-t border-white/15 pt-1.5">
											{p}
										</li>
									))}
								</ul>
							</div>
						</article>
					</Reveal>
				))}
			</div>
		</motion.section>
	);
}
