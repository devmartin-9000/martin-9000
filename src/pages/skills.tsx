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
                "Flask",
                "C",
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
			className="scroll-mt-18 p-4 bg-primary h-full my-auto mx-auto justify-center w-full"
		>
			<div className="max-w-5xl mx-auto">
				{/* Title */}
				<h1 className="text-center text-muted font-extrabold text-5xl md:text-8xl leading-relaxed border-b-2">
					.skills
				</h1>
				<div className="bg-transparent grid md:grid-cols-2 gap-4 py-8">
					{/* LEFT SIDE */}
					<div className="p-4 border flex flex-col items-start justify-start rounded-4xl min-h-80 gap-2">
						<h2 className="text-muted text-sm md:text-base font-semibold text-center leading-relaxed px-4 w-full border rounded-full mb-0">
							Technical Abilities
						</h2>
						<p className="text-xs md:text-sm text-muted">
							Here are some of the technologies I work with. Some I use daily,
							and others I'm still exploring and learning.
						</p>

						{TechnicalAbilities.map((section) => (
							<div key={section.subCategory} className="w-full">
								<h3 className="text-start text-muted font-semibold text-sm md:text-base mb-2">
									{section.subCategory}
								</h3>
								<div className="flex flex-wrap gap-3">
									{section.items.map((item) => (
										<p
											key={item}
											className="text-xs md:text-sm text-primary-foreground/70 bg-background/60 px-3 items-center text-center rounded-full"
										>
											{item}
										</p>
									))}
								</div>
							</div>
						))}
					</div>

					{/* RIGHT SIDE */}
					<div className="p-4 border flex flex-col items-start justify-start rounded-4xl min-h-80 gap-2">
						<h2 className="text-muted text-sm md:text-base font-semibold text-center leading-relaxed px-4 w-full border rounded-full mb-0">
							Non-Technical / Soft Skills
						</h2>
						<p className="text-xs md:text-sm text-muted">
							I'm more than just technical skills, I actively practice soft
							skills that make me stand out and collaborate effectively.
						</p>

						{NonTechnicalSkills.map((section) => (
							<div className="mt-8 w-full">
								<div className="flex flex-wrap gap-3">
									{section.items.map((item) => (
										<li
											key={item}
											className="text-xs md:text-sm text-primary-foreground/70 bg-background/60 px-3 items-center text-center rounded-full"
										>
											{item}
										</li>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default SkillSection;