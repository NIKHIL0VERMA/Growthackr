import { crx } from "@crxjs/vite-plugin";
import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import manifest from "./src/manifest";

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const stylesDir = resolve(root, "styles");
const outDirDev = resolve(__dirname, "dist", "debug");
const outDirRelease = resolve(__dirname, "dist", "release");
const publicDir = resolve(__dirname, "public");
const utilsDir = resolve(__dirname, "utils");

const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  plugins: [solidPlugin(), crx({ manifest })],
  resolve: {
    alias: {
      "@src": root,
      "@styles": stylesDir,
      "@pages": pagesDir,
      "@utils": utilsDir,
    },
  },
  publicDir,
  build: {
    outDir: isDev ? outDirDev : outDirRelease,
    sourcemap: isDev,
    minify: isDev ? false : true,
    rollupOptions: {
      // input: {
      //   devtools: resolve(pagesDir, "devtools", "index.html"),
      //   panel: resolve(pagesDir, "panel", "index.html"),
      //   content: resolve(pagesDir, "content", "index.ts"),
      //   background: resolve(pagesDir, "background", "index.ts"),
      //   contentStyle: resolve(pagesDir, "content", "style.scss"),
      //   popup: resolve(pagesDir, "popup", "index.html"),
      //   newtab: resolve(pagesDir, "newtab", "index.html"),
      //   options: resolve(pagesDir, "options", "index.html"),
      // },
      // output: {
      //   entryFileNames: "src/pages/[name]/index.js",
      //   chunkFileNames: isDev
      //     ? "assets/js/[name].js"
      //     : "assets/js/[name].[hash].js",
      //   assetFileNames: (assetInfo) => {
      //     const { dir, name: _name } = path.parse(assetInfo.name);
      //     // const assetFolder = getLastElement(dir.split("/"));
      //     // const name = assetFolder + firstUpperCase(_name);
      //     return `assets/[ext]/${name}.chunk.[ext]`;
      //   },
      // },
    },
  },
});
