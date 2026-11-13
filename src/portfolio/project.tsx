import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { marked } from "marked";
import { ArrowUpRight, Check, Copy, KeyRound } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { clickHandler } from "@/lib/route";
import { Thumb } from "./shared";
import Sheet from "./Sheet";

const number = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, "0");

/** A project card. A real link to /projects/<id>; pass onOpen to open it in place instead. */
export function ProjectCard({ project, onOpen, reveal }: { project: Project; onOpen?: () => void; reveal?: number }) {
	return (
		<a
			href={`/projects/${encodeURIComponent(project.id)}`}
			onClick={onOpen ? clickHandler(onOpen) : undefined}
			aria-label={`${project.name}: read more`}
			data-reveal={reveal}
			className="group flex flex-col overflow-hidden rounded-[18px] bg-[#121212] p-1.5 text-white sm:rounded-[22px] sm:p-2"
		>
			<div className="relative aspect-[1.9] overflow-hidden rounded-[13px] bg-white sm:rounded-[16px]">
				<Thumb project={project} className="object-top transition-transform duration-700 group-hover:scale-[1.04]" />
				<span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[8px] font-medium text-white/80 backdrop-blur sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[9px]">
					{number(project)} / {project.category}
				</span>
			</div>
			<div className="flex flex-1 flex-col justify-between gap-3 px-2 pb-2 pt-3 sm:flex-row sm:items-end sm:gap-6 sm:px-3 sm:pb-3 sm:pt-5">
				<div>
					<h3 className="text-[14px] font-medium leading-tight tracking-tight sm:text-[19px]">{project.name}</h3>
					<p className="mt-1 line-clamp-2 text-[11px] text-white/50 sm:text-[12px]">{project.tagline}</p>
				</div>
				<span className="flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-white py-1 pl-3 pr-1 text-[11px] font-medium text-ink transition-colors group-hover:bg-kinetic group-hover:text-white sm:py-1.5 sm:pl-4 sm:text-[12px]">
					Read more
					<span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] text-white sm:h-6 sm:w-6">→</span>
				</span>
			</div>
		</a>
	);
}

function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className="mt-9">
			<h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">{title}</h4>
			<div className="mt-3">{children}</div>
		</section>
	);
}

/** One demo login field with a copy button. */
function Credential({ label, value }: { label: string; value: string }) {
	const [copied, setCopied] = useState(false);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// clipboard blocked: the value is still visible to select by hand
		}
	};
	return (
		<div className="flex items-center justify-between gap-3 rounded-[14px] bg-white/[0.05] px-4 py-3 ring-1 ring-white/10">
			<div className="min-w-0">
				<p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</p>
				<p className="mt-0.5 truncate font-mono text-[14px] text-white">{value}</p>
			</div>
			<button
				type="button"
				onClick={copy}
				aria-label={`Copy ${label}`}
				className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white hover:text-ink"
			>
				{copied ? <Check size={14} /> : <Copy size={14} />}
			</button>
		</div>
	);
}

/** "Read more" sheet for one project. Slides in from the left, opposite the menu. */
export function ProjectReader({ project, onClose }: { project: Project | undefined; onClose: () => void }) {
	return (
		<Sheet
			open={!!project}
			onClose={onClose}
			label={project?.name ?? "Project"}
			title={project ? `Project ${number(project)} · ${project.category}` : ""}
			width={600}
			side="left"
		>
			{project && (
				<motion.article
					key={project.id}
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.35 } }}
					className="mt-8"
				>
					<div className="aspect-[1.9] overflow-hidden rounded-[18px] bg-white">
						<Thumb project={project} className="object-top" />
					</div>
					<h3 className="mt-8 text-[clamp(1.8rem,6vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">{project.name}</h3>
					<p className="mt-2 text-[15px] text-kinetic">{project.tagline}</p>

					<Section title="The brief">
						{project.brief ? (
							<div
								className="yap-body text-[15px] leading-relaxed text-white/70"
								// written by me in /admin and committed to the repo, so trusted
								dangerouslySetInnerHTML={{ __html: marked.parse(project.brief, { async: false }) }}
							/>
						) : (
							<p className="text-[15px] leading-relaxed text-white/70">
								{project.description || "The full write-up is on its way. Check back soon."}
							</p>
						)}
					</Section>

					{project.stack.length > 0 && (
						<Section title="Tech stack">
							<ul className="flex flex-wrap gap-2">
								{project.stack.map((t) => (
									<li key={t} className="rounded-full bg-white/[0.06] px-3 py-1.5 text-[12px] text-white/85 ring-1 ring-white/10">
										{t}
									</li>
								))}
							</ul>
						</Section>
					)}

					{project.features.length > 0 && (
						<Section title="Features">
							<ul className="grid gap-2.5 sm:grid-cols-2">
								{project.features.map((f) => (
									<li key={f} className="flex gap-2.5 text-[14px] leading-snug text-white/75">
										<Check size={15} className="mt-0.5 shrink-0 text-kinetic" />
										{f}
									</li>
								))}
							</ul>
						</Section>
					)}

					{project.demo.length > 0 && (
						<Section title="Try the demo">
							<div className="space-y-2">
								{project.demo.map((d) => (
									<Credential key={d.label} label={d.label} value={d.value} />
								))}
							</div>
							<p className="mt-3 flex items-center gap-2 text-[12px] text-white/45">
								<KeyRound size={13} />
								{project.demoNote || "Public demo account. Please be kind to it."}
							</p>
						</Section>
					)}

					{project.tags.length > 0 && (
						<ul className="mt-9 flex flex-wrap gap-2">
							{project.tags.map((t) => (
								<li key={t} className="rounded-full px-3 py-1.5 text-[11px] text-white/60 ring-1 ring-white/15">
									#{t}
								</li>
							))}
						</ul>
					)}

					{project.url && (
					<a
						href={project.url}
						target="_blank"
						rel="noreferrer"
						className="mt-10 flex w-fit items-center gap-2 rounded-full bg-kinetic py-3 pl-5 pr-4 text-[14px] font-medium transition-colors hover:bg-[#f04f10]"
					>
						Visit live site <ArrowUpRight size={16} />
					</a>
					)}
				</motion.article>
			)}
		</Sheet>
	);
}
