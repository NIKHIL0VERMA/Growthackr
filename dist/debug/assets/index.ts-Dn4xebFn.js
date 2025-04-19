import { c as colorLog, L as LogTypes, M as MessageAction } from "./messages-DZkklMRP.js";
import { i as initStorage, g as getStorageSnapshot, s as setTimeSpent, c as clearStorage, u as updatePlatform, a as addPlatform, b as setPlatforms, d as updateStorage } from "./storage-BtiExJa0.js";
import { i as isValidTab, e as extractHostName } from "./utilities-C8WWmy9q.js";
const blockSite = () => {
  const existingMessage = document.getElementById("g-blocking-message");
  if (existingMessage) {
    return;
  }
  const blockingStyle = document.createElement("link");
  blockingStyle.rel = "stylesheet";
  blockingStyle.href = chrome.runtime.getURL("/styles/blocking.css");
  document.head.appendChild(blockingStyle);
  const blockingMessage = document.createElement("div");
  blockingMessage.id = "g-blocking-message";
  blockingMessage.setAttribute("role", "dialog");
  blockingMessage.setAttribute("aria-modal", "true");
  blockingMessage.setAttribute("aria-labelledby", "g-blocking-title");
  blockingMessage.setAttribute("aria-describedby", "g-blocking-description");
  const logoContainer = document.createElement("div");
  logoContainer.className = "g-logo-container";
  const logoImage = document.createElement("img");
  logoImage.src = chrome.runtime.getURL("/icons/128x128.png");
  logoImage.alt = "Growthackr logo";
  logoImage.className = "g-blocking-logo";
  logoContainer.appendChild(logoImage);
  const title = document.createElement("h1");
  title.textContent = "Time's Up!";
  title.className = "g-blocking-title";
  const message1 = document.createElement("p");
  message1.textContent = "You've reached your daily limit for this site.";
  message1.className = "g-blocking-description";
  const message2 = document.createElement("p");
  message2.textContent = "Try again tomorrow or adjust your limits in the extension settings.";
  const timeRemaining = document.createElement("div");
  timeRemaining.className = "g-time-remaining";
  const now = /* @__PURE__ */ new Date();
  const resetTime = new Date(now);
  resetTime.setHours(24, 0, 0, 0);
  const timeUntilReset = resetTime.getTime() - now.getTime();
  const hoursLeft = Math.floor(timeUntilReset / (1e3 * 60 * 60));
  const minutesLeft = Math.floor(timeUntilReset % (1e3 * 60 * 60) / (1e3 * 60));
  timeRemaining.innerHTML = `Time until reset: <span class="g-time-value">${hoursLeft}h ${minutesLeft}m</span>`;
  const quotes = [
    "Great job on managing your screen time!",
    "Take a break and do something you enjoy offline.",
    "Time away from screens is good for your wellbeing.",
    "You've made a positive choice for your digital health.",
    "Step away from the screen and into the world.",
    "Your future self will thank you for this break."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteElement = document.createElement("p");
  quoteElement.textContent = randomQuote;
  quoteElement.className = "g-quote-text";
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "g-button-container";
  const dismissButton = document.createElement("button");
  dismissButton.className = "g-dismiss-button";
  dismissButton.textContent = "Close Tab";
  dismissButton.setAttribute("aria-label", "Close this tab");
  const settingsButton = document.createElement("button");
  settingsButton.className = "g-settings-button";
  settingsButton.textContent = "Adjust Limits";
  settingsButton.setAttribute("aria-label", "Open settings to adjust time limits");
  buttonContainer.appendChild(dismissButton);
  buttonContainer.appendChild(settingsButton);
  blockingMessage.appendChild(logoContainer);
  blockingMessage.appendChild(title);
  blockingMessage.appendChild(message1);
  blockingMessage.appendChild(message2);
  blockingMessage.appendChild(timeRemaining);
  blockingMessage.appendChild(quoteElement);
  blockingMessage.appendChild(buttonContainer);
  document.body.style.overflow = "hidden";
  document.body.appendChild(blockingMessage);
  dismissButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "closeTab" });
  });
  settingsButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "openOptionsPage" });
  });
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      dismissButton.click();
      window.removeEventListener("keydown", handleKeyDown);
    }
  };
  window.addEventListener("keydown", handleKeyDown);
};
let currentDomain = null;
let trackingInterval = null;
let saveInterval = null;
const initializeTracking = async () => {
  try {
    await initStorage();
    registerListeners();
    colorLog("Tracking initialized", LogTypes.SUCCESS);
  } catch (error) {
    colorLog(`Init failed: ${error}`, LogTypes.ERROR);
  }
};
const registerListeners = () => {
  chrome.tabs.onActivated.addListener(onTabActivated);
  chrome.windows.onFocusChanged.addListener(onFocusChanged);
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active && isValidTab(tab)) {
      handleTab(tab);
    }
  });
};
const onTabActivated = async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (isValidTab(tab)) handleTab(tab);
  } catch (error) {
    colorLog(`Tab activation error: ${error}`, LogTypes.ERROR);
  }
};
const onFocusChanged = async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) return;
  try {
    const [tab] = await chrome.tabs.query({ active: true, windowId });
    if (isValidTab(tab)) handleTab(tab);
  } catch (error) {
    colorLog(`Window focus error: ${error}`, LogTypes.ERROR);
  }
};
const handleTab = (tab) => {
  currentDomain = extractHostName(tab.url);
  startTimeTracking();
  startSaveInterval();
};
const startTimeTracking = () => {
  if (trackingInterval) clearInterval(trackingInterval);
  trackingInterval = setInterval(async () => {
    var _a, _b;
    if (!currentDomain) return;
    try {
      const { platforms, timeSpent } = getStorageSnapshot();
      const platform = platforms.find((p) => p.url.toLowerCase() === currentDomain.toLowerCase());
      if (!platform) {
        stopTracking();
        colorLog("URL not allowed, skipping tracking", LogTypes.INFO);
        return;
      }
      const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
      const domainTime = timeSpent[today] ?? {};
      const currentTime = domainTime[currentDomain] ?? 0;
      domainTime[currentDomain] = currentTime + 1;
      timeSpent[today] = domainTime;
      const totalMinutes = Math.floor(currentTime / 60);
      const limitMinutes = (((_a = platform.timeLimit) == null ? void 0 : _a.hours) ?? 0) * 60 + (((_b = platform.timeLimit) == null ? void 0 : _b.minutes) ?? 0);
      if (totalMinutes >= limitMinutes) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab == null ? void 0 : tab.id) {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: blockSite
          });
          update();
          stopTracking();
        }
      }
    } catch (error) {
      colorLog(`Tracking error: ${error}`, LogTypes.ERROR);
    }
  }, 1e3);
};
const startSaveInterval = () => {
  if (saveInterval) clearInterval(saveInterval);
  saveInterval = setInterval(update, 5e3);
};
const update = async () => {
  try {
    if (!currentDomain) return;
    const { timeSpent } = getStorageSnapshot();
    await setTimeSpent({ ...timeSpent });
  } catch (error) {
    colorLog(`Save error: ${error}`, LogTypes.ERROR);
  }
};
const stopTracking = () => {
  colorLog("Stopping tracker!! Site shouldn't be tracked", LogTypes.INFO);
  if (trackingInterval) {
    clearInterval(trackingInterval);
    trackingInterval = null;
  }
  if (saveInterval) {
    clearInterval(saveInterval);
    saveInterval = null;
  }
  currentDomain = null;
};
const handleMessage = async (message) => {
  try {
    const { action } = message;
    switch (action) {
      case MessageAction.WELCOME_COMPLETED:
        return handleWelcomeCompleted();
      case MessageAction.CLOSE_TAB:
        return handleCloseTab();
      case MessageAction.OPNE_OPTIONS_PAGE:
        return handleOpenOptionsPage();
      case MessageAction.CLOSE_OPTIONS_PAGE:
        return handleCloseOptionsPage();
      case MessageAction.GET_TIME_SPENT:
        return handleGetTimeSpent();
      case MessageAction.GET_PLATFORMS:
        return handleGetPlatforms();
      case MessageAction.SET_PLATFORMS:
        return handleSetPlatforms(message);
      case MessageAction.ADD_PLATFORM:
        return handleAddPlatform(message);
      case MessageAction.UPDATE_PLATFORM:
        return handleUpdatePlatform(message);
      case MessageAction.CLEAR_STORAGE:
        return handleClearStorage();
      case MessageAction.SYNC_THEME:
        return;
      default:
        throw new Error(`Unknown message action: ${action}`);
    }
  } catch (error) {
    colorLog(`Error handling message: ${error}`, LogTypes.ERROR);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};
const handleWelcomeCompleted = async () => {
  await updateStorage({ welcome: false });
  return { success: true };
};
const handleCloseTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab == null ? void 0 : tab.id) {
    await chrome.tabs.remove(tab.id);
    return { success: true };
  }
  return { success: false, error: `Couldn't close current tab with id ${tab == null ? void 0 : tab.id}` };
};
const handleOpenOptionsPage = async () => {
  chrome.runtime.openOptionsPage();
  return { success: true };
};
const handleCloseOptionsPage = async () => {
  const [tab] = await chrome.tabs.query({ url: chrome.runtime.getURL("src/pages/options/index.html") });
  if (tab == null ? void 0 : tab.id) {
    await chrome.tabs.remove(tab.id);
    return { success: true };
  }
  return { success: false, error: "Something went wrong while closing welcome page" };
};
const handleGetTimeSpent = async () => {
  const snapshot = getStorageSnapshot();
  return { success: true, data: snapshot.timeSpent };
};
const handleGetPlatforms = async () => {
  const snapshot = getStorageSnapshot();
  return { success: true, data: snapshot.platforms };
};
const handleSetPlatforms = async (message) => {
  await setPlatforms(message.platforms);
  return { success: true };
};
const handleAddPlatform = async (message) => {
  if (message.platforms) {
    for (const platform of message.platforms) {
      await addPlatform(platform);
    }
    return { success: true };
  } else if (message.platform) {
    await addPlatform(message.platform);
    return { success: true };
  }
  throw new Error("Platform data missing from message");
};
const handleUpdatePlatform = async (message) => {
  if ("platform" in message) {
    await updatePlatform(message.platform);
    return { success: true };
  }
  throw new Error("Platform data missing from message");
};
const handleClearStorage = async () => {
  await clearStorage();
  return { success: true };
};
colorLog("Starting background script", LogTypes.INFO);
self.onerror = (err) => {
  colorLog("Unhandled error: " + err, LogTypes.ERROR);
};
const initializeServices = async () => {
  try {
    await Promise.all([initStorage(), initializeTracking()]);
    colorLog("All services initialized successfully", LogTypes.SUCCESS);
  } catch (error) {
    colorLog(`Failed to initialize services: ${error}`, LogTypes.ERROR);
  }
};
initializeServices();
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message).then(sendResponse).catch((error) => {
    colorLog(`Error handling message: ${error}`, LogTypes.ERROR);
    sendResponse({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    });
  });
  return true;
});
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    colorLog("Extension is installed", LogTypes.INFO);
    await updateStorage({
      timeSpent: {},
      platforms: [],
      welcome: true
    });
    chrome.runtime.openOptionsPage();
  }
  if (details.reason === "update" && !details.previousVersion) {
    colorLog("Extension is updated", LogTypes.SUCCESS);
  }
});
chrome.runtime.onStartup.addListener(() => {
  colorLog("Extension started", LogTypes.INFO);
});
chrome.windows.onFocusChanged.addListener(() => {
  colorLog("Window focus changed", LogTypes.INFO);
});
//# sourceMappingURL=index.ts-Dn4xebFn.js.map
