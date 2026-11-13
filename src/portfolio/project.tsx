import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { clickHandler } from "@/lib/route";
import { ArrowDot, Thumb } from "./shared";
import Sheet from "./Sheet";

const number = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, "0");

/** A project card. A real link to /projects/<id>; pass onOpen to open it in place instead. */
export function ProjectCard({ project, onOpen }: { project: Project; onOpen?: () => void }) {
	return (
		<a
			href={`/projects/${encodeURIComponent(project.id)}`}
			onClick={onOpen ? clickHandler(onOpen) : undefined}
			className="group flex flex-col overflow-hidden rounded-[22px] bg-[#121212] p-2 text-white"
		>
			<div className="relative aspect-[1.9] overflow-hidden rounded-[16px] bg-white">
				<Thumb project={project} className="object-top transition-transform duration-700 group-hover:scale-[1.04]" />
				<span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-medium text-white/80 backdrop-blur">
					{number(project)} / {project.category}
				</span>
			</div>
			<div className="flex items-end justify-between gap-6 px-3 pb-3 pt-5">
				<div>
					<h3 className="text-[19px] font-medium tracking-tight">{project.name}</h3>
					<p className="mt-1 text-[12px] text-white/50">{project.tagline}</p>
				</div>
				<ArrowDot />
			</div>
		</a>
	);
}

/** Slide-in detail panel for one project. */
export function ProjectReader({ project, onClose }: { project: Project | undefined; onClose: () => void }) {
	return (
		<Sheet
			open={!!project}
			onClose={onClose}
			label={project?.name ?? "Project"}
			title={project ? `Project ${number(project)} · ${project.category}` : ""}
			width={560}
		>
			{project && (
				<motion.article
					key={project.id}
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.35 } }}
					className="mt-10"
				>
					<div className="aspect-[1.9] overflow-hidden rounded-[18px] bg-white">
						<Thumb project={project} className="object-top" />
					</div>
					<h3 className="mt-8 text-[clamp(1.8rem,6vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">{project.name}</h3>
					<p className="mt-2 text-[15px] text-kinetic">{project.tagline}</p>
					<p className="mt-6 text-[15px] leading-relaxed text-white/70">{project.description}</p>
					{project.tags.length > 0 && (
						<ul className="mt-6 flex flex-wrap gap-2">
							{project.tags.map((t) => (
								<li key={t} className="rounded-full px-3 py-1.5 text-[11px] text-white/70 ring-1 ring-white/15">
									{t}
								</li>
							))}
						</ul>
					)}
					<a
						href={project.url}
						target="_blank"
						rel="noreferrer"
						className="mt-10 flex w-fit items-center gap-2 rounded-full bg-kinetic py-3 pl-5 pr-4 text-[14px] font-medium transition-colors hover:bg-[#f04f10]"
					>
						Visit live site <ArrowUpRight size={16} />
					</a>
				</motion.article>
			)}
		</Sheet>
	);
}
