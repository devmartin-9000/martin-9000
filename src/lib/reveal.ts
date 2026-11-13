/**
 * Scroll-triggered entrances for anything marked `data-reveal`.
 *
 * Cheap by design: one IntersectionObserver for the whole page (no scroll listeners),
 * only opacity and transform animate (compositor-only, no layout), each element is
 * revealed once and then unobserved. `data-reveal="2"` staggers by 2 steps.
 * New elements (route changes, filters) are picked up by a MutationObserver.
 *
 * Without IntersectionObserver, or with reduced motion, everything is simply shown.
 */
export function initReveal() {
	const root = document.documentElement;
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (reduced || !("IntersectionObserver" in window)) return;

	// hides [data-reveal] until revealed; set before first paint so nothing flashes
	root.classList.add("reveal-ready");

	const seen = new WeakSet<Element>();
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add("is-revealed");
				io.unobserve(entry.target);
			}
		},
		// start a little before the element is fully on screen
		{ rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
	);

	const scan = () => {
		document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
			if (seen.has(el)) return;
			seen.add(el);
			const step = Number(el.dataset.reveal) || 0;
			if (step) el.style.setProperty("--reveal-delay", `${Math.min(step, 8) * 70}ms`);
			io.observe(el);
		});
	};

	scan();
	let queued = false;
	new MutationObserver(() => {
		if (queued) return;
		queued = true;
		requestAnimationFrame(() => {
			queued = false;
			scan();
		});
	}).observe(document.body, { childList: true, subtree: true });
}
