import { BarChart3, FlaskConical, LayoutTemplate, type LucideIcon } from "lucide-react";
import { Frame, Reveal } from "@/components/ui";

const items: { title: string; body: string; icon: LucideIcon; tone: string }[] = [
	{ title: "Full-stack engineering", body: "React and TypeScript front-ends, Node, Java and Python back-ends", icon: LayoutTemplate, tone: "#c026d3" },
	{ title: "Test automation", body: "Playwright, Java and Salesforce-based enterprise apps", icon: FlaskConical, tone: "#ff6122" },
	{ title: "Data & analytics", body: "BigQuery workflows, SQL and A/B test reporting", icon: BarChart3, tone: "#0891b2" },
];

/** Three-up feature strip: icon circle + title + subtitle, on a soft rounded bar */
export default function Strip() {
	return (
		<Frame className="bg-[#f3f3f1]">
			<div className="grid gap-5 px-6 py-5 md:grid-cols-3 md:px-12">
				{items.map((it, i) => (
					<Reveal key={it.title} delay={i * 0.06}>
						<div className="flex items-center gap-4">
							<span
								className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white shadow-md"
								style={{ color: it.tone }}
							>
								<it.icon size={20} />
							</span>
							<p>
								<span className="block text-sm font-bold">{it.title}</span>
								<span className="block text-[11px] leading-snug text-ink/55">{it.body}</span>
							</p>
						</div>
					</Reveal>
				))}
			</div>
		</Frame>
	);
}
