import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { navLinks, profile, socials } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PillButton } from "./shared";
import Sheet from "./Sheet";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const close = useCallback(() => setOpen(false), []);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<>
			<header
				className={cn(
					"sticky top-0 z-50 transition-[background-color,box-shadow] duration-300",
					scrolled ? "bg-white/80 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-lg" : "bg-white"
				)}
			>
				<nav className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-4 md:px-10">
					<a href="/#top" className="flex items-center gap-2.5">
						<span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white ring-1 ring-ink/10">
							<img src="/assets/logo-mj.svg" alt="" className="h-7 w-7" />
						</span>
						<span className="leading-none">
							<span className="block text-[15px] font-semibold tracking-tight">{profile.short}</span>
							<span className="text-[8px] font-medium uppercase tracking-[0.25em] text-ink/45">{profile.role}</span>
						</span>
					</a>
					<div className="flex items-center gap-2">
						<span className="hidden sm:block">
							<PillButton href="#contact" light>
								Get in touch
							</PillButton>
						</span>
						<button
							onClick={() => setOpen(true)}
							aria-label="Open menu"
							aria-expanded={open}
							className="group grid h-11 w-11 place-items-center rounded-full bg-ink text-white"
						>
							<span className="flex flex-col items-end gap-[5px]">
								<span className="block h-[1.5px] w-4 bg-white" />
								<span className="block h-[1.5px] w-2.5 bg-white transition-all group-hover:w-4" />
							</span>
						</button>
					</div>
				</nav>
			</header>

			<Sheet open={open} onClose={close} label="Site menu" title="Menu">
				<ul className="mt-10 space-y-0.5">
					{navLinks.map((l, i) => (
						<motion.li
							key={l.href}
							initial={{ opacity: 0, x: 40 }}
							animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease, delay: 0.3 + i * 0.05 } }}
						>
							<a
								href={l.href}
								onClick={close}
								className="group flex items-baseline gap-4 py-1.5 text-[clamp(1.9rem,8vw,2.4rem)] font-medium tracking-[-0.03em] transition-colors hover:text-kinetic"
							>
								<span className="w-6 text-[11px] font-normal tracking-normal text-white/30">
									{String(i + 1).padStart(2, "0")}
								</span>
								{l.label}
							</a>
						</motion.li>
					))}
				</ul>

				<div className="mt-auto pt-12">
					<p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">Say hello</p>
					<a href={`mailto:${profile.email}`} className="mt-3 block text-[15px] hover:text-kinetic">
						{profile.email}
					</a>
					<div className="mt-6 flex flex-wrap gap-2">
						{socials.map((s) => (
							<a
								key={s.label}
								href={s.href}
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] text-white/70 ring-1 ring-white/15 hover:bg-white hover:text-ink"
							>
								{s.label} <ArrowUpRight size={12} />
							</a>
						))}
					</div>
				</div>
			</Sheet>
		</>
	);
}
