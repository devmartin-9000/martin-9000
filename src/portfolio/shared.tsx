import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Orange dot + dashed rule + caps label, the reference's section eyebrow. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<p className={cn("flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink/40", className)}>
			<span className="h-1.5 w-1.5 rounded-full bg-kinetic" />
			<span className="w-8 border-t border-dashed border-ink/30" />
			{children}
		</p>
	);
}

/** Small round arrow button used on every card. */
export function ArrowDot({ dark, className }: { dark?: boolean; className?: string }) {
	return (
		<span
			className={cn(
				"grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform group-hover:translate-x-0.5",
				dark ? "bg-ink text-white" : "bg-white text-ink",
				className
			)}
		>
			<ArrowRight size={14} />
		</span>
	);
}

/** Black pill with the arrow tucked into a white circle at the end. */
export function PillButton({
	href,
	children,
	light,
	external,
}: {
	href: string;
	children: ReactNode;
	light?: boolean;
	external?: boolean;
}) {
	return (
		<a
			href={href}
			{...(external ? { target: "_blank", rel: "noreferrer" } : {})}
			className={cn(
				"group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-[13px] font-medium transition-colors",
				light ? "bg-white text-ink ring-1 ring-black/10 hover:bg-ink hover:text-white" : "bg-ink text-white hover:bg-black"
			)}
		>
			{children}
			<ArrowDot dark={light} className={light ? "group-hover:bg-white group-hover:text-ink" : ""} />
		</a>
	);
}
