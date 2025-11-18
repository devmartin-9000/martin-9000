import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Projects() {
	return (
		<section
			id="projects"
			className="scroll-mt-18 w-full bg-background mx-auto py-8 px-4"
		>
			<div className="max-w-5xl mx-auto">
				<h1 className="text-center lg:text-end mb-5 text-primary-foreground/80 font-extrabold text-5xl md:text-8xl leading-relaxed">
					.projects
				</h1>
				<div className="flex flex-col gap-4">
					{/* FINTRIQS BLOCK */}
					<div className="bg-primary rounded-4xl p-2 md:p-10 flex flex-col lg:flex-row gap-4 shadow-xl">
						{/* LEFT SIDE — IMAGE + TITLE + TAGS */}
						<div className="bg-primary border border-background rounded-4xl p-3 md:p-5 w-full lg:w-1/2">
							{/* IMAGE */}
							<div className="relative rounded-4xl overflow-hidden h-76 w-full group cursor-pointer">
								<img
									src="./assets/fintriqs-thumbnail.png"
									alt="FINTRIQS Thumbnail"
									className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
									loading="lazy"
								/>

								{/* Overlay */}
								<div className="absolute inset-0 lg:bg-background/50 bg-opacity-30 opacity-100 lg:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex pb-4 lg:pb-0 items-end lg:items-center justify-center">
									<a target="_blank" href="https://tinyurl.com/FINTRIQS">
										<Tooltip>
											<TooltipTrigger asChild>
												<Button className="font-semibold">Live Link</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p className="text-xs">Opens in a new tab</p>
											</TooltipContent>
										</Tooltip>
									</a>
								</div>
							</div>

							{/* TITLE */}
							<p className="mt-4 text-muted text-center font-semibold text-sm mb-3">
								<span className="font-bold">FINTRIQS</span> – An Invoice
								Management System web app
							</p>
							<Separator />

							{/* TAGS */}
							<div className="flex flex-wrap gap-3 mt-4  justify-evenly  text-muted">
								<div className="px-4 py-1 rounded-full text-sm font-medium border border-black">
									React
								</div>
								<div className="px-4 py-1 rounded-full text-sm font-medium border border-black">
									TypeScript
								</div>
								<div className="px-4 py-1 rounded-full text-sm font-medium border border-black">
									Tailwind CSS
								</div>
								<div className="px-4 py-1 rounded-full text-sm font-medium border border-black">
									Zustand
								</div>
								<div className="px-4 py-1 rounded-full text-sm font-medium border border-black">
									Shadcn UI
								</div>
								<div className="px-4 py-1 rounded-full text-sm font-medium border border-black">
									Supabase
								</div>
							</div>
						</div>

						{/* RIGHT SIDE — PANEL */}
						<div className="bg-background text-muted-foreground rounded-4xl p-6 md:p-10 w-full lg:w-1/2">
							<h2 className="text-primary-foreground/80 opacity-90 text-lg md:text-xl font-bold mb-4 text-center">
								Project Summary
							</h2>

							<p className="text-sm leading-snug mb-4">
								This platform aims to be that simple fun tool businesses and
								freelancers can use to generate styled invoices with ease.
								Without having to download an app on their phone or computer.
							</p>

							<p className="text-sm leading-snug mb-4">
								The problem it solves, is the struggle of having to manually
								fill out repetitive information for every client that needs an
								invoice, things like, product/services rendered, payment
								information etc. This system makes the entire process simple and
								effortless.
							</p>

							<p className="text-sm leading-relaxed">
								I collaborated with fellow developers who took care of the
								backend and business logic, while I took full ownership of the
								front-end; landing page, dashboards and layouts.
							</p>
						</div>
					</div>
					{/* HOOKLAB BLOCK */}
					<div className="bg-primary rounded-4xl p-2 md:p-10 flex flex-col-reverse lg:flex-row gap-4 shadow-xl">
						{/* LEFT SIDE — PANEL */}
						<div className="bg-background text-muted-foreground rounded-4xl p-6 md:p-10 w-full lg:w-1/2">
							<h2 className="text-primary-foreground/80 opacity-90 text-lg md:text-xl font-bold mb-4 text-center">
								Project Summary
							</h2>

							<p className="text-sm leading-snug mb-4">
								HookLab is a creative preview tool built for media buyers and
								advertisers who want to see exactly how their ad hooks will
								appear across different platforms and devices, before spending a
								single dollar on campaigns.
							</p>

							<p className="text-sm leading-snug mb-4">
								It solves the uncertainty that comes with launching new
								creatives. Instead of guessing how your ad will look on mobile
								feeds, desktop layouts, or story placements, HookLab provides an
								instant, accurate visual preview so teams can iterate faster and
								make confident decisions.
							</p>

							<p className="text-sm leading-relaxed">
								I handled the full experience: the interactive preview screens,
								layouts, transitions, and UI architecture. The goal was to make
								the tool feel smooth, intuitive, and playful while reinforcing
								clarity for creative teams reviewing their ads.
							</p>
						</div>

						{/* RIGHT SIDE — IMAGE + TITLE + TAGS */}
						<div className="bg-primary border border-background rounded-4xl p-3 md:p-5 w-full lg:w-1/2">
							{/* IMAGE */}
							<div className="relative rounded-4xl overflow-hidden h-76 w-full group cursor-pointer">
								<img
									src="./assets/hooklab-thumbnail-2.png"
									alt="Hooklab Thumbnail"
									className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
									loading="lazy"
								/>

								{/* Overlay */}
								<div className="absolute inset-0 lg:bg-background/50 bg-opacity-30 opacity-100 lg:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex pb-4 lg:pb-0 items-end lg:items-center justify-center">
									<a target="_blank" href="https://tinyurl.com/HOOKLAB-ADS">
										<Tooltip>
											<TooltipTrigger asChild>
												<Button className="font-semibold">Live Link</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p className="text-xs">Opens in a new tab</p>
											</TooltipContent>
										</Tooltip>
									</a>
								</div>
							</div>

							{/* TITLE */}
							<p className="mt-4 text-muted text-center font-semibold text-sm mb-3">
								<span className="font-bold">Hooklab</span> – A platform to
								preview your ad hooks across multiple platforms
							</p>
							<Separator />

							{/* TAGS */}
							<div className="flex flex-wrap gap-3 mt-4  justify-evenly  text-muted">
								<div className="px-4 py-1 rounded-full text-sm font-medium border border-black">
									React
								</div>
								<div className="px-4 py-1 rounded-full text-sm font-medium border border-black">
									TypeScript
								</div>
								<div className="px-4 py-1 rounded-full text-sm font-medium border border-black">
									Zod
								</div>
								<div className="px-4 py-1 rounded-full text-sm font-medium border border-black">
									Tailwind CSS
								</div>
								<div className="px-4 py-1 rounded-full text-sm font-medium border border-black">
									Radix UI
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="max-w-2xl mx-auto justify-center flex mt-4 rounded-full p-2 bg-background">
						<h1 className="text-center text-sm md:text-base font-bold flex flex-row px-6 bg-primary  py-2 rounded-full gap-4 items-center text-muted hover:px-20 transition-discrete duration-500 ">
							More projects? Visit GitHub
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex items-center gap-2 p-2 border rounded-4xl hover:scale-106 duration-500 transition-all">
										<a target="_blank" href="https://github.com/devmartin-9000">
											<img
												className="h-6 w-auto"
												src="./assets/github-icon.svg"
												alt="Github Icon"
												loading="lazy"
											/>
										</a>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">Opens in a new tab</p>
								</TooltipContent>
							</Tooltip>
						</h1>
					</div>
				</div>
			</div>
		</section>
	);
}
