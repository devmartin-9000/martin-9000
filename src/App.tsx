import { currentPage } from "@/lib/route";
import Nav from "@/portfolio/Nav";
import Hero from "@/portfolio/Hero";
import About from "@/portfolio/About";
import Approach from "@/portfolio/Approach";
import Skills from "@/portfolio/Skills";
import Projects from "@/portfolio/Projects";
import YapZone from "@/portfolio/YapZone";
import Contact from "@/portfolio/Contact";
import YapPage from "@/pages/YapPage";
import ProjectsPage from "@/pages/ProjectsPage";

// older links opened rants on the landing page as #yap=<id>; send them to the rant's own page
const legacyYap = window.location.hash.match(/^#yap=(.+)$/);
if (legacyYap) window.location.replace(`/yap/${legacyYap[1]}`);

export default function App() {
	const page = currentPage();
	if (page === "yap") return <YapPage />;
	if (page === "projects") return <ProjectsPage />;

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
