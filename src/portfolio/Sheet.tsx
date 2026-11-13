import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Right-hand slide-in panel. A translucent ghost leads and the dark sheet follows;
 * on close the order reverses. Used by the nav menu and the Yap Zone reader.
 */
export default function Sheet({
	open,
	onClose,
	label,
	title,
	width = 440,
	children,
}: {
	open: boolean;
	onClose: () => void;
	/** accessible name for the dialog */
	label: string;
	/** small caps heading next to the close button */
	title: ReactNode;
	width?: number;
	children: ReactNode;
}) {
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [open, onClose]);

	return (
		<AnimatePresence>
			{open && (
				<div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={label}>
					<motion.button
						aria-label="Close"
						onClick={onClose}
						className="absolute inset-0 bg-black/25"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.15 } }}
					/>

					{/* ghost */}
					<motion.div
						aria-hidden
						className="absolute inset-y-0 right-0 max-w-full border-l border-white/40 bg-white/35 backdrop-blur-xl"
						style={{ width: width + 36 }}
						initial={{ x: "100%" }}
						animate={{ x: 0, transition: { duration: 0.55, ease } }}
						exit={{ x: "100%", transition: { duration: 0.45, ease, delay: 0.12 } }}
					/>

					{/* sheet */}
					<motion.div
						className="absolute inset-y-0 right-0 flex max-w-full flex-col overflow-y-auto bg-[#121212] px-7 pb-8 pt-6 text-white sm:rounded-l-[28px]"
						style={{ width }}
						initial={{ x: "100%" }}
						animate={{ x: 0, transition: { duration: 0.6, ease, delay: 0.14 } }}
						exit={{ x: "100%", transition: { duration: 0.4, ease } }}
					>
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">{title}</span>
							<button
								onClick={onClose}
								aria-label="Close"
								className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white hover:text-ink"
							>
								<X size={16} />
							</button>
						</div>
						{children}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
