import { Button } from "./button";

const NavBar = () => {
  return (
		<div className="flex flex-cols w-full asbolute inset-0 bg-primary/1 items-center px-4 shadow-md backdrop-blur-2xl justify-evenly">
			{/* Left Side Nav */}
			<div className="flex flex-cols items-center gap-4">
				{/* Logo */}
				<div className="p-2 bg-primary hover:bg-accent transoform transition-colors duration-300 ease-in-out">
					<img src="logo.svg" alt="Logo" className="h-10 w-10" />
				</div>
				{/* Title  */}
				<h1 className="font-bold text-3xl">.martin</h1>
			</div>
			{/* Menus */}

			<div className="flex flex-cols gap-6 text-center ">
				<a
					className="cursor-pointer border-b-4 border-border hover:border-accent transoform transition-colors duration-300 ease-in-out"
					href="#home"
				>
					Home
				</a>
				<a
					className="cursor-pointer border-b-4 border-border hover:border-accent transoform transition-colors duration-300 ease-in-out"
					href="#about-me"
				>
					About Me
				</a>
				<a
					className="cursor-pointer border-b-4 border-border hover:border-accent transoform transition-colors duration-300 ease-in-out"
					href="#projects"
				>
					Projects
				</a>
				<a
					className="cursor-pointer border-b-4 border-border hover:border-accent transoform transition-colors duration-300 ease-in-out"
					href="#skills"
				>
					Skills
				</a>
			</div>
			{/* CTA */}

			<div>
				<Button
					className="flex flex-cols items-center rounded-full"
					variant="outline"
					size="lg"
				>
					Let's Chat
				</Button>
			</div>
		</div>
	);
}

export default NavBar;