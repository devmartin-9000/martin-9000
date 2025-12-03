import { MessageSquareText, SendHorizontal  } from "lucide-react";
import React from "react";

const ContactSection: React.FC = () => {
	return (
		<section
			id="contact"
			className="scroll-mt-18 bg-background w-full flex flex-col items-center justify-center h-135"
		>
			<div className="border border-background relative w-95 sm:w-230 md:w-190 lg:w-230 py-10 mt-10 lg:mt-12 max-w-5xl h-full overflow-hidden rounded-[40px] bg-black dark:bg-white/50 p-6 md:p-16">
				{/* Background circles */}
				<div className="absolute inset-0 hidden h-full w-full overflow-hidden md:block">
					<div className="absolute top-1/2 right-[-45%] aspect-square h-[900px] w-[900px] -translate-y-1/2">
						<div className="absolute inset-0 rounded-full bg-primary/30 opacity-30"></div>
						<div className="absolute inset-0 scale-[0.8] rounded-full bg-accent/40 opacity-30"></div>
						<div className="absolute inset-0 scale-[1] rounded-full bg-background opacity-10"></div>
						<div className="absolute inset-0 scale-[0.4] rounded-full bg-accent/30 opacity-30"></div>
						<div className="absolute inset-0 scale-[0.6] rounded-full bg-accent/30 opacity-30"></div>
						<div className="absolute inset-0 scale-[0.2] rounded-full bg-black opacity-30"></div>
					</div>
				</div>

				{/* Content */}
				<div className="relative z-10 flex flex-col items-center text-center gap-4">
					<h1 className="text-5xl md:text-6xl font-bold text-muted">
						Let's Get In Touch.
					</h1>
					<p className="max-w-2xl text-lg sm:text-xl md:text-2xl text-muted">
						Let's connect and discuss how I can bring value to your team. I'm
						just a message away.
					</p>

					<div className="flex flex-col sm:flex-row gap-2 md:gap-6 md:mt-6">
						<a target="_blank" href="mailto:dev.martinjack9000@gmail.com">
							<div className="bg-primary backdrop-blur-2xl flex gap-3 py-2 md:py-2 px-6 rounded-full hover:translate-y-2 transform transition-all duration-400 items-center text-center text-black font-bold">
								Send Email
								<SendHorizontal />
							</div>
						</a>
						<a
							target="_blank"
							href="https://wa.me/265995571632?text=Hello%20Martin"
						>
							<div className="bg-primary backdrop-blur-2xl flex gap-3 py-2 md:py-2 px-6 rounded-full hover:translate-y-2 transform transition-all duration-400 items-center text-center text-black font-bold">
								WhatsApp
								<MessageSquareText />
							</div>
						</a>
					</div>
				</div>
			</div>
			<div className="w-full flex flex-wrap mx-auto p-4 md:p-4 rounded-t-3xl bg-accent/1 gap-2 md:gap-4 text-xs items-center justify-center mt-5">
				<p className="text-muted-foreground text-sm">Hand-coded with :</p>

				<p className="px-4 py-1 border dark:border-primary text-white/80 bg-black dark:bg-primary/20 rounded-full">
					React
				</p>
				<p className="px-4 py-1 border dark:border-primary text-white/80 bg-black dark:bg-primary/20 rounded-full">
					TypeScript
				</p>
				<p className="px-4 py-1 border dark:border-primary text-white/80 bg-black dark:bg-primary/20 rounded-full">
					Tailwind CSS
				</p>
				<p className="px-4 py-1 border dark:border-primary text-white/80 bg-black dark:bg-primary/20 rounded-full">
					Shadcn UI
				</p>
			</div>
			<p className="text-xs text-muted-foreground mb-4">
				2025 © All rights reserved - Martin Jack M
			</p>
		</section>
	);
};

export default ContactSection;
