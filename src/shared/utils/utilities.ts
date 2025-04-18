/**
 * Determines if a given tab is valid for processing.
 * A tab is considered valid if it has a non-empty URL and a valid ID, 
 * and its URL does not start with 'chrome://', 'chrome-extension://', or 'brave://'.
 * 
 * @param {chrome.tabs.Tab | undefined} tab - The tab to validate. Think of it as the bouncer at the club, checking IDs.
 * @returns {boolean} - Returns true if the tab is valid; otherwise, false. Agar valid nahi hai, toh bye-bye!
 */
export const isValidTab = (tab: chrome.tabs.Tab | undefined): boolean => {
  if (!tab || !tab.url || !tab.id) return false;
  
  if (
    (!tab.url.startsWith('http:') &&
      !tab.url.startsWith('https:') ||
      tab.url.startsWith('file:///')) ||
      tab.url.startsWith('chrome://') ||
      tab.url.startsWith('chrome-extension://') ||
      tab.url.startsWith('brave://')
  )
    return false;
  return true;
};

/**
 * Extracts the hostname from a given URL.
 * If the URL is undefined or starts with 'file:', it returns the URL as is.
 * Otherwise, it extracts the hostname by splitting the URL and removing any 'www.' prefix.
 * 
 * @param {string | undefined} url - The URL from which to extract the hostname. It's like fishing for the main catch!
 * @returns {string} - The extracted hostname. Agar kuch nahi mila, toh khud ko mat blame karo!
 */
export const extractHostName = (url: string | undefined): string => {
  if (!url) return '';
  
  if (url.startsWith('file:')) {
    return url;
  }
  
  let hostname = url.indexOf('//') > -1 ? url.split('/')[2] : url.split('/')[0];
  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];
  
  if (hostname.startsWith('www.')) {
    hostname = hostname.substring(4);
  }
      
  return hostname;
};
  
/**
 * Removes the top-level domain (TLD) from a given hostname.
 * If the hostname has more than one part separated by a dot, it removes the last part.
 * 
 * @param {string | undefined} hostname - The hostname from which to remove the TLD. It's like a haircut for your domain!
 * @returns {string} - The hostname with the TLD removed. No more 'com' or 'net' on your head!
 */
export const removeTLD = (hostname: string | undefined): string => {
  if (!hostname) return '';
  const parts = hostname.split('.');
  if (parts.length > 1) {
    parts.pop();
  }
  const capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
  return capitalizedParts.join('.');
};

/**
 * Validates if the provided URL is a valid web page URL (http or https).
 * 
 * @param {string} url - The URL to be validated. It's like checking if your friend is actually at the party!
 * @returns {boolean} - Returns true if the URL is valid, false otherwise. If not valid, they're definitely not on the guest list!
 */
export const validateUrl = (url: string | undefined): boolean => {
  if (!url) return false;

  let testUrl = url.trim();

  if (!testUrl.match(/^https?:\/\//i)) {
    testUrl = "http://" + testUrl;
  }

  try {
    const parsedUrl = new URL(testUrl);
    const validProtocols = ['http:', 'https:'];
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
}