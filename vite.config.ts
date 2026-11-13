import { defineConfig, type Plugin } from 'vite'
import fs from 'fs';
import react from '@vitejs/plugin-react'
import path from 'path';
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderedRoutes()],
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
