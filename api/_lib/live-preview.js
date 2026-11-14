// Finds a website's link-preview image (og:image / twitter:image) and checks that it loads.
// Shared by api/preview.js (live, cached at the edge) and scripts/prerender.mjs (build time).
// Files under api/_lib are helpers, not endpoints.

const UA = "Mozilla/5.0 (compatible; MartinJackPortfolio/1.0; +https://martin-jack.vercel.app)";
const MAX_HTML = 512 * 1024;

async function fetchWithTimeout(url, ms, init = {}) {
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), ms);
	try {
		return await fetch(url, { redirect: "follow", ...init, signal: ctrl.signal, headers: { "user-agent": UA, ...init.headers } });
	} finally {
		clearTimeout(timer);
	}
}

/** The first `max` bytes of a page as text: the <head> is all we need. */
async function readHead(res, max = MAX_HTML) {
	const reader = res.body?.getReader();
	if (!reader) return "";
	const decoder = new TextDecoder();
	let html = "";
	while (html.length < max) {
		const { done, value } = await reader.read();
		if (done) break;
		html += decoder.decode(value, { stream: true });
		if (/<\/head>/i.test(html)) break;
	}
	reader.cancel().catch(() => {});
	return html;
}

function findImage(html, pageUrl) {
	const metas = {};
	for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
		const attr = (name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
		const key = attr("property") ?? attr("name");
		const content = attr("content");
		if (!key || !content) continue;
		const k = (key[2] ?? key[3]).toLowerCase();
		if (!(k in metas)) metas[k] = content[2] ?? content[3];
	}
	const raw =
		metas["og:image:secure_url"] ?? metas["og:image"] ?? metas["og:image:url"] ?? metas["twitter:image"] ?? metas["twitter:image:src"];
	if (!raw) return null;
	try {
		const url = new URL(raw.replace(/&amp;/g, "&").trim(), pageUrl);
		return /^https?:$/.test(url.protocol) ? url.href : null;
	} catch {
		return null;
	}
}

/** True if the URL answers with an image. Only the headers are read. */
async function isImage(url, ms) {
	try {
		const res = await fetchWithTimeout(url, ms);
		res.body?.cancel().catch(() => {});
		return res.ok && (res.headers.get("content-type") ?? "").startsWith("image/");
	} catch {
		return false;
	}
}

/**
 * The live site's preview image URL, or null if it has none, is down, or the image doesn't load.
 * @param {string} siteUrl
 */
export async function livePreviewImage(siteUrl, { timeout = 6000 } = {}) {
	if (!siteUrl || !/^https?:\/\//i.test(siteUrl)) return null;
	try {
		const res = await fetchWithTimeout(siteUrl, timeout, { headers: { accept: "text/html" } });
		if (!res.ok || !(res.headers.get("content-type") ?? "").includes("html")) return null;
		const image = findImage(await readHead(res), res.url || siteUrl);
		return image && (await isImage(image, timeout)) ? image : null;
	} catch {
		return null;
	}
}
