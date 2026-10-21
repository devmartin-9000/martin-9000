import { Frame, Reveal } from "@/components/ui";
import { byId, profile } from "@/lib/data";

const strips = [
	{ p: byId("happy-life"), art: "linear-gradient(180deg,#9ae6b4,#38a169 45%,#1a5c4a)" },
	{ p: byId("question-draft"), art: "linear-gradient(180deg,#bfdbfe,#3b82f6 45%,#1e3a8a)" },
	{ p: null, art: "linear-gradient(180deg,#fde68a,#f59e0b 45%,#b45309)" },
];

export default function SelfHosted() {
	return (
		<section className="mx-auto w-full max-w-[1240px] rounded-[28px] bg-[#9fc5bd] p-4 md:p-10">
			<Frame className="rounded-md bg-gradient-to-br from-[#124f43] via-[#2b8a74] to-[#bfe4da] shadow-xl">
				<div className="flex items-center justify-between px-6 py-5 text-[10px] font-bold text-ink md:px-10">
					<span className="hidden gap-8 sm:flex">
						<span>HOME</span>
						<span>PROJECTS</span>
						<span>ABOUT</span>
						<span>CONTACT</span>
					</span>
					<span className="flex gap-3 sm:ml-auto">
						<span className="rounded-full bg-white/90 px-8 py-1.5 text-[9px] font-normal text-ink/40">Search</span>
						<span className="rounded-full bg-[#0d3f36] px-4 py-1.5 text-white">SIGN UP</span>
					</span>
				</div>

				<div className="grid gap-8 px-6 pb-10 md:grid-cols-[1fr_1.15fr] md:px-10">
					<Reveal className="pt-2">
						<h2 className="text-[clamp(2.6rem,6vw,4.4rem)] font-bold leading-[0.95] tracking-tight text-white">
							OWN THE
							<br />
							PLATFORM
						</h2>
						<p className="mt-5 max-w-sm text-lg italic leading-snug text-white">
							“Self-hosted tools that live on your own site, with no platform fees and no lock-in.”
						</p>
						<p className="mt-4 max-w-sm text-[10px] leading-relaxed text-white/75">
							I build self-contained products meant to be deployed on a
							business's own website: a mini e-commerce platform with payments
							and an admin dashboard, and an exam generator that learns from
							past papers.
						</p>
						<a
							href={`mailto:${profile.email}`}
							className="mt-6 inline-block rounded-full bg-white px-7 py-2.5 text-xs font-bold text-ink transition-transform hover:scale-105"
						>
							GET IN TOUCH
						</a>
					</Reveal>

					<Reveal delay={0.1} className="relative min-h-[360px]">
						<div className="absolute inset-0 flex justify-center gap-3 overflow-hidden sm:gap-4">
							{strips.map((s, i) => (
								<a
									key={s.p?.id ?? "next"}
									href={s.p?.url ?? "#contact"}
									target={s.p ? "_blank" : undefined}
									rel="noreferrer"
									className="relative -mt-6 h-[420px] w-[26%] max-w-[120px] shrink-0 overflow-hidden rounded-full shadow-xl transition-transform hover:-translate-y-2"
									style={{
										background: s.art,
										transform: "skewX(-24deg)",
										marginLeft: i === 0 ? 0 : undefined,
									}}
								>
									<span
										className="absolute inset-x-0 bottom-16 text-center text-[11px] font-bold leading-tight text-white"
										style={{ transform: "skewX(24deg)" }}
									>
										{s.p ? s.p.name : "Yours next"}
										<span className="mx-auto mt-1 block max-w-[80px] text-[8px] font-normal text-white/80">
											{s.p ? s.p.category : "Let's talk"}
										</span>
									</span>
								</a>
							))}
						</div>
						<div className="absolute bottom-0 right-0 flex gap-1 text-white/70">
							{["▼", "▼", "▼"].map((a, i) => (
								<span key={i} className="text-[8px]">{a}</span>
							))}
						</div>
					</Reveal>
				</div>
			</Frame>
		</section>
	);
}
