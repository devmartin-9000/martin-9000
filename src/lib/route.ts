import { useCallback, useEffect, useState, type MouseEvent } from "react";

/** Which page the current address belongs to. Pages are plain links, so this is read once per load. */
export function currentPage(): "home" | "yap" | "projects" {
	const path = window.location.pathname.replace(/\/+$/, "");
	if (path === "/yap" || path.startsWith("/yap/")) return "yap";
	if (path === "/projects" || path.startsWith("/projects/")) return "projects";
	return "home";
}

const itemFromPath = (base: string) => {
	const match = window.location.pathname.match(new RegExp(`^${base}/([^/]+)/?$`));
	return match ? decodeURIComponent(match[1]) : null;
};

/**
 * Keeps an open item in the address bar (`/yap/<id>`, `/projects/<id>`) so the reader can be
 * linked to directly, and the browser's back button closes it.
 */
export function useRouteItem(base: string) {
	const [id, setId] = useState(() => itemFromPath(base));

	useEffect(() => {
		const onPop = () => setId(itemFromPath(base));
		window.addEventListener("popstate", onPop);
		return () => window.removeEventListener("popstate", onPop);
	}, [base]);

	const open = useCallback(
		(next: string) => {
			history.pushState(null, "", `${base}/${encodeURIComponent(next)}`);
			setId(next);
		},
		[base]
	);
	const close = useCallback(() => {
		history.pushState(null, "", base);
		setId(null);
	}, [base]);

	return { id, open, close };
}

/** Lets a link open in-page (no reload) on a normal click, but still work as a real link. */
export function clickHandler(action: () => void) {
	return (e: MouseEvent) => {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
		e.preventDefault();
		action();
	};
}
