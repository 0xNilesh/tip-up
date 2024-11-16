import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import rollupNodePolyfills from "rollup-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: "empty-module",
      "@": path.resolve(__dirname, "./src"),
      common: path.resolve(__dirname, "src/common"),
      blocks: path.resolve(__dirname, "src/blocks"),
      modules: path.resolve(__dirname, "src/modules"),
      pages: path.resolve(__dirname, "src/pages"),
      structure: path.resolve(__dirname, "src/structure"),
      config: path.resolve(__dirname, "src/config"),
      global: "global-this", // Polyfill global to `globalThis`
      "node-fetch": "cross-fetch",
    },
  },
  define: {
    global: "window",
  },
  build: {
    target: "esnext",
    rollupOptions: {
      plugins: [rollupNodePolyfills()],
    },
  },
});
