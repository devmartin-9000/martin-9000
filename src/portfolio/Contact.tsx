import { Github, Linkedin, Mail } from "lucide-react";
import { featured, navLinks, profile, rants } from "@/lib/data";
import { PillButton } from "./shared";

const columns = [
	{
		title: "Explore",
		links: navLinks.filter((l) => l.href !== "#top" && l.href !== "#contact"),
	},
	{
		title: "Projects",
		links: featured.map((p) => ({ label: p.name, href: p.url })),
	},
	// rendered as the big Yap Zone button instead of a link list
	{ title: "Yap Zone", links: [] },
	{
		title: "Connect",
		links: [
			{ label: "Email", href: `mailto:${profile.email}` },
			{ label: "GitHub", href: profile.github },
			{ label: "LinkedIn", href: profile.linkedin },
			{ label: profile.location, href: "#about" },
		],
	},
];

const icons = [
	{ label: "GitHub", href: profile.github, Icon: Github },
	{ label: "LinkedIn", href: profile.linkedin, Icon: Linkedin },
	{ label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
];

const isExternal = (href: string) => href.startsWith("http");

export default function Contact() {
	return (
		<section id="contact" className="mx-auto max-w-[1240px] scroll-mt-20 px-3 pb-3 md:px-6 md:pb-6">
			<div className="relative overflow-hidden rounded-[28px] bg-[#121212] text-white">
				{/* soft rings, like the reference's background */}
				<div
					aria-hidden
					className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-[repeating-radial-gradient(circle,rgba(255,255,255,0.025)_0_1px,transparent_1px_46px)]"
				/>
				<div aria-hidden className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-kinetic/15 blur-3xl" />

				{/* CTA, in place of the reference's newsletter */}
				<div className="relative px-6 pb-14 pt-16 text-center md:pt-20">
					<h2 className="text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
						Let's Build Something <span className="text-kinetic">Great</span> Together
					</h2>
					<p className="mx-auto mt-4 max-w-[480px] text-[14px] leading-relaxed text-white/55">
						Open to remote roles and freelance projects. Tell me what you're building and
						I'll tell you how I can help.
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<PillButton href={`mailto:${profile.email}`} light>
							Email me
						</PillButton>
						<a
							href={profile.linkedin}
							target="_blank"
							rel="noreferrer"
							className="rounded-full px-5 py-2.5 text-[13px] text-white/75 ring-1 ring-white/20 hover:bg-white hover:text-ink"
						>
							Connect on LinkedIn
						</a>
					</div>
					<p className="mt-4 text-[11px] text-white/35">Usually replies within a day. No recruiter spam, promise.</p>
				</div>

				{/* footer */}
				<footer className="relative border-t border-white/[0.07] px-6 pt-12 md:px-12">
					<div className="grid gap-10 lg:grid-cols-[1.3fr_2.7fr]">
						<div>
							<a href="#top" className="flex items-center gap-3">
								<span className="grid h-10 w-10 place-items-center rounded-xl bg-white">
									<img src="./assets/logo-mj.svg" alt="" className="h-8 w-8" />
								</span>
								<span className="leading-tight">
									<span className="block text-[15px] font-semibold">{profile.short}</span>
									<span className="text-[10px] text-white/40">{profile.role}</span>
								</span>
							</a>
							<p className="mt-5 max-w-[280px] text-[12px] leading-relaxed text-white/50">
								Building reliable web apps from {profile.location}. Every bug tells a story;
								I prefer the ones with happy endings.
							</p>
							<div className="mt-5 flex gap-2">
								{icons.map(({ label, href, Icon }) => (
									<a
										key={label}
										href={href}
										aria-label={label}
										target="_blank"
										rel="noreferrer"
										className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.06] text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white hover:text-ink"
									>
										<Icon size={15} />
									</a>
								))}
							</div>
						</div>

						<div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
							{columns.map((c) =>
								c.title === "Yap Zone" ? (
									<a
										key={c.title}
										href="#yap"
										className="group relative flex aspect-square w-full flex-col justify-between self-start overflow-hidden rounded-[20px] bg-gradient-to-br from-kinetic to-[#c2410c] p-4 text-white shadow-[0_18px_36px_-16px_rgba(255,97,34,0.8)] transition-transform hover:-translate-y-1"
									>
										<span
											aria-hidden
											className="absolute -bottom-5 -right-1 select-none text-[64px] font-semibold leading-none tracking-[-0.06em] text-white/15"
										>
											yap
										</span>
										<span className="relative text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">
											{rants.length} rants &amp; counting
										</span>
										<span className="relative flex items-end justify-between gap-2">
											<span className="text-[22px] font-semibold leading-none tracking-[-0.03em]">
												Yap
												<br />
												Zone
											</span>
											<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-kinetic transition-transform group-hover:translate-x-0.5">
												→
											</span>
										</span>
									</a>
								) : (
								<div key={c.title}>
									<h3 className="text-[12px] font-semibold">{c.title}</h3>
									<ul className="mt-4 space-y-2.5">
										{c.links.map((l) => (
											<li key={l.label}>
												<a
													href={l.href}
													{...(isExternal(l.href) ? { target: "_blank", rel: "noreferrer" } : {})}
													className="line-clamp-1 text-[12px] text-white/50 transition-colors hover:text-kinetic"
												>
													{l.label}
												</a>
											</li>
										))}
									</ul>
								</div>
								)
							)}
						</div>
					</div>

					<div className="mt-12 flex flex-col gap-3 border-t border-white/[0.07] py-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
						<p>
							© {new Date().getFullYear()} {profile.name}
						</p>
						<div className="flex gap-5">
							<span>Built with React &amp; Tailwind</span>
							<a href="#top" className="hover:text-white">
								Back to top ↑
							</a>
						</div>
					</div>
				</footer>
			</div>
		</section>
	);
}
