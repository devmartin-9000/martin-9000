import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import NavBar from "./components/ui/navBar";
// import { TracingBeam } from "./components/ui/tracing-beam";
import HeroSection from "./pages/heroSection";
import AboutMe from "./pages/aboutMe";
import Projects from "./pages/projects";
import SkillSection from "./pages/skills";
import ContactSection from "./pages/contact";
import { TracingBeam } from "./components/ui/tracing-beam";

const ScrollManager = () => {
	const location = useLocation();

	useEffect(() => {
		const path = location.pathname.replace("/", "");
		const section = path === "" ? "home" : path;

		const el = document.getElementById(section);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	}, [location]);

	return null;
};

const App = () => {
	return (
		<Router>
			<NavBar />
			<ScrollManager />
			<TracingBeam className="px-0">
				<HeroSection />
				<AboutMe />
				<Projects />
				<SkillSection />
				<ContactSection />
			</TracingBeam>
			<Routes>
				<Route path="/about" element={null} />
				<Route path="/projects" element={null} />
				<Route path="/skills" element={null} />
				<Route path="/contact" element={null} />
			</Routes>
		</Router>
	);
};

export default App;
