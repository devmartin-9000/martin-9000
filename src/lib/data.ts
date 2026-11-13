export const profile = {
	name: "Martin Jack Magonagona",
	short: "Martin Jack",
	role: "Software Engineer",
	location: "Blantyre, Malawi",
	email: "martinmagonagona@gmail.com",
	github: "https://github.com/devmartin-9000",
	linkedin: "https://linkedin.com/in/martin-jack9000",
};

export const navLinks = [
	{ label: "Home", href: "/#top" },
	{ label: "About", href: "/#about" },
	{ label: "Approach", href: "/#approach" },
	{ label: "Skills", href: "/#skills" },
	{ label: "Projects", href: "/projects" },
	{ label: "Yap Zone", href: "/yap" },
	{ label: "Contact", href: "/#contact" },
];

export const socials = [
	{ label: "GitHub", href: profile.github },
	{ label: "LinkedIn", href: profile.linkedin },
	{ label: "Email", href: `mailto:${profile.email}` },
];

/* ------------------------------------------------------------------ */
/* Editable content. Managed from /admin (Sveltia CMS), stored as JSON  */
/* files in src/content and committed to the repo.                     */
/* ------------------------------------------------------------------ */

const fileId = (path: string) => path.split("/").pop()!.replace(/.json$/, "");

export type Category = "Business" | "Fintech" | "Self-hosted" | "Developer" | "Community" | "Gaming";

export type Project = {
	id: string;
	name: string;
	tagline: string;
	category: Category;
	description: string;
	url: string;
	tags: string[];
	/** preview image, e.g. /assets/uploads/my-app.png */
	thumbnail: string;
	/** shown in the Projects section and footer */
	featured: boolean;
	/** lower comes first */
	order: number;
	/* ---- "Read more" details sheet; every part is optional ---- */
	/** e.g. React, TypeScript, Supabase */
	stack: string[];
	/** longer write-up, Markdown from the admin editor */
	brief: string;
	features: string[];
	/** public demo login, e.g. { label: "Email", value: "demo@app.com" } */
	demo: { label: string; value: string }[];
	/** shown under the demo login, e.g. "Data resets every night" */
	demoNote: string;
};

type ProjectFile = Omit<Project, "id" | "stack" | "brief" | "features" | "demo" | "demoNote"> &
	Partial<Pick<Project, "stack" | "brief" | "features" | "demo" | "demoNote">>;

const projectFiles = import.meta.glob<ProjectFile>("/src/content/projects/*.json", {
	eager: true,
	import: "default",
});

export const projects: Project[] = Object.entries(projectFiles)
	.map(([path, p]) => ({
		...p,
		id: fileId(path),
		stack: p.stack ?? [],
		brief: p.brief ?? "",
		features: p.features ?? [],
		demo: p.demo ?? [],
		demoNote: p.demoNote ?? "",
	}))
	.sort((a, b) => a.order - b.order);

export const featured = projects.filter((p) => p.featured);

export type Rant = {
	id: string;
	/** stable rant number, oldest is 1 */
	no: number;
	title: string;
	/** how I felt writing it */
	mood: string;
	/** ISO date, newest first */
	date: string;
	minutes: number;
	excerpt: string;
	/** optional header image */
	cover: string;
	/** Markdown, written in the admin rich-text editor */
	body: string;
};

const yapFiles = import.meta.glob<Omit<Rant, "id" | "no">>("/src/content/yaps/*.json", {
	eager: true,
	import: "default",
});

export const rants: Rant[] = Object.entries(yapFiles)
	.map(([path, r]) => ({ ...r, id: fileId(path) }))
	.sort((a, b) => b.date.localeCompare(a.date))
	.map((r, i, all) => ({ ...r, no: all.length - i }));

type Site = { portrait: string };

const siteFiles = import.meta.glob<Site>("/src/content/site.json", { eager: true, import: "default" });

export const site: Site = Object.values(siteFiles)[0] ?? { portrait: "" };

export type Job = {
	id: string;
	role: string;
	company: string;
	period: string;
	where?: string;
	points: string[];
};

export const jobs: Job[] = [
	{
		id: "aliyoop",
		role: "Software Engineer",
		company: "Aliyoop Limited",
		period: "Mar 2026 – Present",
		points: [
			"Build BigQuery analytics workflows that reconstruct metrics from raw data and reconcile them with reporting dashboards.",
			"Develop a lightweight JavaScript tracking widget capturing e-commerce events (product views, cart, checkout, purchases) with minimal performance impact.",
			"Build Java automation for Salesforce-based enterprise applications; migrated legacy automation to Playwright, stabilising 800+ tests.",
			"Automate data validation, analyse A/B tests, and write the documentation that keeps it all maintainable.",
		],
	},
	{
		id: "vorltec",
		role: "Front-End Developer",
		company: "VORLTEC",
		period: "Jan 2025 – Feb 2026",
		points: [
			"Led front-end development for custom software delivered to clients.",
			"Built and maintained a reusable React component library that standardised UI across client projects.",
			"Wrote .bat and bash developer tooling to remove repetitive work, plus client-facing guides and product documentation.",
		],
	},
	{
		id: "sand",
		role: "Technical Support Engineer",
		company: "Sand Technologies (ALX Africa)",
		period: "Jul 2024 – Dec 2024",
		points: [
			"First point of contact for clients across 6+ countries: troubleshooting and coordinating resolutions.",
			"Supported program managers with the technical side of multi-country events, and refined support documentation.",
		],
	},
	{
		id: "mapeto",
		role: "Assistant Accountant",
		company: "Mapeto Investments",
		period: "Jan 2023 – May 2024",
		points: [
			"Reconciled accounts, verified invoices and receipts, and prepared financial reports.",
			"Built script-based automations that consolidated multi-branch records into one synchronised worksheet.",
		],
	},
	{
		id: "itafrica-admin",
		role: "Admin & Sales Assistant",
		company: "I.T. Africa",
		period: "Nov 2021 – Dec 2022",
		points: [
			"Ran day-to-day administration, quotations and order processing, and trained new sales recruits.",
		],
	},
	{
		id: "itafrica-sales",
		role: "Sales Representative",
		company: "I.T. Africa",
		period: "Nov 2020 – Nov 2021",
		points: [
			"Identified customer needs, recommended products and built lasting customer relationships.",
		],
	},
];
