import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Project preview image, or a name placeholder when no thumbnail is set yet. */
export function Thumb({ project, className }: { project: { name: string; thumbnail: string }; className?: string }) {
	if (project.thumbnail) {
		return (
			<img
				src={project.thumbnail}
				alt={`${project.name} preview`}
				loading="lazy"
				className={cn("h-full w-full object-cover", className)}
			/>
		);
	}
	return (
		<div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#3a3a3a,#141414_70%)] p-4">
			<span className="text-center text-[clamp(1rem,3vw,1.8rem)] font-semibold tracking-tight text-white/80">
				{project.name}
			</span>
		</div>
	);
}

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
