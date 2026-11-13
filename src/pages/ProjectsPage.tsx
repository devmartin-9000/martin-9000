import { useEffect, useState } from "react";
import { profile, projects } from "@/lib/data";
import { useRouteItem } from "@/lib/route";
import Nav from "@/portfolio/Nav";
import Contact from "@/portfolio/Contact";
import { Chips, PageIntro, PillButton } from "@/portfolio/shared";
import { ProjectCard, ProjectReader } from "@/portfolio/project";

const categories = [...new Set(projects.map((p) => p.category))];

/** /projects: every project, filterable by category. /projects/<id> opens that project's details. */
export default function ProjectsPage() {
	const { id, open, close } = useRouteItem("/projects");
	const [category, setCategory] = useState<string | null>(null);
	const project = projects.find((p) => p.id === id);

	useEffect(() => {
		document.title = project ? `${project.name} · Projects` : "Projects · Martin Jack";
	}, [project]);

	const shown = category ? projects.filter((p) => p.category === category) : projects;

	return (
		<div className="bg-white">
			<Nav />
			<PageIntro
				eyebrow="All projects"
				title={
					<>
						Everything I've <span className="text-kinetic">Built</span> and Shipped.
					</>
				}
				intro="Point of sale, fintech, self-hosted tools, developer utilities and community platforms, from first sketch to live product."
				stats={`${projects.length} projects · ${categories.length} categories`}
			>
				<Chips label="Filter by category" options={categories} value={category} onChange={setCategory} />
			</PageIntro>

			<main className="mx-auto max-w-[1240px] px-5 py-12 md:px-10 md:py-16">
				<div className="grid grid-cols-2 gap-2.5 sm:gap-4">
					{shown.map((p, i) => (
						<ProjectCard key={p.id} project={p} onOpen={() => open(p.id)} reveal={(i % 2) + 1} />
					))}
				</div>
				<div className="mt-12 flex justify-center">
					<PillButton href={profile.github} light external>
						More on GitHub
					</PillButton>
				</div>
			</main>

			<Contact />
			<ProjectReader project={project} onClose={close} />
		</div>
	);
}
