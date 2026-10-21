import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
	children,
	className,
	delay = 0,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
}) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 28 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
}

/** The rounded "device" card every section sits in, like the reference frames. */
export function Frame({
	id,
	children,
	className,
}: {
	id?: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<section
			id={id}
			className={cn(
				"relative mx-auto w-full max-w-[1240px] scroll-mt-24 overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]",
				className
			)}
		>
			{children}
		</section>
	);
}

export function ArrowUpRight({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden
		>
			<path d="M7 17 17 7M8 7h9v9" />
		</svg>
	);
}

export function Photo({
	className,
	position = "50% 50%",
	scale = 1.5,
}: {
	className?: string;
	position?: string;
	scale?: number;
}) {
	return (
		<img
			src="./assets/Thumbnail-3.jpg"
			alt="Martin Jack"
			loading="lazy"
			className={cn("h-full w-full object-cover", className)}
			style={{ objectPosition: position, transform: `scale(${scale})`, transformOrigin: "15% 35%" }}
		/>
	);
}
