import { profile } from "@/lib/data";
import { Eyebrow, PillButton } from "./shared";

export default function Contact() {
	return (
		<section id="contact" className="mx-auto max-w-[1240px] px-3 pb-3 md:px-6 md:pb-6">
			<div className="relative overflow-hidden rounded-[28px] bg-[#121212] px-6 pt-16 text-white md:px-14 md:pt-20">
				<div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-kinetic/30 blur-3xl" aria-hidden />
				<div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
					<div>
						<Eyebrow className="text-white/40 [&>span:nth-child(2)]:border-white/30">Contact</Eyebrow>
						<h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.03em]">
							Let's Build Something
							<br />
							<span className="text-kinetic">Great</span> Together.
						</h2>
					</div>
					<div>
						<p className="max-w-[300px] text-[13px] leading-relaxed text-white/50">
							Open to remote roles and freelance projects. Based in {profile.location}.
						</p>
						<div className="mt-6 flex flex-wrap gap-3">
							<PillButton href={`mailto:${profile.email}`} light>
								Email me
							</PillButton>
							<a href={profile.github} target="_blank" rel="noreferrer" className="rounded-full px-4 py-2.5 text-[13px] text-white/70 ring-1 ring-white/20 hover:text-white">
								GitHub
							</a>
							<a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-full px-4 py-2.5 text-[13px] text-white/70 ring-1 ring-white/20 hover:text-white">
								LinkedIn
							</a>
						</div>
					</div>
				</div>

				<p
					aria-hidden
					className="relative mt-14 select-none text-center text-[clamp(5rem,22vw,19rem)] font-semibold leading-[0.78] tracking-[-0.06em] text-white/[0.06]"
				>
					hello
				</p>
				<p className="relative flex justify-between border-t border-white/10 py-5 text-[11px] text-white/40">
					<span>© {new Date().getFullYear()} {profile.name}</span>
					<a href="#top" className="hover:text-white">Back to top ↑</a>
				</p>
			</div>
		</section>
	);
}
