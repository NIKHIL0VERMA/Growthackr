// vite.config.ts
import { crx } from "file:///home/nikhil/Desktop/Projects/Growthackr/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///home/nikhil/Desktop/Projects/Growthackr/node_modules/vite/dist/node/index.js";
import solidPlugin from "file:///home/nikhil/Desktop/Projects/Growthackr/node_modules/vite-plugin-solid/dist/esm/index.mjs";

// src/manifest.ts
import { defineManifest } from "file:///home/nikhil/Desktop/Projects/Growthackr/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "growthackr",
  displayName: "Growthackr",
  version: "1.0.0",
  description: "Take control of your time and start being productive. Track social media usage and develop good habits",
  license: "MIT",
  author: {
    name: "Nikhil Verma",
    email: "nikhil2003verma@gmail.com"
  },
  scripts: {
    lint: "eslint . --fix -c .eslintrc --ext js,ts --ignore-pattern='!.*'",
    dev: "vite build -w --mode development",
    build: "NODE_ENV=production tsc --noEmit && vite build",
    test: "jest"
  },
  repository: {
    type: "git",
    url: "https://github.com/NIKHIL0VERMA/Growthackr.git"
  },
  type: "module",
  dependencies: {
    "@fortawesome/fontawesome-free": "^6.7.2",
    "@fortawesome/fontawesome-svg-core": "^6.7.2",
    "@fortawesome/free-brands-svg-icons": "^6.7.2",
    "@fortawesome/free-solid-svg-icons": "^6.7.2",
    "@fortawesome/react-fontawesome": "^0.2.2",
    "solid-js": "^1.6.2"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "2.0.0-beta.7",
    "@types/chrome": "0.0.203",
    "@types/jest": "^29.2.3",
    "@types/node": "18.11.10",
    "@typescript-eslint/eslint-plugin": "5.45.0",
    "@typescript-eslint/parser": "5.45.0",
    autoprefixer: "^10.4.13",
    "babel-preset-solid": "^1.6.2",
    eslint: "8.29.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-jsx-a11y": "6.6.1",
    "eslint-plugin-solid": "^0.9.1",
    "fs-extra": "11.1.0",
    jest: "^29.3.1",
    "jest-environment-jsdom": "^29.3.1",
    "ts-jest": "^29.0.3",
    "ts-loader": "9.4.2",
    "ts-node": "10.9.1",
    typescript: "4.9.3",
    vite: "3.2.4",
    "vite-plugin-solid": "^2.4.0"
  }
};

// src/manifest.ts
var [major, minor, patch, label = "0"] = package_default.version.replace(/[^\d.-]+/g, "").split(/[.-]/);
var manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: package_default.displayName ?? package_default.name,
  version: `${major}.${minor}.${patch}.${label}`,
  description: package_default.description,
  options_page: "src/pages/options/index.html",
  background: { service_worker: "src/pages/background/index.ts" },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icons/34x34.png",
    default_title: package_default.displayName ?? package_default.name
  },
  content_security_policy: {
    "extension_pages": "script-src 'self'; object-src 'self';"
  },
  permissions: [
    "storage",
    "tabs",
    "scripting",
    "activeTab",
    "unlimitedStorage",
    "webNavigation"
  ],
  host_permissions: ["<all_urls>"],
  icons: {
    "16": "icons/16x16.png",
    "34": "icons/34x34.png",
    "48": "icons/48x48.png",
    "128": "icons/128x128.png",
    "192": "icons/192x192.png",
    "512": "icons/512x512.png"
  },
  web_accessible_resources: [
    {
      resources: ["assets/*.js", "assets/*.css", "icons/*", "styles/*"],
      matches: ["*://*/*"]
    }
  ]
}));
var manifest_default = manifest;

