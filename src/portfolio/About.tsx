import { Image as ImageIcon, Mail, Play } from "lucide-react";
import { profile } from "@/lib/data";

const socials = [
	{ label: "GitHub", href: profile.github },
	{ label: "LinkedIn", href: profile.linkedin },
	{ label: "Email", href: `mailto:${profile.email}` },
];

export default function About() {
	return (
		<section
			id="about"
			className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-white to-[#f1f1f1] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)]"
		>
			{/* faint column grid */}
			<div className="pointer-events-none absolute inset-0 grid grid-cols-6" aria-hidden>
				{Array.from({ length: 6 }, (_, i) => (
					<div key={i} className="border-l border-black/[0.035] first:border-l-0" />
				))}
			</div>

			<div className="relative px-6 pb-8 pt-7 md:px-14">
				<header className="flex items-center justify-between">
					<a href="#work" aria-label="Jump to work" className="flex flex-col gap-[5px] py-2">
						<span className="block h-[2px] w-5 bg-ink" />
						<span className="block h-[2px] w-3 bg-ink" />
					</a>
					<p className="text-[17px] tracking-tight">
						Martin<span className="font-bold">Jack</span>
					</p>
					<a href={`mailto:${profile.email}`} aria-label="Email me" className="p-1 hover:text-ink/60">
						<Mail size={16} />
					</a>
				</header>

				<div className="grid items-center gap-12 pt-14 md:grid-cols-[1.35fr_1fr] md:pt-20">
					<div>
						<h2 className="max-w-[560px] text-[clamp(2.2rem,4.6vw,3.6rem)] font-bold leading-[1.12] tracking-[-0.02em] text-[#222]">
							everything is built but few things are built well.
						</h2>

						<div className="mt-14 grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-16">
							<a href="#work" className="group flex items-center gap-8 self-start">
								<span className="text-[13px] font-medium">See How</span>
								<span className="grid h-14 w-14 place-items-center bg-black text-white transition-transform group-hover:scale-105">
									<Play size={14} fill="currentColor" />
								</span>
							</a>
							<p className="max-w-[260px] text-[12px] leading-[2] text-ink/60">
								Six years across sales, accounting, support and engineering taught me
								to build for the people using it. Today I ship React interfaces,
								Playwright test suites and data workflows you can trust.
							</p>
						</div>
					</div>

					<div className="relative mx-auto flex w-full max-w-[340px] items-center gap-6 md:justify-self-end">
						<figure className="relative w-full">
							{/* placeholder: swap for <img src="./assets/your-photo.jpg" className="h-full w-full object-cover" /> */}
							<div className="grid aspect-[4/5] place-items-center rounded-[28px] bg-gradient-to-b from-[#ececec] to-[#dcdcdc] text-ink/35">
								<span className="flex flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em]">
									<ImageIcon size={28} strokeWidth={1.5} />
									Photo
								</span>
							</div>
							<div className="mx-auto -mt-2 h-4 w-3/4 rounded-[50%] bg-black/25 blur-md" aria-hidden />
						</figure>

						{/* section index, like the 01 / 03 slider marker */}
						<div className="hidden flex-col items-center gap-2 text-[10px] text-ink/60 sm:flex">
							<span>02</span>
							<span className="relative h-24 w-px bg-black/15">
								<span className="absolute inset-x-0 top-0 h-1/3 bg-ink" />
							</span>
							<span>04</span>
						</div>
					</div>
				</div>

				<nav className="mt-12 flex justify-end gap-6 text-[11px] font-medium md:mr-[8%]">
					{socials.map((s) => (
						<a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-ink/50">
							{s.label}
						</a>
					))}
				</nav>
			</div>
		</section>
	);
}
