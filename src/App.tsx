import { MotionConfig } from "motion/react";
import Nav from "@/components/Nav";
import { Eggs } from "@/components/eggs";
import Hero from "@/sections/Hero";
import Strip from "@/sections/Strip";
import Projects from "@/sections/Projects";
import Custom from "@/sections/Custom";
import Guide from "@/sections/Guide";
import About from "@/sections/About";
import Stats from "@/sections/Stats";
import Experience from "@/sections/Experience";
import Services from "@/sections/Services";
import Contact from "@/sections/Contact";

export default function App() {
	return (
		<MotionConfig reducedMotion="user">
			<Eggs />
			<Nav />
			<main className="flex flex-col gap-6 px-3 py-3 md:gap-8 md:px-6 md:pt-6">
				<Hero />
				<Strip />
				<Projects />
				<Custom />
				<Guide />
				<About />
				<Stats />
				<Experience />
				<Services />
				<Contact />
			</main>
		</MotionConfig>
	);
}
