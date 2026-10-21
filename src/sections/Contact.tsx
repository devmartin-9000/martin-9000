import { useState } from "react";
import { motion } from "motion/react";
import { Briefcase, Globe2, MapPin } from "lucide-react";
import { Frame, Photo, Reveal } from "@/components/ui";
import { profile } from "@/lib/data";
import { viscous } from "@/lib/motion";

export default function Contact() {
	// click the big orange circle to swap the two halves of the call-to-action
	const [flip, setFlip] = useState(false);

	return (
		<>
			<Frame className="bg-white">
				<div className="grid md:grid-cols-2">
					<Reveal layout className={`flex flex-col justify-center gap-8 px-6 py-12 md:px-10 md:py-20 ${flip ? "md:order-2" : ""}`}>
						<div>
							<p data-egg="melt" className="mb-3 w-fit text-[10px] font-medium">Open to opportunities:</p>
							<h2 data-egg="melt" className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight">
								Have a Product to
								<br />
								Ship, Test or
								<br />
								Automate?
							</h2>
						</div>
						<div className="flex gap-3">
							<a href={`mailto:${profile.email}`} data-egg="ink" className="bg-ink px-8 py-3 text-[10px] font-semibold uppercase text-white">
								Email me
							</a>
							<a href={profile.github} target="_blank" rel="noreferrer" data-egg="ink" data-egg-color="#141414" className="border border-ink px-8 py-3 text-[10px] font-semibold uppercase transition-colors hover:text-white">
								View GitHub
							</a>
						</div>
					</Reveal>
					<motion.div layout transition={viscous} className="group flex flex-col bg-[#f7f7f7]">
						<div className="relative min-h-[320px] flex-1 overflow-hidden [background-image:radial-gradient(circle,rgba(20,20,20,0.35)_1px,transparent_1.4px)] [background-size:7px_7px]">
							<div data-egg="blob" onClick={() => setFlip((f) => !f)} role="button" aria-label="Swap the layout" className="absolute left-[10%] top-[10%] aspect-square h-[78%] cursor-pointer rounded-full bg-kinetic transition-transform duration-1000 ease-out group-hover:scale-105" />
							<div className="pointer-events-none absolute left-[3%] top-[4%] aspect-square h-[90%] rounded-full border border-kinetic transition-transform duration-1000 group-hover:rotate-45 group-hover:scale-95" />
							<div data-egg="drip" className="absolute right-[8%] top-[8%] aspect-square h-[16%] cursor-pointer rounded-full bg-ink transition-transform duration-700 group-hover:-translate-y-2" />
							<div data-egg="magnet" className="absolute left-[10%] top-[48%] z-10 h-[26%] w-[24%] cursor-pointer bg-ink transition-transform duration-700 group-hover:translate-x-4 group-hover:-translate-y-2" style={{ clipPath: "polygon(100% 0,0 100%,60% 100%)" }} />
							<div data-egg="blob" data-egg-color="#141414" className="absolute bottom-[8%] right-[10%] h-[26%] w-[24%] cursor-pointer bg-white [background-image:radial-gradient(circle,#141414_1px,transparent_1.4px)] [background-size:7px_7px]" />
						</div>
						<div className="grid grid-cols-3 gap-3 border-t border-ink/10 bg-white px-5 py-4 text-[8px] leading-snug sm:text-[9px]">
							{[
								{ i: Briefcase, a: "Currently", b: "Software Engineer", c: "Aliyoop Limited" },
								{ i: MapPin, a: profile.location, b: "Open to remote work", c: "Anywhere online" },
								{ i: Globe2, a: "Free to talk", b: "Projects & roles", c: "Reply by email" },
							].map((x) => (
								<div key={x.a} className="flex gap-2">
									<span data-egg="spin" className="mt-0.5 shrink-0 cursor-pointer"><x.i size={16} strokeWidth={1.4} /></span>
									<p>
										<span className="block font-semibold">{x.a}</span>
										{x.b}
										<span className="block text-ink/50">{x.c}</span>
									</p>
								</div>
							))}
						</div>
				</motion.div>
					</div>
			</Frame>

			<Frame id="contact" className="bg-white">
				<svg className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 text-ink/25" viewBox="0 0 200 200" aria-hidden>
					<circle cx="100" cy="100" r="99" fill="none" stroke="currentColor" />
				</svg>
				<div className="relative flex items-center justify-between px-6 py-5 text-[9px] font-semibold uppercase md:px-12">
					<span data-egg="melt" className="flex cursor-pointer items-center gap-2 text-xs normal-case">
						<span data-egg="drip" className="h-3 w-3 rounded-full bg-slate" /> MJ
					</span>
					<span className="hidden gap-14 sm:flex">
						<a href="#top">Home</a>
						<a href="#projects">Projects</a>
						<a href="#skills">Skills</a>
						<a href="#about">About</a>
					</span>
					<span />
				</div>

				<div className="relative grid min-h-[480px] md:grid-cols-[1fr_1.05fr]">
					<Reveal className="relative z-10 flex flex-col justify-center px-6 py-10 md:px-12">
						<h2 data-egg="melt" className="text-[clamp(2.3rem,5vw,3.8rem)] font-normal leading-[1.1] tracking-tight">
							Let's build <span className="font-light text-slate">something that grows your business</span>
						</h2>
						<p className="mt-6 max-w-xs text-[10px] leading-relaxed text-ink/60">
							Whether it's a product to build, a test suite to rescue or data
							that needs to add up, I'm just a message away. Tell me what
							you're working on.
						</p>
						<a
							href={`mailto:${profile.email}`}
							data-egg="ink" className="mt-8 w-fit rounded-full bg-ink px-8 py-2 text-[10px] font-bold uppercase text-white"
						>
							Email me
						</a>
						<p data-egg="melt" className="mt-4 w-fit text-[11px] text-ink/60">{profile.email}</p>
					</Reveal>

					<Reveal delay={0.1} className="relative min-h-[360px]">
						<div data-egg="blob" data-egg-color="#ff6122" className="absolute -right-[18%] bottom-[-6%] top-[-6%] aspect-square rounded-full bg-gradient-to-br from-[#ff6122] via-[#ff8a4c] to-[#ffc9a8]" />
						<div className="absolute -left-[4%] bottom-[-14%] right-[24%] top-[40%] rounded-full border border-ink/40" />
						<div className="absolute bottom-0 left-[14%] right-[14%] top-[6%] overflow-hidden rounded-t-[999px] bg-gradient-to-b from-[#0e5a43]/0 to-transparent">
							<Photo />
						</div>
					</Reveal>
				</div>
			</Frame>

			<footer className="w-full rounded-t-[28px] bg-black px-6 py-8 text-xs text-white/85 md:px-12">
				<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
					<p data-egg="melt" className="w-fit cursor-pointer text-sm font-bold text-white">Martin Jack<span className="text-kinetic">.</span></p>
					<p className="flex gap-6">
						<a href={profile.github} target="_blank" rel="noreferrer" data-egg="melt" className="hover:text-white">GitHub</a>
						<a href={profile.linkedin} target="_blank" rel="noreferrer" data-egg="melt" className="hover:text-white">LinkedIn</a>
						<a href={`mailto:${profile.email}`} data-egg="melt" className="hover:text-white">Email</a>
					</p>
					<p>2026 © Martin Jack Magonagona. All rights reserved.</p>
				</div>
			</footer>
		</>
	);
}
