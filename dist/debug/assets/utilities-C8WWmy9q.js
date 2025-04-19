const isValidTab = (tab) => {
  if (!tab || !tab.url || !tab.id) return false;
  if (!tab.url.startsWith("http:") && !tab.url.startsWith("https:") || tab.url.startsWith("file:///") || tab.url.startsWith("chrome://") || tab.url.startsWith("chrome-extension://") || tab.url.startsWith("brave://"))
    return false;
  return true;
};
const extractHostName = (url) => {
  if (!url) return "";
  if (url.startsWith("file:")) {
    return url;
  }
  let hostname = url.indexOf("//") > -1 ? url.split("/")[2] : url.split("/")[0];
  hostname = hostname.split(":")[0];
  hostname = hostname.split("?")[0];
  if (hostname.startsWith("www.")) {
    hostname = hostname.substring(4);
  }
  return hostname;
};
const removeTLD = (hostname) => {
  if (!hostname) return "";
  const parts = hostname.split(".");
  if (parts.length > 1) {
    parts.pop();
  }
  const capitalizedParts = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
  return capitalizedParts.join(".");
};
const validateUrl = (url) => {
  if (!url) return false;
  let testUrl = url.trim();
  if (!testUrl.match(/^https?:\/\//i)) {
    testUrl = "http://" + testUrl;
  }
  try {
    const parsedUrl = new URL(testUrl);
    const validProtocols = ["http:", "https:"];
    if (!validProtocols.includes(parsedUrl.protocol)) {
      return false;
    }
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (!domainRegex.test(parsedUrl.hostname)) {
      return false;
    }
    if (/[\s<>]/.test(testUrl)) {
      return false;
    }
    return true;
  } catch (_) {
    return false;
  }
};
export {
  extractHostName as e,
  isValidTab as i,
  removeTLD as r,
  validateUrl as v
};
//# sourceMappingURL=utilities-C8WWmy9q.js.map
