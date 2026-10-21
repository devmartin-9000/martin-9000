import { useState } from "react";
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

	return (
		<header className="fixed inset-x-0 top-3 z-50 px-3">
			<nav className="mx-auto flex max-w-[1180px] items-center justify-between rounded-xl bg-white/90 px-4 py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 backdrop-blur">
				<a href="#top" className="flex items-center gap-2 text-sm font-semibold">
					<svg viewBox="0 0 24 24" className="h-6 w-6 text-kinetic" fill="currentColor" aria-hidden>
						<path d="M12 1c.6 5.6 5.4 10.4 11 11-5.6.6-10.4 5.4-11 11-.6-5.6-5.4-10.4-11-11C6.6 11.4 11.4 6.6 12 1Z" />
					</svg>
					Martin Jack
				</a>
				<ul className="hidden items-center gap-8 text-xs font-medium md:flex">
					{links.map(([label, href]) => (
						<li key={href}>
							<a href={href} className="transition-colors hover:text-kinetic">
								{label}
							</a>
						</li>
					))}
				</ul>
				<button
					className="md:hidden"
					onClick={() => setOpen((o) => !o)}
					aria-label={open ? "Close menu" : "Open menu"}
				>
					{open ? <X size={20} /> : <Menu size={20} />}
				</button>
			</nav>
			{open && (
				<ul className="mx-auto mt-2 max-w-[1180px] rounded-xl bg-white p-3 text-sm font-medium shadow-xl ring-1 ring-black/5 md:hidden">
					{links.map(([label, href]) => (
						<li key={href}>
							<a
								href={href}
								onClick={() => setOpen(false)}
								className="block rounded-lg px-3 py-2.5 hover:bg-bone"
							>
								{label}
							</a>
						</li>
					))}
				</ul>
			)}
		</header>
	);
}
