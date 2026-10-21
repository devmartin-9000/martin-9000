import { ArrowRight } from "lucide-react";
import { Frame, Reveal } from "@/components/ui";
import { profile } from "@/lib/data";

const route = [
	{ x: 90, y: 372, label: "2020 · Sales" },
	{ x: 190, y: 292, label: "2023 · Accounts" },
	{ x: 285, y: 232, label: "2024 · Support" },
	{ x: 378, y: 178, label: "2025 · Front-end" },
	{ x: 470, y: 112, label: "2026 · Engineer" },
];

export default function Hero() {
	return (
		<Frame id="top" className="bg-white pt-24 md:pt-28">
			<div className="grid items-center gap-8 px-6 pb-10 md:grid-cols-[1fr_1.15fr] md:px-12">
				<Reveal>
					<p className="mb-4 text-xs font-medium text-ink/60">Welcome to the portfolio of {profile.short}</p>
					<h1 className="display text-[clamp(3.4rem,9vw,7rem)] font-extrabold">
						Software
						<br />
						Engineer<span className="text-kinetic">.</span>
					</h1>
					<p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/70">
						A perfect guide from idea to shipped product: React interfaces,
						reliable test automation and data you can trust. Based in{" "}
						{profile.location}.
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-3">
						<a
							href="#contact"
							className="group flex items-center gap-4 rounded-2xl bg-gradient-to-br from-kinetic to-[#ff8a4c] py-3 pl-7 pr-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_18px_30px_-12px_rgba(255,97,34,0.7)] transition-transform hover:-translate-y-0.5"
						>
							Get in touch
							<span className="grid h-8 w-8 place-items-center rounded-full bg-white text-kinetic transition-transform group-hover:translate-x-1">
								<ArrowRight size={16} />
							</span>
						</a>
						<a
							href="#projects"
							className="rounded-2xl px-5 py-3 text-sm font-semibold text-ink/70 transition-colors hover:text-kinetic"
						>
							See the work →
						</a>
					</div>
				</Reveal>

				<Reveal delay={0.1} className="relative">
					<div className="relative aspect-[600/470] w-full overflow-hidden rounded-[44px] bg-[#f4c3b5]">
						<svg viewBox="0 0 600 470" className="absolute inset-0 h-full w-full" aria-hidden>
							<defs>
								<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0" stopColor="#f7d2c6" />
									<stop offset="1" stopColor="#e9876f" />
								</linearGradient>
								<linearGradient id="peak" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0" stopColor="#d9553a" />
									<stop offset="1" stopColor="#5a2b33" />
								</linearGradient>
								<filter id="soft">
									<feGaussianBlur stdDeviation="9" />
								</filter>
							</defs>
							<rect width="600" height="470" fill="url(#sky)" />
							<polygon points="0,470 0,330 120,250 210,310 340,150 470,90 600,210 600,470" fill="url(#peak)" />
							<polygon points="470,90 520,160 470,210 430,150" fill="#ffb199" opacity=".45" />
							<polygon points="340,150 390,230 330,300 290,220" fill="#ffb199" opacity=".3" />
							<polygon points="0,470 0,390 140,330 260,400 420,330 600,400 600,470" fill="#2b1d24" />
							<ellipse cx="90" cy="360" rx="90" ry="34" fill="#fff" opacity=".9" filter="url(#soft)" />
							<ellipse cx="520" cy="380" rx="100" ry="38" fill="#fff" opacity=".95" filter="url(#soft)" />
							<path
								d={`M${route.map((r) => `${r.x} ${r.y}`).join(" L")}`}
								fill="none"
								stroke="#fff"
								strokeWidth="3"
								strokeDasharray="2 9"
								strokeLinecap="round"
								className="animate-dash"
							/>
							{route.map((r, i) => (
								<g key={r.label}>
									<circle cx={r.x} cy={r.y} r={i === route.length - 1 ? 9 : 6} fill={i === route.length - 1 ? "#ff6122" : "#fff"} stroke="#fff" strokeWidth="3" />
									<text
										x={r.x + 14}
										y={r.y + 4}
										fill="#fff"
										fontSize="13"
										fontWeight="600"
										style={{ paintOrder: "stroke", stroke: "rgba(60,20,20,.45)", strokeWidth: 4 }}
									>
										{r.label}
									</text>
								</g>
							))}
						</svg>
						{/* notches, like the reference's cut-out corners */}
						<div className="absolute left-0 top-0 h-[22%] w-[24%] rounded-br-[36px] bg-white" />
						<div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-ink/85 py-1.5 pl-1.5 pr-3 text-[11px] text-white sm:left-4 sm:top-4">
							<span className="grid h-6 w-6 place-items-center rounded-full bg-kinetic text-[10px] font-bold">MJ</span>
							My path · 6 yrs
						</div>
					</div>
					<div className="absolute bottom-3 right-3 w-[44%] rounded-2xl bg-white/70 p-3 ring-1 ring-white/60 backdrop-blur-md sm:right-4">
						<p className="text-3xl font-light leading-none tracking-tight">10+</p>
						<p className="mt-1 text-[10px] leading-snug text-ink/70">production projects shipped</p>
					</div>
				</Reveal>
			</div>

		</Frame>
	);
}
