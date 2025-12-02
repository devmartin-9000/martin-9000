import { useState } from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";

const NavBar = () => {
	const [open, setOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 p-2 w-full bg-background/50 backdrop-blur-2xl shadow-md z-50">
			<div className="flex items-center justify-between bg-background/20 border backdrop-blur-xl rounded-2xl px-4 py-3 md:py-2 md:max-w-6xl mx-auto">
				{/* Left Side Logo + Title */}

				<Link to="/">
					<div className="flex items-center p-2 gap-3 cursor-pointer">
						<img
							src="./assets/logo.svg"
							alt="Logo"
							className="h-10 w-10 hover:scale-105 transition-transform duration-200 ease-in-out"
							loading="lazy"
						/>
						<h1 className="font-bold text-2xl md:text-3xl hover:scale-105 transition-transform duration-200 ease-in-out">
							.martin
						</h1>
					</div>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex gap-8 text-center">
					<Link
						className="cursor-pointer border-b-4 border-transparent hover:border-primary transition-colors duration-300"
						to="/about"
					>
						About Me
					</Link>
					<Link
						className="cursor-pointer border-b-4 border-transparent hover:border-primary transition-colors duration-300"
						to="/projects"
					>
						Projects
					</Link>
					<Link
						className="cursor-pointer border-b-4 border-transparent hover:border-primary transition-colors duration-300"
						to="/skills"
					>
						Skills
					</Link>
				</div>

				{/* CTA Desktop */}
				<div className="hidden md:block p-2">
					<Link to="/contact">
						<Button
							variant="default"
							size="lg"
						>
							Let's Chat
						</Button>
					</Link>
				</div>

				{/* Mobile Hamburger */}
				<button
					className="md:hidden flex flex-col gap-1 p-2 focus:outline-none"
					onClick={() => setOpen(!open)}
				>
					<span
						className={`h-1 w-6 bg-primary rounded transition-all ${
							open ? "rotate-45 translate-y-2" : ""
						}`}
					></span>
					<span
						className={`h-1 w-6 bg-primary rounded transition-all ${
							open ? "opacity-0" : ""
						}`}
					></span>
					<span
						className={`h-1 w-6 bg-primary rounded transition-all ${
							open ? "-rotate-45 -translate-y-2" : ""
						}`}
					></span>
				</button>
			</div>

			{/* Mobile Menu Dropdown */}
			{open && (
				<div className="md:hidden flex flex-col items-center gap-6 py-8 bg-background/1 shadow-lg backdrop-blur-2xl">
					<Link
						className="cursor-pointer border-b-2 border-transparent hover:border-primary transition-colors duration-300"
						to="/"
						onClick={() => setOpen(false)}
					>
						Home
					</Link>
					<Link
						className="cursor-pointer border-b-2 border-transparent hover:border-primary transition-colors duration-300"
						to="/about"
						onClick={() => setOpen(false)}
					>
						About Me
					</Link>
					<Link
						className="cursor-pointer border-b-2 border-transparent hover:border-primary transition-colors duration-300"
						to="/projects"
						onClick={() => setOpen(false)}
					>
						Projects
					</Link>
					<Link
						className="cursor-pointer border-b-2 border-transparent hover:border-primary transition-colors duration-300"
						to="/skills"
						onClick={() => setOpen(false)}
					>
						Skills
					</Link>
					<Link to="/contact">
						<Button
							className="rounded-full mt-2"
							variant="default"
							size="lg"
							onClick={() => setOpen(false)}
						>
							Let's Chat
						</Button>
					</Link>
				</div>
			)}
		</nav>
	);
};

export default NavBar;