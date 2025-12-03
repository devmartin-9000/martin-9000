import { Separator } from "@/components/ui/separator";
import { ArrowUp, CircleCheckIcon } from "lucide-react";
import { Link } from "react-router-dom";

const SkillSection = () => {

    type TechnicalAbility = {
			subCategory: string;
			items: string[];
	};
    type SoftAbility = {
        items: string[];
    }

    const NonTechnicalSkills: SoftAbility[] = [
        {
            items: [
                "Communication & Collaboration",
                "Problem-Solving",
                "Time Management",
                "Critical Thinking",
                "Empathy",
                "Adaptability",
                "Teamwork",
                "Leadership",
                "Attention to Detail",
                "Creativity",
                "Organization",
                "Coacheable",
                "Using Google when stuck",
            ]
        }
	];

    const TechnicalAbilities: TechnicalAbility[] = [
        {
            subCategory: "Languages & Frameworks",
            items: [
                "JavaScript",
                "TypeScript",
                "HTML5",
                "CSS3",
                "React",
                "Next.js",
                "Express",
                "Python",
				"C",
				".NET",
				"C#",
            ],
        },
        {
            subCategory: "Libraries & Tools",
            items: [
                "Vite",
                "Tailwind CSS",
                "Radix UI",
                "Shadcn UI",
                "Framer",
                "Gsap",
                "Git & GitHub",
                "Figma",
                "WordPress",
                "Webflow",
            ],
        },
    ];
  return (
		<section
			id="skills"
			className="scroll-mt-18 p-4 h-full  mx-auto justify-center w-full"
		>
			<div className="max-w-6xl mx-auto">
				{/* Title */}
				<h1 className="text-center md:text-start text-muted-foreground dark:text-primary-foreground/80 font-extrabold text-5xl md:text-8xl leading-relaxed">
					.skills
				</h1>
				<div className="bg-transparent grid md:grid-cols-2 gap-4 py-8">
					{/* LEFT SIDE */}
					<div className="p-4 border border-black/40 dark:border-border flex flex-col items-start justify-start rounded-4xl min-h-80 gap-2">
						<h2 className="bg-primary dark:bg-white/10 text-black dark:text-primary-foreground/80 text-sm md:text-base font-semibold text-center leading-relaxed px-4 py-2 w-full rounded-2xl mb-0">
							TECHNICAL ABILITIES
						</h2>
						<p className="text-xs md:text-sm text-muted-foreground">
							Here are some of the technologies I work with. Some I use daily,
							and others I'm still exploring and learning.
						</p>
						<Separator />

						{TechnicalAbilities.map((section) => (
							<div key={section.subCategory} className="w-full">
								<h3 className="text-start text-muted-foreground dark:text-primary-foreground/80 font-semibold text-sm md:text-base mb-2">
									{section.subCategory}
								</h3>
								<div className="flex flex-wrap justify-start gap-3">
									{section.items.map((item) => (
										<p
											key={item}
											className="flex items-center border dark:border-primary text-xs md:text-sm text-white/80 bg-black dark:bg-primary/20 rounded-full gap-3 pr-2 pl-0.5"
										>
											<CircleCheckIcon className="text-primary/80 h-4 w-auto" />
											{item}
										</p>
									))}
								</div>
							</div>
						))}
					</div>

					{/* RIGHT SIDE */}
					<div className="p-4 border border-black/40 dark:border-border flex flex-col items-start justify-start rounded-4xl min-h-80 gap-2">
						<h2 className="bg-primary dark:bg-white/10 text-black dark:text-primary-foreground/80 text-sm md:text-base font-semibold text-center leading-relaxed px-4 py-2 w-full rounded-2xl mb-0">
							NON-TECHNICAL SKILLS
						</h2>
						<p className="text-xs md:text-sm text-muted-foreground">
							I'm more than just technical skills, I actively practice soft
							skills that make me stand out and collaborate effectively.
						</p>
						<Separator />

						{NonTechnicalSkills.map((section) => (
							<div className="mt-8 w-full">
								<div className="flex flex-wrap justify-start gap-3">
									{section.items.map((item) => (
										<p
											key={item}
											className="flex items-center border dark:border-blue-700 text-xs md:text-sm text-white/80 bg-black dark:bg-blue-700/20 rounded-full gap-3 pr-2 pl-0.5"
										>
											<CircleCheckIcon className="text-blue-800 h-4 w-auto" />
											{item}
										</p>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<Link to="/home">
				<div className="max-w-6xl mx-auto justify-end flex rounded-full bg-background">
					<div className="items-center gap-2 rounded-4xl duration-500 transition-all">
						<h1 className="fixed bottom-5 right-5 p-3 text-center text-sm md:text-base font-bold flex flex-row bg-primary rounded-full gap-4 items-center text-black hover:scale-105 transition-discrete duration-500 animate-pulse">
							<ArrowUp className="animate-bounce" />
						</h1>
					</div>
				</div>
			</Link>
		</section>
	);
}

export default SkillSection;