import { Github, Linkedin, MapPin, Star } from "lucide-react";
import type { ReactNode } from "react";
import { profile } from "@/lib/data";

function Tile({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="flex aspect-[145/187] flex-col justify-between rounded-[20px] bg-gradient-to-b from-[#202020] to-[#0b0b0b] p-[clamp(14px,3vw,22px)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_24px_-12px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-1"
		>
			<span className="text-white/60">{icon}</span>
			<span className="text-[clamp(13px,2.4vw,17px)] leading-snug text-white/90">{children}</span>
		</a>
	);
}

/** Dot-matrix square standing in for the QR code. */
function DotGrid() {
	return (
		<span className="grid w-[60px] grid-cols-10 gap-[2px]" aria-hidden>
			{Array.from({ length: 100 }, (_, i) => {
				const x = i % 10;
				const y = Math.floor(i / 10);
				const edge = Math.min(x, y, 9 - x, 9 - y);
				return <span key={i} className="aspect-square rounded-full bg-white" style={{ opacity: 0.25 + edge * 0.18 }} />;
			})}
		</span>
	);
}

export default function Contact() {
	return (
		<section id="contact" className="rounded-[28px] bg-[#e6e6e6] px-3 py-20 md:py-28">
			<div className="mx-auto max-w-[535px] rounded-[18px] bg-white px-[clamp(20px,7vw,38px)] pb-9 pt-12 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
				<h2 className="text-[clamp(2rem,6vw,2.6rem)] font-normal leading-[1.08] tracking-[-0.03em]">
					Let's build
					<br />
					something together
				</h2>
				<p className="mt-3 max-w-[370px] text-[15px] leading-snug text-ink/45">
					I'm open to remote roles and freelance projects. Pick the channel that suits you
					best.
				</p>

				<div className="mt-8 grid grid-cols-3 gap-[clamp(8px,2vw,12px)]">
					<Tile href={profile.github} icon={<Github size={26} />}>
						Open
						<br />
						GitHub
					</Tile>
					<Tile href={profile.linkedin} icon={<Linkedin size={26} />}>
						Open
						<br />
						LinkedIn
					</Tile>
					<Tile href={`mailto:${profile.email}`} icon={<DotGrid />}>
						Send
						<br />
						an email
					</Tile>
				</div>

				<ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-ink/45">
					<li className="flex items-center gap-1.5">
						<Star size={13} fill="currentColor" /> 10+ projects shipped
					</li>
					<li className="h-1 w-1 bg-ink/30" aria-hidden />
					<li>6 yrs experience</li>
					<li className="h-1 w-1 bg-ink/30" aria-hidden />
					<li className="flex items-center gap-1.5">
						<MapPin size={13} /> {profile.location}
					</li>
				</ul>
			</div>

			<p className="mt-10 flex items-center justify-center gap-2 text-[12px] text-ink/45">
				© {new Date().getFullYear()} {profile.name}
			</p>
		</section>
	);
}
