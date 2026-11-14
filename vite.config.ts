import { defineConfig, type Plugin } from 'vite'
import fs from 'fs';
import type { IncomingMessage, ServerResponse } from 'http';
import react from '@vitejs/plugin-react'
import path from 'path';
import { pathToFileURL } from 'url';
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderedRoutes(), livePreviewApi()],
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
