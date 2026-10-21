import { Mail } from "lucide-react";
import { Frame, Photo, Reveal } from "@/components/ui";
import { byId, profile } from "@/lib/data";

const art = byId("fidim").accent;

/** "Satisfied clients speaks" layout: two overlapping image cards + a profile card */
export default function About() {
	return (
		<Frame id="about" className="bg-paper px-5 py-12 md:px-12">
			<Reveal className="text-center">
				<p className="text-xs font-medium text-ink/55">✦ {profile.location}</p>
				<h2 className="display mt-3 text-[clamp(3rem,8vw,6.5rem)] font-black lowercase">
					hello, i'm martin
				</h2>
			</Reveal>

			<div className="mt-10 grid items-center gap-8 md:grid-cols-[1fr_1fr]">
				<Reveal className="relative mx-auto h-[360px] w-full max-w-[460px] md:h-[400px]">
					<div className="absolute left-0 top-0 h-[58%] w-[62%] overflow-hidden rounded-[28px] shadow-lg" style={{ background: `linear-gradient(150deg, ${art[0]}, ${art[1]})` }}>
						{/* Drop your own photo at public/assets/about-secondary.jpg */}
						<img
							src="./assets/about-secondary.jpg"
							alt=""
							loading="lazy"
							className="h-full w-full object-cover"
							onError={(e) => (e.currentTarget.style.display = "none")}
						/>
					</div>
					<div className="absolute bottom-0 right-0 h-[82%] w-[70%] overflow-hidden rounded-[36px] bg-[#fdb139] shadow-xl">
						<div className="absolute inset-x-0 bottom-0 top-[7%] mx-auto w-[86%] overflow-hidden rounded-t-[26px]">
							<Photo />
						</div>
					</div>
				</Reveal>

				<Reveal delay={0.1}>
					<div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
						<div className="flex items-center gap-3">
							<span className="h-11 w-11 overflow-hidden rounded-full bg-[#fdb139]">
								<Photo />
							</span>
							<div className="leading-tight">
								<p className="text-sm font-bold">{profile.name}</p>
								<p className="text-[11px] text-ink/50">{profile.role} · Aliyoop Limited</p>
								<p className="mt-0.5 text-kinetic">★★★★★</p>
							</div>
						</div>
						<p className="mt-4 text-sm italic leading-relaxed text-ink/70">
							“I moved into tech from sales, operations and accounting, which
							is why I care as much about the people using a product as the
							code behind it. Six years across five industries taught me to
							listen first, automate the repetitive, and document everything.”
						</p>
						<div className="mt-5 flex items-center gap-3">
							{[
								{ label: "gh", href: profile.github },
								{ label: "in", href: profile.linkedin },
							].map((s) => (
								<a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-ink/70 text-[11px] font-medium transition-colors hover:bg-ink hover:text-white">
									{s.label}
								</a>
							))}
							<a href={`mailto:${profile.email}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-ink/70 transition-colors hover:bg-ink hover:text-white">
								<Mail size={14} />
							</a>
						</div>
					</div>
					<a href="#experience" className="mt-3 flex items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-xs font-semibold text-white transition-colors hover:bg-kinetic">
						See experience <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-ink">→</span>
					</a>
				</Reveal>
			</div>
		</Frame>
	);
}
