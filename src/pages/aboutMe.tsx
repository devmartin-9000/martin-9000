import { WorkExperience } from "@/components/work-experience";

const AboutMe = () => {	
    return (
			<section
				id="about"
				className="scroll-mt-18 py-0 bg-background h-full my-auto mx-auto justify-center w-full"
			>
				{/* Main Div */}
				<div
					className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 w-full md:max-w-5xl mx-auto p-4 md:p-4"
				>
					{/* Left Column */}
					<div className="">
						<div className="text-center lg:text-start">
							{/* Title */}
							<h1 className="text-primary-foreground/80 font-extrabold text-5xl sm:text-6xl md:text-8xl leading-relaxed">
								.about me
							</h1>
						</div>
						{/* Main Paragraph */}
						<div className="text-muted-foreground flex md:border-l border-t opacity-90 flex-col p-4 text- items-center gap-4">
							<p className="leading-snug text-sm">
								My name is <span className="font-bold">Martin Jack</span>, I
								live in Blantyre, Malawi. It has now been about a year since I
								began shipping production code, and almost three years of
								dedicated coding experience overall. What motivates me is the
								opportunity to build things that look good, feel smooth, and
								genuinely useful to people. I’m a very visual thinker, so I
								naturally gravitate towards clean, thoughtful design and
								well-crafted user interfaces.
							</p>
							<p className="leading-snug text-sm">
								Before moving into tech, I worked in Sales, Customer Support,
								Operations, Admin, and Accounting. Those roles helped me develop
								strong communication skills, patience, and the ability to
								understand people’s needs, qualities that continue to be useful
								in my work today.
							</p>
							<p className="leading-snug text-sm">
								Outside of work, I enjoy simple things that recharge me;
								exploring new food places, relaxing with video games, and
								listening to electronic music or ambient lo-fi playlists on
								Spotify. These help me stay balanced and keep my creativity
								flowing.
							</p>
						</div>
					</div>
					{/* Right Column */}
					<div className="">
							<img
								src="./assets/Thumbnail-3.jpg"
								className="h-120 cursor-pointer w-auto mx-auto object-fill rounded-xs group-hover/card:shadow-xl duration-800 ease-in-out transition-all"
								alt="thumbnail"
								loading="lazy"
							/>
					</div>
				</div>

				{/* Work Experience */}
				<div className="rounded-none md:rounded-t-4xl bg-background items-center p-6 md:p-6 max-w-6xl mx-auto md:max-w-5xl">
					<h1 className="text-center md:text-start text-primary-foreground/80 font-extrabold text-5xl md:text-8xl leading-relaxed">
						.work history
					</h1>
					<div className="mx-auto md:max-w-2xl">
						<WorkExperience />
					</div>
				</div>
			</section>
		);
}

export default AboutMe;