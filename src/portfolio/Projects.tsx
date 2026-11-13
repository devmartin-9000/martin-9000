import { featured, projects } from "@/lib/data";
import { useRouteItem } from "@/lib/route";
import { Eyebrow, PillButton } from "./shared";
import { ProjectCard, ProjectReader } from "./project";

/** Landing-page teaser: the featured projects, with a way into the full Projects page. */
export default function Projects() {
	// "Read more" opens the details sheet right here, with a shareable /projects/<id> address
	const { id, open, close } = useRouteItem("/projects");
	const project = projects.find((p) => p.id === id);

	return (
		<section id="projects" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 pb-20 pt-8 md:px-10 md:pb-28">
			<div data-reveal className="flex flex-wrap items-end justify-between gap-6">
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

			<div className="mt-12 grid grid-cols-2 gap-2.5 sm:gap-4">
				{featured.map((p, i) => (
					<ProjectCard key={p.id} project={p} onOpen={() => open(p.id)} reveal={(i % 2) + 1} />
				))}
			</div>

			<ProjectReader project={project} onClose={close} />
		</section>
	);
}
