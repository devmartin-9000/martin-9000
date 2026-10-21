import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
	["About", "#about"],
	["Projects", "#projects"],
	["Experience", "#experience"],
	["Skills", "#skills"],
	["Contact", "#contact"],
] as const;

export default function Nav() {
	const [open, setOpen] = useState(false);

	// Lock page scroll while the menu is open, close on Escape or when the
	// viewport grows past the mobile breakpoint.
	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		const mq = window.matchMedia("(min-width: 768px)");
		const onMq = () => mq.matches && setOpen(false);
		window.addEventListener("keydown", onKey);
		mq.addEventListener("change", onMq);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
			mq.removeEventListener("change", onMq);
		};
	}, [open]);

	return (
		<>
			{/* Blurs and disables everything behind the menu */}
			<AnimatePresence>
				{open && (
					<motion.div
						key="backdrop"
						className="fixed inset-0 z-40 bg-white/30 backdrop-blur-md md:hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						onClick={() => setOpen(false)}
						aria-hidden
					/>
				)}
			</AnimatePresence>

			<header className="fixed inset-x-0 top-3 z-50 px-3">
				<nav className="relative mx-auto flex max-w-none items-center justify-between rounded-xl bg-white/90 px-4 py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 backdrop-blur">
					<a href="#top" data-egg="melt" className="flex items-center gap-2 text-sm font-semibold" onClick={() => setOpen(false)}>
						<img src="./assets/logo-mj.svg" alt="" className="h-7 w-7" />
						Martin Jack
					</a>
					<ul className="hidden items-center gap-8 text-xs font-medium md:flex">
						{links.map(([label, href]) => (
							<li key={href}>
								{label === "Contact" ? (
									<a
										href={href}
										data-egg="ink"
										data-egg-color="#141414"
										className="group flex items-center gap-2 rounded-lg bg-gradient-to-br from-kinetic to-[#ff8a4c] py-1.5 pl-4 pr-1.5 font-semibold text-white shadow-[0_8px_16px_-8px_rgba(255,97,34,0.8)] transition-transform hover:-translate-y-0.5"
									>
										Contact
										<span data-egg="magnet" className="grid h-5 w-5 place-items-center rounded-md bg-white/25">→</span>
									</a>
								) : (
									<a href={href} data-egg="melt" className="transition-colors hover:text-kinetic">
										{label}
									</a>
								)}
							</li>
						))}
					</ul>
					<button
						data-egg="blob"
						className="grid h-8 w-8 place-items-center md:hidden"
						onClick={() => setOpen((o) => !o)}
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						aria-controls="mobile-menu"
					>
						{open ? <X size={20} /> : <Menu size={20} />}
					</button>
				</nav>

				{/* Same width as the bar; only the height animates, sliding down from the top */}
				<AnimatePresence>
					{open && (
						<motion.div
							key="panel"
							id="mobile-menu"
							className="mx-auto mt-2 max-w-none overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5 md:hidden"
							initial={{ height: 0 }}
							animate={{ height: "calc(100dvh - 5.75rem)" }}
							exit={{ height: 0 }}
							transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
						>
							<ul className="flex h-full flex-col justify-center gap-1 px-6">
								{links.map(([label, href], i) => (
									<motion.li
										key={href}
										initial={{ opacity: 0, y: -16 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -16 }}
										transition={{ delay: 0.12 + i * 0.06, duration: 0.35 }}
									>
										<a
											href={href}
											onClick={() => setOpen(false)}
											className={`flex items-baseline justify-between border-b border-ink/10 py-4 text-3xl font-semibold tracking-tight transition-colors hover:text-kinetic ${label === "Contact" ? "text-kinetic" : ""}`}
										>
											{label}
											<span className="text-xs font-medium text-ink/40">0{i + 1}</span>
										</a>
									</motion.li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</header>
		</>
	);
}
