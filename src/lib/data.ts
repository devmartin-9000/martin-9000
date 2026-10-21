export const profile = {
	name: "Martin Jack Magonagona",
	short: "Martin Jack",
	role: "Software Engineer",
	location: "Blantyre, Malawi",
	email: "martinmagonagona@gmail.com",
	github: "https://github.com/devmartin-9000",
	linkedin: "https://linkedin.com/in/martin-jack9000",
	photo: "./assets/Thumbnail-3.jpg",
};

export type Category =
	| "Business"
	| "Fintech"
	| "Self-hosted"
	| "Developer"
	| "Community"
	| "Gaming";

export type Project = {
	id: string;
	name: string;
	tagline: string;
	category: Category;
	description: string;
	url: string;
	/** two-stop gradient used as the project's artwork */
	accent: [string, string];
	tags: string[];
};

export const projects: Project[] = [
	{
		id: "vetta",
		name: "Vetta Shop",
		tagline: "A point-of-sale for small businesses in Malawi",
		category: "Business",
		description:
			"A point-of-sale system designed for small businesses in Malawi, built around how local shops actually sell.",
		url: "https://vettashop.vercel.app",
		accent: ["#ff5f6d", "#8e1b2c"],
		tags: ["POS", "Retail", "Malawi"],
	},
	{
		id: "fintriqs",
		name: "Fintriqs",
		tagline: "Smart invoicing for businesses, freelancers & creators",
		category: "Fintech",
		description:
			"An invoicing platform that generates styled invoices without re-typing client, product and payment details every time. I owned the front-end: landing page, dashboards and layouts.",
		url: "https://fintriqs.vercel.app",
		accent: ["#ffb347", "#d9480f"],
		tags: ["Invoicing", "Dashboard", "Freelancers"],
	},
	{
		id: "happy-life",
		name: "Happy Life Store",
		tagline: "Self-hosted mini e-commerce for businesses",
		category: "Self-hosted",
		description:
			"A self-contained mini e-commerce platform meant to be deployed on a business's own website. Payment integration is built in, and an admin dashboard manages sales.",
		url: "https://happy-life-store.vercel.app",
		accent: ["#34d399", "#065f46"],
		tags: ["E-commerce", "Payments", "Admin dashboard"],
	},
	{
		id: "question-draft",
		name: "QuestionDraft",
		tagline: "Turn past exams into brand-new ones",
		category: "Self-hosted",
		description:
			"Ingests past exam papers, captures their questions, then generates new exams from them. A configurator lets users decide the generation criteria. Built to be self-hosted.",
		url: "https://question-draft.vercel.app",
		accent: ["#60a5fa", "#1e3a8a"],
		tags: ["Exam generation", "Configurator", "Education"],
	},
	{
		id: "simple-social",
		name: "Simple Social",
		tagline: "Post once, publish everywhere",
		category: "Business",
		description:
			"A SaaS for content creators. Link every social platform, post a video in one place, and it publishes to all of them, with no logging in to each platform separately.",
		url: "https://simple-social.vercel.app",
		accent: ["#c084fc", "#581c87"],
		tags: ["SaaS", "Creators", "Publishing"],
	},
	{
		id: "fidim",
		name: "Fidim Legal",
		tagline: "A deterministic legal OS for Malawian companies",
		category: "Business",
		description:
			"One place for companies to manage legal compliance paperwork, track licences, and follow guided, educational workflows for setting up new companies. A commercial lawyer in software form.",
		url: "https://fidim-legal.vercel.app",
		accent: ["#2dd4bf", "#134e4a"],
		tags: ["Legal-tech", "Compliance", "Workflows"],
	},
	{
		id: "react-ddicted",
		name: "React-ddicted",
		tagline: "A React component library",
		category: "Developer",
		description:
			"A library of ready-made React components and UI elements that drop into any React-based project.",
		url: "https://react-ddicted.vercel.app",
		accent: ["#38bdf8", "#0c4a6e"],
		tags: ["React", "Components", "UI kit"],
	},
	{
		id: "ineedsaving",
		name: "I Need Saving",
		tagline: "Make your money actually last",
		category: "Fintech",
		description:
			"Deposit a lump sum, set a fixed rule, and the app releases it in smaller, consistent chunks over a period you choose. Built to end impulse spending.",
		url: "https://ineedsaving.vercel.app",
		accent: ["#fbbf24", "#92400e"],
		tags: ["Budgeting", "Savings", "Money management"],
	},
	{
		id: "kashcraze",
		name: "KashCraze",
		tagline: "Real-money multiplayer board games",
		category: "Gaming",
		description:
			"Players stake real money to challenge each other at simple board games, and the winner takes the whole prize pool. Tournaments with larger pools are coming soon.",
		url: "https://kashcraze.me",
		accent: ["#f472b6", "#831843"],
		tags: ["Multiplayer", "Prize pools", "Tournaments soon"],
	},
	{
		id: "techpool",
		name: "Paground TechPool",
		tagline: "Where Malawian tech talent is found",
		category: "Community",
		description:
			"The first Malawi-specific tech space. Companies post tech jobs, developers find roles, events, startups and articles, and register to stay up to date with the local scene.",
		url: "https://paground-techpool.vercel.app",
		accent: ["#4ade80", "#14532d"],
		tags: ["Jobs", "Talent", "Events"],
	},
	{
		id: "shiporlose",
		name: "ShipOrLose",
		tagline: "Stake money. Ship code. Win it back.",
		category: "Developer",
		description:
			"An accountability tool for developers who struggle to ship. Stake an amount against your goals, connect GitHub, GitLab, Bitbucket or any source control, and real code changes (not just commit counts) decide whether you win it back.",
		url: "https://shiporlose.vercel.app",
		accent: ["#fb923c", "#7c2d12"],
		tags: ["Accountability", "Git integration", "Staking"],
	},
];

export const byId = (id: string) => projects.find((p) => p.id === id)!;

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
