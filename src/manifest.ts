import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

const [major, minor, patch, label = "0"] = packageJson.version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: packageJson.displayName ?? packageJson.name,
  version: `${major}.${minor}.${patch}.${label}`,
  description: packageJson.description,
  background: { service_worker: "src/pages/background/index.ts" },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icons/34x34.png",
    default_title: packageJson.displayName ?? packageJson.name,
  },
  permissions : [
    "storage",
    "tabs",
    "webNavigation"
  ],
  host_permissions : [
    "https://*.facebook.com/*",
    "https://*.youtube.com/*",
    "https://*.instagram.com/*",
  ],
  icons: {
    "16": "icons/16x16.png",
    "34": "icons/34x34.png",
    "48": "icons/48x48.png",
    "128": "icons/128x128.png",
    "192": "icons/192x192.png",
    "512": "icons/512x512.png"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.tsx"],
    },
  ],
  
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "assets/img/*"],
      matches: ["<all_urls>"],
    },
  ],
}));

export default manifest;
