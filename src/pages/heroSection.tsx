import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const HeroSection = () => {
	return (
		<section
			id="home"
			className="mx-auto flex flex-col justify-center py-4"
		>
			<div className="bg-background w-95 md:w-full mt-2 mx-auto justify-center rounded-t-4xl">
				<div className="h-full max-w-5xl rounded-t-4xl p-4 border-b-transparent border-t-20 border border-l-accent border-r-accent border-primary mt-18 mx-auto flex flex-col">
					<div className="text-wrap text-center">
						<h2 className="font-bold text-xl sm:text-3xl md:text-3xl py-4">
							Hey there, Welcome!
						</h2>
						<p className="text-sm md:text-md text-muted-foreground">
							It's fantastic having you here!
						</p>

						<div className="bg-accent p-1 md:p-1 my-2 w-40 md:w-64 rounded-sm mx-auto" />

						<h1 className="font-semibold text-4xl md:text-7xl py-2 leading-tight">
							I'm a Front-End
							<br />
							Developer
						</h1>

						<p className="max-w-md leading-relaxed mx-auto py-2 text-sm md:text-md text-muted-foreground">
							I create straightforward, user-friendly interfaces with focus on
							good design, usability and efficiency. I'm always learning, always
							refining, and always aiming to build something genuinely helpul.
						</p>

						<div className="w-full flex flex-wrap mx-auto border border-accent p-4 md:p-8 rounded-t-3xl bg-accent/1 gap-2 md:gap-4 text-xs items-center justify-center mt-5">
							<h2 className="text-primary text-3xl font-bold">TL;DR.</h2>
							<p className="hidden md:block">-</p>
							<p className="text-muted-foreground text-sm">
								My ToolKit Includes :
							</p>

							<p className="px-4 py-1 border border-primary bg-accent/20 rounded-full">
								React
							</p>
							<p className="px-4 py-1 border border-primary bg-accent/20 rounded-full">
								TypeScript
							</p>
							<p className="px-4 py-1 border border-primary bg-accent/20 rounded-full">
								JavaScript
							</p>
							<p className="px-4 py-1 border border-primary bg-accent/20 rounded-full">
								Tailwind CSS
							</p>
							<p className="px-4 py-1 border border-primary bg-accent/20 rounded-full">
								Figma
							</p>
						</div>
						<div className="mt-10 grid grid-cols-2 md:flex items-center justify-center gap-8 md:gap-20">
							<Tooltip>
								<TooltipTrigger asChild>
									<a
										href="https://github.com/devmartin-9000"
										target="_blank"
										className="text-sm text-muted-foreground text-center items-center flex flex-col gap-2 cursor-pointer border-b-4 border-border hover:border-primary duration-500 ease-in-out hover:scale-105 transition-all"
									>
										<img
											className="h-10 w-auto invert"
											src="./assets/github-icon.svg"
											alt="Github Icon"
											loading="lazy"
										/>
										GitHub
									</a>
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-sm">Open in a new tab</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<a
										href="https://linkedin.com/in/devmartin-jack"
										target="_blank"
										className="text-sm text-muted-foreground text-center items-center flex flex-col gap-2 cursor-pointer border-b-4 border-border hover:border-primary duration-500 ease-in-out hover:scale-105 transition-all"
									>
										<img
											className="h-10 w-auto invert"
											src="./assets/linkedin-icon.svg"
											alt="LinkedIn Icon"
											loading="lazy"
										/>
										LinkedIn
									</a>
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-sm">Open in a new tab</p>
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<a
										href="mailto:dev.martinjack9000@gmail.com"
										target="_blank"
										className="text-sm text-muted-foreground text-center items-center flex flex-col gap-2 cursor-pointer border-b-4 border-border hover:border-primary duration-500 ease-in-out hover:scale-105 transition-all"
									>
										<img
											className="h-10 w-auto invert"
											src="./assets/email-icon.svg"
											alt="Email Icon"
											loading="lazy"
										/>
										E-mail
									</a>
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-sm">Open in a new tab</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<a
										href="https://x.com/MartinJack9000"
										target="_blank"
										className="text-sm text-muted-foreground text-center items-center flex flex-col gap-2 cursor-pointer border-b-4 border-border hover:border-primary duration-500 ease-in-out hover:scale-105 transition-all"
									>
										<img
											className="p-1 h-10 w-auto invert"
											src="./assets/x-icon.png"
											alt="X Icon"
											loading="lazy"
										/>
										X (Twitter)
									</a>
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-sm">Open in a new tab</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;