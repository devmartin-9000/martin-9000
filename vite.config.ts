import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
