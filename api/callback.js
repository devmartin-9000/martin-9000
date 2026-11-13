// GitHub sign-in for the admin portal (/admin), step 2 of 2.
// GitHub sends the user back here with a one-time code; we swap it for an access token
// and hand the token to the admin window using the Decap/Sveltia CMS postMessage handshake.

const readCookie = (header = "", name) =>
	header
		.split(";")
		.map((c) => c.trim().split("="))
		.find(([k]) => k === name)?.[1];

/** Popup page that passes the result back to the /admin window, only on this site's origin. */
const page = (origin, status, payload) => `<!doctype html>
<html><body><p>${status === "success" ? "Signed in. You can close this window." : "Sign-in failed. You can close this window."}</p>
<script>
(function () {
	var origin = ${JSON.stringify(origin)};
	var message = "authorization:github:${status}:" + ${JSON.stringify(JSON.stringify(payload))};
	function receive(e) {
		if (e.origin !== origin) return;
		window.opener.postMessage(message, origin);
		window.removeEventListener("message", receive);
	}
	window.addEventListener("message", receive);
	window.opener && window.opener.postMessage("authorizing:github", origin);
})();
</script></body></html>`;

export default async function handler(req, res) {
	const host = req.headers["x-forwarded-host"] ?? req.headers.host;
	const origin = `https://${host}`;
	const { code, state } = req.query;

	res.setHeader("Content-Type", "text/html; charset=utf-8");
	res.setHeader("Cache-Control", "no-store");
	// the state cookie has done its job either way
	res.setHeader("Set-Cookie", "cms_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0");

	const expected = readCookie(req.headers.cookie, "cms_oauth_state");
	if (!code || !state || state !== expected) {
		res.status(400).send(page(origin, "error", { message: "Sign-in expired or was tampered with. Please try again." }));
		return;
	}

	try {
		const response = await fetch("https://github.com/login/oauth/access_token", {
			method: "POST",
			headers: { Accept: "application/json", "Content-Type": "application/json" },
			body: JSON.stringify({
				client_id: process.env.GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code,
				redirect_uri: `${origin}/api/callback`,
			}),
		});
		const data = await response.json();
		if (!data.access_token) {
			throw new Error(data.error_description || data.error || "No access token returned");
		}
		res.status(200).send(page(origin, "success", { token: data.access_token, provider: "github" }));
	} catch (err) {
		res.status(500).send(page(origin, "error", { message: String(err.message ?? err) }));
	}
}
