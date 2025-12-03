"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Lightbulb, SunIcon } from "lucide-react"; // Sun icon from Lucide

const ThemeToggle = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Load stored theme on mount
	useEffect(() => {
		const storedTheme =
			localStorage.getItem("theme") || Cookies.get("theme") || "light";

		if (storedTheme === "dark") {
			document.body.classList.add("dark");
			setIsDarkMode(true);
		} else {
			document.body.classList.remove("dark");
			setIsDarkMode(false);
		}
	}, []);

	// Handle toggle
	const toggleDarkMode = () => {
		const newTheme = !isDarkMode ? "dark" : "light";
		setIsDarkMode(!isDarkMode);
		document.body.classList.toggle("dark");

		// Save to localStorage and cookie
		localStorage.setItem("theme", newTheme);
		Cookies.set("theme", newTheme, { expires: 360 }); // 1 year
	};

	return (
		<button
			onClick={toggleDarkMode}
			aria-label="Toggle dark mode"
			className="cursor-pointer p-1 border border-white/60 rounded-full transition-all"
		>
			<SunIcon
				className={`h-6 w-auto transition-all hover:text-primary font-bold ${
					isDarkMode ? "text-white" : "text-white"
				}`}
			/>
		</button>
	);
};

export default ThemeToggle;
