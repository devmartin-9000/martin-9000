import Nav from "@/portfolio/Nav";
import Hero from "@/portfolio/Hero";
import About from "@/portfolio/About";
import Approach from "@/portfolio/Approach";
import Skills from "@/portfolio/Skills";
import Projects from "@/portfolio/Projects";
import YapZone from "@/portfolio/YapZone";
import Contact from "@/portfolio/Contact";

export default function App() {
	return (
		<div className="bg-white">
			<Nav />
			<Hero />
			<About />
			<Approach />
			<Skills />
			<Projects />
			<YapZone />
			<Contact />
		</div>
	);
}
