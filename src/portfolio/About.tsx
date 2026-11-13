import { jobs } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./shared";

/** What each role added to how I build software, keyed by job id. */
const lessons: Record<string, string> = {
	"itafrica-sales": "Listening first: finding out what a customer actually needs before recommending anything.",
	"itafrica-admin": "Processes and people: quotations, order flows and training new sales recruits.",
	mapeto: "Accuracy with numbers, and my first scripts automating multi-branch reconciliation.",
	sand: "Calm troubleshooting for clients across 6+ countries, and documentation that helps.",
	vorltec: "Leading client front-ends and building a shared React component library.",
	aliyoop: "BigQuery analytics, an e-commerce tracking widget and 800+ stabilised Playwright tests.",
};

// oldest first, so the story reads from sales to engineering
const journey = [...jobs].reverse().map((j) => ({
	...j,
	year: j.period.match(/\d{4}/)?.[0] ?? "",
	lesson: lessons[j.id],
}));

const facts = [
	{ value: "6 yrs", label: "Professional experience" },
	{ value: "20+", label: "Projects shipped" },
	{ value: "6+", label: "Countries supported" },
];

export default function About() {
	return (
		<section id="about" className="scroll-mt-20 bg-[#f6f5f3]">
			<div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
				<div data-reveal className="lg:sticky lg:top-28 lg:self-start">
					<Eyebrow>About me</Eyebrow>
					<h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.03em]">
						From the Sales Floor
						<br />
						to <span className="text-kinetic">Software</span> Engineering.
					</h2>
					<div className="mt-6 max-w-[440px] space-y-4 text-[14px] leading-relaxed text-ink/60">
						<p>
							I didn't start in code. I started in sales, listening to customers and learning
							what makes people trust a product. Admin, accounting and technical support
							followed, and in every role I found myself automating the repetitive parts.
						</p>
						<p>
							That habit became a career. Today I build React interfaces, test automation and
							data workflows, and I still bring the customer's point of view into every
							decision.
						</p>
					</div>
					<dl className="mt-10 grid max-w-[440px] grid-cols-3 gap-3">
						{facts.map((f) => (
							<div key={f.label} className="rounded-[18px] bg-white p-4">
								<dt className="text-[clamp(1.4rem,3vw,1.9rem)] font-medium tracking-tight">{f.value}</dt>
								<dd className="mt-1 text-[10px] leading-snug text-ink/50">{f.label}</dd>
							</div>
						))}
					</dl>
				</div>

				<ol className="relative">
					<span className="absolute bottom-6 left-[19px] top-6 w-px bg-ink/10" aria-hidden />
					{journey.map((j, i) => {
						const now = i === journey.length - 1;
						return (
							<li key={j.id} data-reveal={i + 1} className="relative flex gap-5 pb-4 last:pb-0">
								<span
									className={cn(
										"relative z-10 mt-5 grid h-10 w-10 shrink-0 place-items-center rounded-full text-[10px] font-semibold",
										now ? "bg-kinetic text-white" : "bg-white text-ink/50 ring-1 ring-ink/10"
									)}
								>
									’{j.year.slice(2)}
								</span>
								<div className={cn("flex-1 rounded-[20px] p-5", now ? "bg-[#121212] text-white" : "bg-white")}>
									<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
										<h3 className="text-[16px] font-medium tracking-tight">{j.role}</h3>
										<span className={cn("text-[11px]", now ? "text-white/45" : "text-ink/40")}>{j.period}</span>
									</div>
									<p className={cn("text-[12px]", now ? "text-kinetic" : "text-ink/50")}>{j.company}</p>
									<p className={cn("mt-3 text-[13px] leading-relaxed", now ? "text-white/70" : "text-ink/65")}>
										{j.lesson}
									</p>
								</div>
							</li>
						);
					})}
				</ol>
			</div>
		</section>
	);
}
