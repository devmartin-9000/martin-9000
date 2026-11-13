// GitHub sign-in for the admin portal (/admin), step 1 of 2.
// Sends the browser to GitHub's own login page. The client secret never leaves the server.
// Needs GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Vercel → Settings → Environment Variables.
import { randomBytes } from "node:crypto";

export default function handler(req, res) {
	const clientId = process.env.GITHUB_CLIENT_ID;
	if (!clientId) {
		res.status(500).send("GITHUB_CLIENT_ID is not set in the Vercel environment variables.");
		return;
	}

	const host = req.headers["x-forwarded-host"] ?? req.headers.host;
	const state = randomBytes(16).toString("hex");

	const url = new URL("https://github.com/login/oauth/authorize");
	url.searchParams.set("client_id", clientId);
	url.searchParams.set("redirect_uri", `https://${host}/api/callback`);
	// write access to public repos, which is all the CMS needs to commit content
	url.searchParams.set("scope", "public_repo");
	url.searchParams.set("state", state);

	// checked in the callback to make sure the response belongs to this sign-in
	res.setHeader("Set-Cookie", `cms_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
	res.redirect(302, url.toString());
}
