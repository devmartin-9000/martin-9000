import Hero from "@/portfolio/Hero";
import About from "@/portfolio/About";
import Work from "@/portfolio/Work";
import Contact from "@/portfolio/Contact";

export default function App() {
	return (
		<main className="mx-auto flex max-w-[1400px] flex-col gap-6 p-3 md:gap-8 md:p-6">
			<Hero />
			<About />
			<Work />
			<Contact />
		</main>
	);
}
