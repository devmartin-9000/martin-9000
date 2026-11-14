// GET /api/preview?id=<project>
// Redirects to the project's current link-preview image, read live from its own site, so the
// portfolio thumbnail updates whenever that site changes its preview. Cached at Vercel's edge
// for 6 hours and refreshed in the background. Falls back to the thumbnail set in /admin, then
// to the generated card. Only projects in src/content/projects can be looked up.
import fs from "node:fs";
import path from "node:path";
import { livePreviewImage } from "./_lib/live-preview.js";

export default async function handler(req, res) {
	const id = String(req.query.id ?? "");
	if (!/^[a-z0-9-]+$/.test(id)) {
		res.status(400).send("Unknown project");
		return;
	}

	let project;
	try {
		project = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/content/projects", `${id}.json`), "utf8"));
	} catch {
		res.status(404).send("Unknown project");
		return;
	}

	const live = await livePreviewImage(project.url);
	const target = live || project.thumbnail || `/og/projects/${id}.png`;

	// a live image is cached longer; a fallback is retried sooner in case the site comes back
	res.setHeader(
		"Cache-Control",
		live
			? "public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400"
			: "public, max-age=600, s-maxage=1800, stale-while-revalidate=86400"
	);
	res.redirect(302, target);
}
