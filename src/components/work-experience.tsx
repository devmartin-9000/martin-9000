import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Briefcase, CalendarIcon, MapPin } from "lucide-react";
import type { JSX, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";

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
								<h1 className="font-bold text-muted-foreground/80 dark:text-primary-foreground/80 text-sm md:text-base leading-tight hover:scale-[1.02] transition-all">
									{item.role}
								</h1>

								<span className="mt-1 text-sm md:text-md font-normal">
									{item.company}
								</span>
							</div>

							{/* Dates */}
							<span className="flex md:flex-row-reverse gap-2 justify-apart text-sm md:text-md text-muted-foreground hover:scale-[1.02] transition-all">
								<CalendarIcon
									className="text-black/30 dark:text-white/30 items-center fill-purple-800/50"
									size={18}
								/>
								{item.period}
							</span>
						</div>
					</AccordionTrigger>

					{/* Content */}
					<AccordionContent className="flex flex-col p-2 gap-4 text-sm md:text-sm text-muted-foreground">
						{item.description.map(
							(
								paragraph:
									| string
									| number
									| bigint
									| boolean
									| ReactElement<unknown, string | JSXElementConstructor<any>>
									| Iterable<ReactNode>
									| ReactPortal
									| Promise<
											| string
											| number
											| bigint
											| boolean
											| ReactPortal
											| ReactElement<
													unknown,
													string | JSXElementConstructor<any>
											  >
											| Iterable<ReactNode>
											| null
											| undefined
									  >
									| null
									| undefined,
								idx: Key | null | undefined
							) => (
								<p key={idx}>{paragraph}</p>
							)
						)}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}

// Work Experience Data

interface DataProps {
	id: string;
	role: string;
	company: JSX.Element;
	period: string;
	description: any;
}
export const workExperienceData: DataProps[] = [
	{
		id: "item-1",
		role: "Software Developer",
		company: (
			<div className="flex gap-2">
				<span className="flex gap-2">
					<Briefcase className="flex items-center text-primary/80" size={18} />
					<p className="text-muted-foreground">VORLTEC Inc.</p>
				</span>
				<span className="flex gap-2 text-sm items-center text-muted-foreground/70">
					<MapPin
						className="flex items-center fill-muted-foreground/70 text-muted"
						size={18}
					/>
					Remote
				</span>
			</div>
		),
		period: "Dec. 2024 - Present",
		description: [
			"Developed and maintained responsive web interfaces and internal dashboards.",
			"Collaborated with teams to debug, enhance and optimize features, improving user experience scores by 15% reflected by monthly user traffic.",
			"Built reusable React components and state management logic that accelerated feature deployment, supporting rapid experimentation and iterative testing in half the time.",
		],
	},
	{
		id: "item-2",
		role: "Learner Support Ambassador",
		company: (
			<div className="flex gap-2">
				<span className="flex gap-2">
					<Briefcase className="flex items-center text-primary/80" size={18} />
					<p className="text-muted-foreground">Sand Technologies</p>
				</span>
				<span className="flex gap-2 text-sm items-center text-muted-foreground/70">
					<MapPin
						className="flex items-center fill-muted-foreground/70 text-muted"
						size={18}
					/>
					Remote
				</span>
			</div>
		),
		period: "Jul. 2024 - Dec. 2024",
		description: [
			"Provided technical support to an E-Learning community spanning 8+ countries, resolving 200+ issues and inquiries with an average response time of under 6 hours.",
			"Reviewed and documented internal community engagement stats covering, and improving knowledge base completeness by more than 30% as reflected in the learner support ticket flags.",
			"Created engaging weekly content for newsletter campaigns and our internal learning community platform, resulting in increased user engagement.",
			"Actively collected user feedback on platform features, synthesizing insights into reports that played a key role in ensuring an enhanced overall user satisfaction.",
		],
	},
	{
		id: "item-3",
		role: "Assistant Accountant",
		company: (
			<div className="flex gap-2">
				<span className="flex gap-2">
					<Briefcase className="flex items-center text-primary/80" size={18} />
					<p className="text-muted-foreground">Mapeto Investments</p>
				</span>
				<span className="flex gap-2 text-sm items-center text-muted-foreground/70">
					<MapPin
						className="flex items-center fill-muted-foreground/70 text-muted"
						size={18}
					/>
					On-site
				</span>
			</div>
		),
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
		company: (
			<div className="flex gap-2">
				<span className="flex gap-2">
					<Briefcase className="flex items-center text-primary/80" size={18} />
					<p className="text-muted-foreground">I.T. Africa</p>
				</span>
				<span className="flex gap-2 text-sm items-center text-muted-foreground/70">
					<MapPin
						className="flex items-center fill-muted-foreground/70 text-muted"
						size={18}
					/>
					Hybrid
				</span>
			</div>
		),
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
		company: (
			<div className="flex gap-2">
				<span className="flex gap-2">
					<Briefcase className="flex items-center text-primary/80" size={18} />
					<p className="text-muted-foreground">I.T. Africa</p>
				</span>
				<span className="flex gap-2 text-sm items-center text-muted-foreground/70">
					<MapPin
						className="flex items-center fill-muted-foreground/70 text-muted"
						size={18}
					/>
					Hybrid
				</span>
			</div>
		),
		period: "Nov. 2020 - Nov. 2021",
		description: [
			"Managed over 300+ client accounts, generating new leads and driving a 20% increase in repeat business through proactive engagement.",
			"Resolved customer inquiries and technical issues efficiently, maintaining a satisfaction rate of over 95%.",
			"Documented customer feedback and product issues to inform improvements, directly contributing to enhanced product usability.",
		],
	},
];

