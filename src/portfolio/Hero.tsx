import { Briefcase, Check, ChevronRight, CodeXml, Navigation2 } from "lucide-react";
import { jobs, profile } from "@/lib/data";

const points = [
	"React & TypeScript interfaces",
	"Playwright test automation",
	"BigQuery data workflows",
	"Open to remote work",
];

const current = jobs[0];

/** Three-dot "level" meter from the reference card. */
function Level({ label }: { label: string }) {
	return (
		<span className="flex items-center gap-1 text-[10px] font-semibold uppercase text-emerald-600">
			<span className="flex gap-0.5">
				{[0, 1, 2].map((i) => (
					<span key={i} className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
				))}
			</span>
			{label}
		</span>
	);
}

export default function Hero() {
	return (
		<section id="top" className="relative overflow-hidden rounded-[28px] bg-[#f5f5f6]">
			<div className="grid min-h-[640px] lg:grid-cols-[1.05fr_1fr]">
				{/* left: copy */}
				<div className="relative z-10 flex flex-col px-6 pb-12 pt-6 md:px-12">
					<nav className="flex items-center gap-7 text-[13px] text-ink/70">
						<a href="#top" aria-label="Home">
							<img src="./assets/logo-mj.svg" alt="" className="h-7 w-7" />
						</a>
						<a href="#top" className="hidden hover:text-ink sm:block">Home</a>
						<a href="#about" className="hover:text-ink">About</a>
						<a href="#work" className="hover:text-ink">Work</a>
						<a href="#contact" className="hover:text-ink">Contact</a>
					</nav>

					<div className="my-auto pt-16 lg:pt-10">
						<h1 className="max-w-[560px] text-[clamp(2.6rem,5.4vw,4.1rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
							Design, build and ship web apps in weeks
						</h1>
						<p className="mt-5 max-w-[360px] text-[15px] leading-relaxed text-ink/55">
							I'm {profile.short}, a {profile.role.toLowerCase()} in {profile.location}. I
							turn ideas into reliable products people actually use.
						</p>
						<a
							href="#contact"
							className="mt-7 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
						>
							Get in touch
						</a>
						<ul className="mt-8 space-y-2.5 text-[13px] text-ink/60">
							{points.map((p) => (
								<li key={p} className="flex items-center gap-2.5">
									<Check size={14} className="text-ink/45" />
									{p}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* right: road scene */}
				<div className="relative min-h-[520px] overflow-hidden bg-[#eceef1] max-sm:min-h-[640px]">
					{/* snowy foliage */}
					<div className="absolute -right-16 top-6 h-64 w-64 rounded-full bg-white opacity-90 blur-2xl" />
					<div className="absolute -right-6 top-1/2 h-72 w-56 rounded-full bg-white blur-2xl" />
					<div className="absolute -bottom-10 right-10 h-56 w-72 rounded-full bg-white blur-2xl" />
					<div className="absolute -left-10 bottom-24 h-40 w-40 rounded-full bg-white/80 blur-2xl" />

					{/* road */}
					<div className="absolute inset-y-0 left-[10%] w-[34%] border-x border-black/[0.04] bg-[#f7f7f8]">
						<div className="absolute inset-y-0 left-1/2 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#9db4ff] via-[#8fa8f7] to-[#c3a6f5]" />
						<span className="absolute left-1/2 top-[11%] grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-[#4f7cff] text-white shadow-[0_0_0_4px_white,0_8px_20px_-6px_rgba(79,124,255,0.8)]">
							<Navigation2 size={15} fill="currentColor" />
						</span>

						{/* laptop, top-down, standing in for the car */}
						<div className="absolute left-1/2 top-[38%] max-sm:top-[18%] w-[62%] max-w-[170px] -translate-x-1/2 drop-shadow-[0_26px_22px_rgba(0,0,0,0.28)]">
							<div className="rounded-t-[14px] bg-gradient-to-b from-[#2b2b2e] to-[#0e0e10] p-2">
								<div className="aspect-[16/10] rounded-[6px] bg-[linear-gradient(140deg,#1f2a44,#0c0f17_60%,#2a2140)] p-2">
									<div className="h-1 w-1/2 rounded bg-white/50" />
									<div className="mt-1.5 h-1 w-1/3 rounded bg-white/25" />
									<div className="mt-3 grid grid-cols-3 gap-1">
										{[0, 1, 2].map((i) => (
											<div key={i} className="aspect-square rounded-[3px] bg-white/10" />
										))}
									</div>
								</div>
							</div>
							<div className="h-1.5 bg-[#d7d8dc]" />
							<div className="rounded-b-[14px] bg-gradient-to-b from-white to-[#e9eaee] p-2.5">
								<div className="grid grid-cols-10 gap-[3px]">
									{Array.from({ length: 30 }, (_, i) => (
										<span key={i} className="aspect-square rounded-[2px] bg-[#cfd1d6]" />
									))}
								</div>
								<div className="mx-auto mt-2 h-5 w-2/5 rounded-[5px] bg-[#dcdde1]" />
							</div>
						</div>
					</div>

					{/* info card */}
					<div className="absolute right-[5%] top-[30%] w-[min(290px,calc(100%-32px))] rounded-2xl bg-white p-4 text-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,0.3)] max-sm:right-4 max-sm:top-auto max-sm:bottom-4">
						<span className="rounded-md bg-emerald-500 px-1.5 py-0.5 text-[11px] font-semibold text-white">
							Open to work
						</span>
						<p className="mt-3 text-[17px] font-semibold tracking-tight">{profile.short}</p>
						<p className="text-[12px] text-ink/50">{profile.location} · Remote</p>
						<p className="mt-3 text-[12px] text-ink/60">
							<span className="font-semibold text-ink">10+ projects</span> shipped over the
							last 6 years.
						</p>

						<div className="mt-3 space-y-3 border-t border-black/[0.07] pt-3">
							<div>
								<div className="flex items-center justify-between">
									<span className="flex items-center gap-2 text-[12px] font-medium">
										<Briefcase size={14} className="text-ink/60" /> Current role
									</span>
									<Level label="Now" />
								</div>
								<p className="mt-0.5 pl-[22px] text-[12px] text-ink/50">
									{current.role} · {current.company}
								</p>
							</div>
							<div>
								<div className="flex items-center justify-between">
									<span className="flex items-center gap-2 text-[12px] font-medium">
										<CodeXml size={14} className="text-ink/60" /> Core stack
									</span>
									<Level label="React" />
								</div>
								<p className="mt-0.5 pl-[22px] text-[12px] text-ink/50">
									TypeScript, Tailwind, Playwright
								</p>
							</div>
						</div>

						<a
							href="#about"
							className="mt-3 flex items-center justify-between border-t border-black/[0.07] pt-3 text-[12px] text-ink/60 hover:text-ink"
						>
							More about me <ChevronRight size={14} />
						</a>
					</div>

					<a
						href={`mailto:${profile.email}`}
						className="absolute right-5 top-5 rounded-full bg-white px-4 py-1.5 text-[13px] font-medium shadow-sm ring-1 ring-black/5 hover:bg-ink hover:text-white"
					>
						Email me
					</a>
				</div>
			</div>
		</section>
	);
}
