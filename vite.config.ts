import { defineConfig, type Plugin } from 'vite'
import fs from 'fs';
import type { IncomingMessage, ServerResponse } from 'http';
import react from '@vitejs/plugin-react'
import path from 'path';
import { pathToFileURL } from 'url';
import type { AtRule, Plugin as PostcssPlugin } from 'postcss';
import tailwindcss from '@tailwindcss/vite';

/**
 * `vite preview` only: serve the pre-rendered /yap/<id>/index.html (from scripts/prerender.mjs)
 * for /yap/<id>, mirroring the rewrites in vercel.json, so link previews can be checked locally.
 */
const prerenderedRoutes = (): Plugin => ({
  name: "prerendered-routes",
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      const url = (req.url ?? "").split("?")[0];
      if (/^\/(yap|projects)(\/[^/.]+)?\/?$/.test(url)) {
        const file = path.join("dist", url, "index.html");
        if (fs.existsSync(file)) req.url = url.replace(/\/?$/, "/index.html");
      }
      next();
    });
  },
});

/**
 * Runs the Vercel function api/preview.js locally (dev and preview servers), so project
 * thumbnails come from the live sites here too, exactly as in production.
 */
const livePreviewApi = (): Plugin => {
  const middleware = async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (!req.url?.startsWith("/api/preview")) return next();
    // absolute file URL: Vite bundles this config into a temp folder, so relative paths would break
    const fnUrl = pathToFileURL(path.resolve(__dirname, "api/preview.js")).href;
    const { default: handler } = (await import(/* @vite-ignore */ fnUrl)) as {
      default: (req: { query: Record<string, string> }, res: object) => Promise<void>;
    };
    const query = Object.fromEntries(new URL(req.url, "http://localhost").searchParams);
    // the small slice of Vercel's req/res helpers that the function uses
    const vres = {
      status(code: number) { res.statusCode = code; return vres; },
      send(body: string) { res.end(body); },
      setHeader(k: string, v: string) { res.setHeader(k, v); },
      redirect(code: number, location: string) { res.writeHead(code, { Location: location }).end(); },
    };
    await handler({ query }, vres);
  };
  return {
    name: "live-preview-api",
    configureServer: (server) => { server.middlewares.use(middleware); },
    configurePreviewServer: (server) => { server.middlewares.use(middleware); },
  };
};

/**
 * Tailwind v4 composes rings, shadows, gradients and transforms from --tw-* variables whose
 * defaults come from @property. For browsers without it, Tailwind ships the same defaults in
 * `@layer properties`, but gated behind an @supports test that only old Safari and Firefox
 * pass. Older Chromium engines fail it, so a ring's box-shadow references an undefined variable,
 * becomes invalid and the outline vanishes (badges, chips, card edges), and gradients fail too.
 * This drops the gate so every browser gets the defaults. They stay in Tailwind's lowest layer
 * and equal the @property initial values, so modern browsers render exactly as before.
 *
 * It runs as a PostCSS step inside Vite's CSS pipeline, i.e. before the stylesheet is hashed,
 * so the file name changes with the content. (Editing the file after hashing would keep the
 * old name, and browsers holding the long-cached old file would never fetch the fix.)
 */
const ungatePropertyDefaults: PostcssPlugin = {
  postcssPlugin: "ungate-tailwind-property-defaults",
  AtRule: {
    supports(rule) {
      const parent = rule.parent;
      if (parent?.type === "atrule" && (parent as AtRule).name === "layer" && (parent as AtRule).params === "properties") {
        rule.replaceWith(rule.nodes ?? []);
      }
    },
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderedRoutes(), livePreviewApi()],
  css: {
    postcss: { plugins: [ungatePropertyDefaults] },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Supported baseline: Chrome 101. Newer JS/CSS syntax is lowered to run there.
  build: {
    target: "chrome101",
    cssTarget: "chrome101",
  },
});
