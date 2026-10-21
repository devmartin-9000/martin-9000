import { Frame, Reveal } from "@/components/ui";

const steps = [
	{ color: "#a00a0a", dark: "#6e0606", title: "Listen", body: "Understand the problem, the users and what success looks like before a line is written." },
	{ color: "#f6a21a", dark: "#d9780f", title: "Plan & build", body: "Break the work into small shippable pieces, then build readable, reusable components." },
	{ color: "#3f7d1c", dark: "#2a5a10", title: "Test & document", body: "Automate the checks and write the guides so the next person can pick it up easily." },
	{ color: "#2a82a6", dark: "#1c5f80", title: "Ship & refine", body: "Release, watch the metrics and keep improving from what real use reveals." },
];

/** "User guide for first timer": big title left, four steps right (hexagon banners) */
export default function Guide() {
	return (
		<Frame className="bg-gradient-to-b from-[#e6e6e6] to-[#c9c9c9]">
			<div className="grid items-center gap-10 px-6 py-12 md:grid-cols-[0.8fr_1.4fr] md:px-14">
				<Reveal className="relative">
					<span className="pointer-events-none absolute -left-2 -top-10 text-[9rem] font-black leading-none text-ink/10">“</span>
					<h2 className="relative text-[clamp(2.4rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-tight">
						How I work
						<br />
						with you
					</h2>
					<p className="relative mt-4 max-w-xs text-xs leading-relaxed text-ink/60">
						Four steps from first conversation to a product that keeps improving.
					</p>
				</Reveal>

				<div className="flex flex-col gap-5 border-l-[3px] border-ink pl-5 md:pl-8">
					{steps.map((s, i) => (
						<Reveal key={s.title} delay={i * 0.06}>
							<div className="group relative flex cursor-default items-center">
								<div
									className="relative z-10 grid h-[72px] w-[66px] shrink-0 place-items-center text-xs font-bold text-white transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[60deg] group-hover:scale-110 sm:h-[84px] sm:w-[76px]"
									style={{
										clipPath: "polygon(25% 4%,75% 4%,100% 50%,75% 96%,25% 96%,0 50%)",
										background: `linear-gradient(90deg, ${s.dark} 50%, ${s.color} 50%)`,
									}}
								>
									<span className="translate-x-1 text-base transition-transform duration-500 group-hover:-rotate-[60deg]">0{i + 1}</span>
								</div>
								<div
									className="relative -ml-2 flex-1 bg-white py-3 pl-9 pr-5 shadow-[0_12px_12px_-10px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:shadow-[0_18px_18px_-10px_rgba(0,0,0,0.5)]"
									style={{ clipPath: "polygon(5% 0,100% 0,100% 100%,0 100%)" }}
								>
									<span className="absolute bottom-0 left-[9px] top-0 w-2.5 -skew-x-[18deg] transition-all duration-500 group-hover:w-5" style={{ background: s.color }} />
									<h3 className="text-sm font-semibold" style={{ color: s.color }}>
										Step {i + 1} · {s.title}
									</h3>
									<p className="mt-0.5 text-[10px] leading-relaxed text-ink/55">{s.body}</p>
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</Frame>
	);
}
