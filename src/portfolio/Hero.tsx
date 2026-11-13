import { featured, profile, rants, site } from "@/lib/data";
import { ArrowDot, PillButton, Thumb } from "./shared";

/**
 * Your portrait, set in /admin → Site settings. A cut-out on a transparent or
 * white background works best. Empty shows the placeholder silhouette.
 */
const PORTRAIT = site.portrait;

/** First featured project (lowest order) gets the dark floating card. */
const latest = featured[0] as (typeof featured)[number] | undefined;

/** The range at a glance, for anyone deciding whether to hire me. */
const whatIDo = [
	"Front-end engineering",
	"Test automation",
	"Data & analytics",
	"Component libraries",
	"Tooling & scripting",
	"Docs & client support",
];

/** Newest rant gets the light floating card. */
const latestYap = rants[0] as (typeof rants)[number] | undefined;


function Silhouette({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 400 460" className={className} aria-hidden>
			<path
				d="M196 40c52 0 88 36 90 88 2 30-8 56-20 74l6 40c4 18 24 30 60 40 40 12 68 40 68 90v88H0v-88c0-50 30-78 72-90 34-10 54-22 58-40l6-40c-14-18-24-44-22-74 2-52 30-88 82-88z"
				fill="currentColor"
			/>
		</svg>
	);
}

/** Portrait with the horizontal motion-blur trail from the reference. */
function Portrait() {
	const layer = PORTRAIT ? (
		<img src={PORTRAIT} alt="" className="h-full w-full object-contain object-bottom" />
	) : (
		<Silhouette className="h-full w-full text-[#9d958d]" />
	);
	return (
		<div className="relative mx-auto aspect-[400/460] w-[min(520px,82vw)] md:translate-x-[8%]">
			{/* blur trail */}
			<div className="absolute inset-0 origin-left translate-x-[18%] scale-x-[1.35] opacity-60 blur-[18px] portrait-trail" aria-hidden>
				{layer}
			</div>
			<div className="absolute inset-0 origin-left translate-x-[8%] scale-x-[1.12] opacity-50 blur-[6px] portrait-trail" aria-hidden>
				{layer}
			</div>
			<div className="portrait-main absolute inset-0">
				{PORTRAIT ? (
					<img src={PORTRAIT} alt={profile.name} className="h-full w-full object-contain object-bottom" />
				) : (
					layer
				)}
			</div>
			{!PORTRAIT && (
				<span className="absolute left-1/2 top-[42%] -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/50">
					Your photo
				</span>
			)}
		</div>
	);
}

export default function Hero() {
	return (
		<section id="top" className="relative overflow-hidden">
			<div className="relative mx-auto max-w-[1240px] px-5 md:min-h-[680px] md:px-10">
				<div data-reveal className="relative z-10 max-w-[460px] pt-6 md:pt-12">
					<p className="mb-4 text-[10px] tracking-[0.5em] text-ink/30">• • • • • • • •</p>
					<h1 className="text-[clamp(2.1rem,3.7vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.035em]">
						Hi, I'm {profile.short.split(" ")[0]},
						<br />
						a {profile.role}
						<br />
						<span className="text-ink/40">from {profile.location}.</span>
					</h1>
					<p className="mt-5 max-w-[380px] text-[14px] leading-relaxed text-ink/60">
						I design and build fast, accessible web apps end to end, then make sure they keep
						working: automated tests that catch bugs before users do, and data you can
						actually trust.
					</p>

					<p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink/40">What I do</p>
					<ul className="mt-3 flex max-w-[420px] flex-wrap gap-1.5">
						{whatIDo.map((item) => (
							<li
								key={item}
								className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[12px] text-ink/75 ring-1 ring-ink/10 backdrop-blur"
							>
								<span className="h-1.5 w-1.5 rounded-full bg-kinetic" />
								{item}
							</li>
						))}
					</ul>

					<div className="mt-7">
						<PillButton href="#projects">See my work</PillButton>
					</div>
				</div>

				{/* portrait sits behind the copy on desktop, below it on mobile */}
				<div data-reveal="1" className="relative mt-10 md:absolute md:inset-x-0 md:top-0 md:mt-0">
					<Portrait />
				</div>

				{/* floating latest-project card */}
				{latest && (
					<a
						href={`/projects/${encodeURIComponent(latest.id)}`}
						data-reveal="3"
						className="group absolute bottom-[30%] right-5 z-20 w-[160px] md:bottom-auto rounded-[22px] bg-[#141414] p-2 text-white shadow-[0_30px_50px_-20px_rgba(0,0,0,0.6)] md:right-10 md:top-4 md:w-[230px]"
					>
						<div className="aspect-[1.9] overflow-hidden rounded-[14px] bg-white">
							<Thumb project={latest} className="object-top transition-transform duration-500 group-hover:scale-[1.05]" />
						</div>
						<div className="flex items-end justify-between gap-2 px-2 pb-2 pt-3">
							<span>
								<span className="block text-[9px] uppercase tracking-[0.2em] text-white/45">Latest project</span>
								<span className="mt-1 block text-[13px] font-medium leading-tight">{latest.name}</span>
							</span>
							<ArrowDot />
						</div>
					</a>
				)}

				{/* floating latest-yap card */}
				{latestYap && (
					<a
						href={`/yap/${encodeURIComponent(latestYap.id)}`}
						data-reveal="5"
						className="group absolute bottom-[8%] left-5 z-20 flex w-[170px] flex-col rounded-[22px] bg-gradient-to-b from-[#f6f3ee] to-[#e9e3da] p-4 text-ink shadow-[0_30px_50px_-24px_rgba(0,0,0,0.45)] ring-1 ring-white/70 md:bottom-auto md:left-auto md:right-10 md:top-[290px] md:w-[230px]"
					>
						<span className="flex items-center justify-between gap-2">
							<span className="text-[9px] uppercase tracking-[0.2em] text-ink/45">Latest yap</span>
							<span className="flex items-center gap-1 text-[9px] text-kinetic">
								<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-kinetic" />
								New
							</span>
						</span>
						<span className="mt-3 line-clamp-3 text-[13px] font-medium leading-snug tracking-tight">{latestYap.title}</span>
						<span className="mt-4 flex items-end justify-between gap-2">
							<span className="text-[10px] leading-tight text-ink/45">
								Mood: <span className="text-kinetic">{latestYap.mood}</span>
								<br />
								{latestYap.minutes} min yap
							</span>
							<ArrowDot dark />
						</span>
					</a>
				)}
			</div>

			{/* giant word */}
			<p
				aria-hidden
				className="pointer-events-none relative z-10 -mt-[8vw] select-none text-center text-[clamp(7rem,27vw,24rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-white [text-shadow:0_18px_40px_rgba(0,0,0,0.12),0_1px_0_rgba(0,0,0,0.04)] md:-mt-[9vw]"
			>
				build
			</p>
		</section>
	);
}
