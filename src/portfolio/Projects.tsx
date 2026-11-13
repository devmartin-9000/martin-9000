import { featured, projects } from "@/lib/data";
import { Eyebrow, PillButton } from "./shared";
import { ProjectCard } from "./project";

/** Landing-page teaser: the featured projects, with a way into the full Projects page. */
export default function Projects() {
	return (
		<section id="projects" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 pb-20 pt-8 md:px-10 md:pb-28">
			<div className="flex flex-wrap items-end justify-between gap-6">
				<div>
					<Eyebrow>Selected work</Eyebrow>
					<h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.03em]">
						Products I've <span className="text-kinetic">Built</span>
						<br />
						and Shipped.
					</h2>
				</div>
				<PillButton href="/projects">See all {projects.length} projects</PillButton>
			</div>

			<div className="mt-12 grid gap-4 md:grid-cols-2">
				{featured.map((p) => (
					<ProjectCard key={p.id} project={p} />
				))}
			</div>
		</section>
	);
}
