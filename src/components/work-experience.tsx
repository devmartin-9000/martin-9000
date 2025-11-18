import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function WorkExperience() {
	return (
		<Accordion
			type="single"
			collapsible
			className="w-full"
			defaultValue="item-1"
		>
			{workExperienceData.map((item) => (
				<AccordionItem key={item.id} value={item.id}>
					<AccordionTrigger>
						<div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between gap-1 md:gap-2 text-left">
							{/* Role + Company */}
							<div className="flex flex-col">
								<h1 className="font-bold text-primary/70 text-sm md:text-base leading-tight hover:scale-[1.02] transition-all">
									{item.role}
								</h1>

								<span className="text-xs md:text-sm font-semibold text-muted-foreground">
									{item.company}
								</span>
							</div>

							{/* Dates */}
							<span className="text-xs md:text-xs text-muted-foreground hover:scale-[1.02] transition-all">
								{item.period}
							</span>
						</div>
					</AccordionTrigger>

					{/* Content */}
					<AccordionContent className="flex flex-col p-2 gap-4 text-sm md:text-sm text-muted-foreground">
						{item.description.map((paragraph, idx) => (
							<p key={idx}>{paragraph}</p>
						))}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}

// Work Experience Data
export const workExperienceData = [
	{
		id: "item-1",
		role: "Software Developer",
		company: "VORLTEC Inc. (Remote)",
		period: "Dec. 2024 - Present",
		description: [
			"Developed and maintained responsive web interfaces and internal dashboards.",
			"Collaborated with teams to debug, enhance and optimize features, improving user experience scores by 15% reflected by monthly user traffic.",
			"Built reusable React components and state management logic that accelerated feature deployment, supporting rapid experimentation and iterative testing in half the time.",
		],
	},
	{
		id: "item-2",
		role: "Community Moderator",
		company: "Sand Technologies (Remote)",
		period: "Jul. 2024 - Dec. 2024",
		description: [
			"Provided technical support to an E-Learning community spanning 8+ countries, resolving over 200+ issues and inquiries with an average response time of under 6 hours.",
			"Reviewed and documented internal community engagement stats, and improving knowledge base completeness by more than 15% as reflected in the learner support ticket flags.",
			"Actively collected user feedback on platform features, synthesizing insights into reports that played a key role in ensuring an enhanced overall user satisfaction.",
		],
	},
	{
		id: "item-3",
		role: "Assistant Accountant",
		company: "Mapeto Investments Ltd (On-site)",
		period: "Jan. 2023 - Mar. 2024",
		description: [
			"Managed financial records for 100+ client accounts, ensuring 100% accuracy and timely reporting for audits and management review.",
			"Automated recurring invoice processing and reconciliations, reducing manual effort by 20 hours per month.",
			"Generated analytical reports that guided strategic decisions and improved cash flow forecasting accuracy by 10%.",
		],
	},
	{
		id: "item-4",
		role: "Admin & Sales Assistant",
		company: "I.T Africa (Hybrid)",
		period: "Nov. 2021 - Dec. 2022",
		description: [
			"Optimized internal workflows, cutting average task completion time by 50% through standardized procedures and templates.",
			"Trained and onboarded 10+ new employees on company systems and tools, improving team productivity and consistency.",
			"Supported cross-department projects by maintaining accurate records, coordinating schedules and facilitating timely follow-ups on client requests.",
		],
	},
	{
		id: "item-5",
		role: "Sales Rep. & Customer Support",
		company: "I.T Africa (Hybrid)",
		period: "Nov. 2020 - Nov. 2021",
		description: [
			"Managed over 300+ client accounts, generating new leads and driving a 20% increase in repeat business through proactive engagement.",
			"Resolved customer inquiries and technical issues efficiently, maintaining a satisfaction rate of over 95%.",
			"Documented customer feedback and product issues to inform improvements, directly contributing to enhanced product usability.",
		],
	},
];

