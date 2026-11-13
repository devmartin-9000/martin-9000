import Hero from "@/portfolio/Hero";
import Approach from "@/portfolio/Approach";
import Projects from "@/portfolio/Projects";
import Contact from "@/portfolio/Contact";

export default function App() {
	return (
		<div className="bg-white">
			<Hero />
			<Approach />
			<Projects />
			<Contact />
		</div>
	);
}
