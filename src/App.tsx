import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import NavBar from "./components/ui/navBar";
import { TracingBeam } from "./components/ui/tracing-beam";
import HeroSection from "./pages/heroSection";
import AboutMe from "./pages/aboutMe";
import Projects from "./pages/projects";

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
			</TracingBeam>
			<Routes>
				<Route path="/home" element={null} />
				<Route path="/about" element={null} />
				<Route path="/projects" element={null} />
			</Routes>
		</Router>
	);
};

export default App;