// vite.config.ts
var __vite_injected_original_dirname = "/home/nikhil/Desktop/Projects/Growthackr";
var root = resolve(__vite_injected_original_dirname, "src");
var pagesDir = resolve(root, "pages");
var assetsDir = resolve(root, "assets");
var outDir = resolve(__vite_injected_original_dirname, "dist");
var publicDir = resolve(__vite_injected_original_dirname, "public");
var utilsDir = resolve(__vite_injected_original_dirname, "utils");
var isDev = process.env.NODE_ENV === "development";
var vite_config_default = defineConfig({
  plugins: [solidPlugin(), crx({ manifest: manifest_default })],
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir,
      "@utils": utilsDir
    }
  },
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    minify: isDev ? false : true,
    rollupOptions: {}
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbmlraGlsL0Rlc2t0b3AvUHJvamVjdHMvR3Jvd3RoYWNrclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbmlraGlsL0Rlc2t0b3AvUHJvamVjdHMvR3Jvd3RoYWNrci92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9uaWtoaWwvRGVza3RvcC9Qcm9qZWN0cy9Hcm93dGhhY2tyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgY3J4IH0gZnJvbSBcIkBjcnhqcy92aXRlLXBsdWdpblwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHNvbGlkUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1zb2xpZFwiO1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gXCIuL3NyYy9tYW5pZmVzdFwiO1xuXG5jb25zdCByb290ID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpO1xuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsIFwicGFnZXNcIik7XG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsIFwiYXNzZXRzXCIpO1xuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwiZGlzdFwiKTtcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcInB1YmxpY1wiKTtcbmNvbnN0IHV0aWxzRGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwidXRpbHNcIik7XG5cbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3NvbGlkUGx1Z2luKCksIGNyeCh7IG1hbmlmZXN0IH0pXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBzcmNcIjogcm9vdCxcbiAgICAgIFwiQGFzc2V0c1wiOiBhc3NldHNEaXIsXG4gICAgICBcIkBwYWdlc1wiOiBwYWdlc0RpcixcbiAgICAgIFwiQHV0aWxzXCI6IHV0aWxzRGlyLFxuICAgIH0sXG4gIH0sXG4gIHB1YmxpY0RpcixcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXIsXG4gICAgc291cmNlbWFwOiBpc0RldixcbiAgICBtaW5pZnk6IGlzRGV2ID8gZmFsc2U6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gaW5wdXQ6IHtcbiAgICAgIC8vICAgZGV2dG9vbHM6IHJlc29sdmUocGFnZXNEaXIsIFwiZGV2dG9vbHNcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgLy8gICBwYW5lbDogcmVzb2x2ZShwYWdlc0RpciwgXCJwYW5lbFwiLCBcImluZGV4Lmh0bWxcIiksXG4gICAgICAvLyAgIGNvbnRlbnQ6IHJlc29sdmUocGFnZXNEaXIsIFwiY29udGVudFwiLCBcImluZGV4LnRzXCIpLFxuICAgICAgLy8gICBiYWNrZ3JvdW5kOiByZXNvbHZlKHBhZ2VzRGlyLCBcImJhY2tncm91bmRcIiwgXCJpbmRleC50c1wiKSxcbiAgICAgIC8vICAgY29udGVudFN0eWxlOiByZXNvbHZlKHBhZ2VzRGlyLCBcImNvbnRlbnRcIiwgXCJzdHlsZS5zY3NzXCIpLFxuICAgICAgLy8gICBwb3B1cDogcmVzb2x2ZShwYWdlc0RpciwgXCJwb3B1cFwiLCBcImluZGV4Lmh0bWxcIiksXG4gICAgICAvLyAgIG5ld3RhYjogcmVzb2x2ZShwYWdlc0RpciwgXCJuZXd0YWJcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgLy8gICBvcHRpb25zOiByZXNvbHZlKHBhZ2VzRGlyLCBcIm9wdGlvbnNcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgLy8gfSxcbiAgICAgIC8vIG91dHB1dDoge1xuICAgICAgLy8gICBlbnRyeUZpbGVOYW1lczogXCJzcmMvcGFnZXMvW25hbWVdL2luZGV4LmpzXCIsXG4gICAgICAvLyAgIGNodW5rRmlsZU5hbWVzOiBpc0RldlxuICAgICAgLy8gICAgID8gXCJhc3NldHMvanMvW25hbWVdLmpzXCJcbiAgICAgIC8vICAgICA6IFwiYXNzZXRzL2pzL1tuYW1lXS5baGFzaF0uanNcIixcbiAgICAgIC8vICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcbiAgICAgIC8vICAgICBjb25zdCB7IGRpciwgbmFtZTogX25hbWUgfSA9IHBhdGgucGFyc2UoYXNzZXRJbmZvLm5hbWUpO1xuICAgICAgLy8gICAgIC8vIGNvbnN0IGFzc2V0Rm9sZGVyID0gZ2V0TGFzdEVsZW1lbnQoZGlyLnNwbGl0KFwiL1wiKSk7XG4gICAgICAvLyAgICAgLy8gY29uc3QgbmFtZSA9IGFzc2V0Rm9sZGVyICsgZmlyc3RVcHBlckNhc2UoX25hbWUpO1xuICAgICAgLy8gICAgIHJldHVybiBgYXNzZXRzL1tleHRdLyR7bmFtZX0uY2h1bmsuW2V4dF1gO1xuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL25pa2hpbC9EZXNrdG9wL1Byb2plY3RzL0dyb3d0aGFja3Ivc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9uaWtoaWwvRGVza3RvcC9Qcm9qZWN0cy9Hcm93dGhhY2tyL3NyYy9tYW5pZmVzdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9uaWtoaWwvRGVza3RvcC9Qcm9qZWN0cy9Hcm93dGhhY2tyL3NyYy9tYW5pZmVzdC50c1wiO2ltcG9ydCB7IGRlZmluZU1hbmlmZXN0IH0gZnJvbSBcIkBjcnhqcy92aXRlLXBsdWdpblwiO1xuaW1wb3J0IHBhY2thZ2VKc29uIGZyb20gXCIuLi9wYWNrYWdlLmpzb25cIjtcblxuY29uc3QgW21ham9yLCBtaW5vciwgcGF0Y2gsIGxhYmVsID0gXCIwXCJdID0gcGFja2FnZUpzb24udmVyc2lvblxuICAucmVwbGFjZSgvW15cXGQuLV0rL2csIFwiXCIpXG4gIC5zcGxpdCgvWy4tXS8pO1xuXG5jb25zdCBtYW5pZmVzdCA9IGRlZmluZU1hbmlmZXN0KGFzeW5jICgpID0+ICh7XG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIG5hbWU6IHBhY2thZ2VKc29uLmRpc3BsYXlOYW1lID8/IHBhY2thZ2VKc29uLm5hbWUsXG4gIHZlcnNpb246IGAke21ham9yfS4ke21pbm9yfS4ke3BhdGNofS4ke2xhYmVsfWAsXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlSnNvbi5kZXNjcmlwdGlvbixcbiAgb3B0aW9uc19wYWdlOiBcInNyYy9wYWdlcy9vcHRpb25zL2luZGV4Lmh0bWxcIixcbiAgYmFja2dyb3VuZDogeyBzZXJ2aWNlX3dvcmtlcjogXCJzcmMvcGFnZXMvYmFja2dyb3VuZC9pbmRleC50c1wiIH0sXG4gIGFjdGlvbjoge1xuICAgIGRlZmF1bHRfcG9wdXA6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIixcbiAgICBkZWZhdWx0X2ljb246IFwiaWNvbnMvMzR4MzQucG5nXCIsXG4gICAgZGVmYXVsdF90aXRsZTogcGFja2FnZUpzb24uZGlzcGxheU5hbWUgPz8gcGFja2FnZUpzb24ubmFtZSxcbiAgfSxcbiAgY29udGVudF9zZWN1cml0eV9wb2xpY3k6IHtcbiAgICBcImV4dGVuc2lvbl9wYWdlc1wiIDogXCJzY3JpcHQtc3JjICdzZWxmJzsgb2JqZWN0LXNyYyAnc2VsZic7XCIsXG4gIH0sXG4gIHBlcm1pc3Npb25zIDogW1xuICAgIFwic3RvcmFnZVwiLFxuICAgIFwidGFic1wiLFxuICAgIFwic2NyaXB0aW5nXCIsXG4gICAgXCJhY3RpdmVUYWJcIixcbiAgICBcInVubGltaXRlZFN0b3JhZ2VcIixcbiAgICBcIndlYk5hdmlnYXRpb25cIlxuICBdLFxuICBob3N0X3Blcm1pc3Npb25zIDogW1wiPGFsbF91cmxzPlwiXSxcbiAgaWNvbnM6IHtcbiAgICBcIjE2XCI6IFwiaWNvbnMvMTZ4MTYucG5nXCIsXG4gICAgXCIzNFwiOiBcImljb25zLzM0eDM0LnBuZ1wiLFxuICAgIFwiNDhcIjogXCJpY29ucy80OHg0OC5wbmdcIixcbiAgICBcIjEyOFwiOiBcImljb25zLzEyOHgxMjgucG5nXCIsXG4gICAgXCIxOTJcIjogXCJpY29ucy8xOTJ4MTkyLnBuZ1wiLFxuICAgIFwiNTEyXCI6IFwiaWNvbnMvNTEyeDUxMi5wbmdcIlxuICB9LFxuICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcbiAgICB7XG4gICAgICByZXNvdXJjZXM6IFtcImFzc2V0cy8qLmpzXCIsIFwiYXNzZXRzLyouY3NzXCIsIFwiaWNvbnMvKlwiLCBcInN0eWxlcy8qXCJdLFxuICAgICAgbWF0Y2hlczogW1wiKjovLyovKlwiXSxcbiAgICB9LFxuICBdLFxufSkpO1xuXG5leHBvcnQgZGVmYXVsdCBtYW5pZmVzdDtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFMsU0FBUyxXQUFXO0FBQzlULFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGlCQUFpQjs7O0FDSHdSLFNBQVMsc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRy9VLElBQU0sQ0FBQyxPQUFPLE9BQU8sT0FBTyxRQUFRLEdBQUcsSUFBSSxnQkFBWSxRQUNwRCxRQUFRLGFBQWEsRUFBRSxFQUN2QixNQUFNLE1BQU07QUFFZixJQUFNLFdBQVcsZUFBZSxhQUFhO0FBQUEsRUFDM0Msa0JBQWtCO0FBQUEsRUFDbEIsTUFBTSxnQkFBWSxlQUFlLGdCQUFZO0FBQUEsRUFDN0MsU0FBUyxHQUFHLFNBQVMsU0FBUyxTQUFTO0FBQUEsRUFDdkMsYUFBYSxnQkFBWTtBQUFBLEVBQ3pCLGNBQWM7QUFBQSxFQUNkLFlBQVksRUFBRSxnQkFBZ0IsZ0NBQWdDO0FBQUEsRUFDOUQsUUFBUTtBQUFBLElBQ04sZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2QsZUFBZSxnQkFBWSxlQUFlLGdCQUFZO0FBQUEsRUFDeEQ7QUFBQSxFQUNBLHlCQUF5QjtBQUFBLElBQ3ZCLG1CQUFvQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxhQUFjO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0Esa0JBQW1CLENBQUMsWUFBWTtBQUFBLEVBQ2hDLE9BQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLE9BQU87QUFBQSxJQUNQLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSwwQkFBMEI7QUFBQSxJQUN4QjtBQUFBLE1BQ0UsV0FBVyxDQUFDLGVBQWUsZ0JBQWdCLFdBQVcsVUFBVTtBQUFBLE1BQ2hFLFNBQVMsQ0FBQyxTQUFTO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBQ0YsRUFBRTtBQUVGLElBQU8sbUJBQVE7OztBRC9DZixJQUFNLG1DQUFtQztBQU16QyxJQUFNLE9BQU8sUUFBUSxrQ0FBVyxLQUFLO0FBQ3JDLElBQU0sV0FBVyxRQUFRLE1BQU0sT0FBTztBQUN0QyxJQUFNLFlBQVksUUFBUSxNQUFNLFFBQVE7QUFDeEMsSUFBTSxTQUFTLFFBQVEsa0NBQVcsTUFBTTtBQUN4QyxJQUFNLFlBQVksUUFBUSxrQ0FBVyxRQUFRO0FBQzdDLElBQU0sV0FBVyxRQUFRLGtDQUFXLE9BQU87QUFFM0MsSUFBTSxRQUFRLFFBQVEsSUFBSSxhQUFhO0FBRXZDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxFQUFFLDJCQUFTLENBQUMsQ0FBQztBQUFBLEVBQzFDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxRQUFRLFFBQVEsUUFBTztBQUFBLElBQ3ZCLGVBQWUsQ0F1QmY7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
