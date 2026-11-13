import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

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
	// true when this page pushed the item's address, so closing can simply step back
	const pushed = useRef(false);

	useEffect(() => {
		const onPop = () => {
			pushed.current = false;
			setId(itemFromPath(base));
		};
		window.addEventListener("popstate", onPop);
		return () => window.removeEventListener("popstate", onPop);
	}, [base]);

	const open = useCallback(
		(next: string) => {
			const url = `${base}/${encodeURIComponent(next)}`;
			if (pushed.current) history.replaceState(null, "", url);
			else history.pushState(null, "", url);
			pushed.current = true;
			setId(next);
		},
		[base]
	);
	const close = useCallback(() => {
		setId(null);
		if (pushed.current) {
			// back to wherever the reader was opened from (the landing page or the list)
			pushed.current = false;
			history.back();
		} else {
			// opened from a shared link: land on the list instead
			history.replaceState(null, "", base);
		}
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
