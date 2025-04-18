import { colorLog, LogTypes } from "@src/shared/utils/logger";
import { extractHostName, isValidPage } from "@src/shared/utils/utilities";
import { blockSite } from "@pages/blocking";
import { getStorageSnapshot, initStorage, setTimeSpent } from "./storage";

let currentDomain: string | null = null;
let trackingInterval: ReturnType<typeof setInterval> | null = null;
let saveInterval: ReturnType<typeof setInterval> | null = null;

export const initializeTracking = async () => {
  try {
    await initStorage();
    registerListeners();
    colorLog("Tracking initialized", LogTypes.SUCCESS);
  } catch (error) {
    colorLog(`Init failed: ${error}`, LogTypes.ERROR);
  }
};

const registerListeners = (): void => {
  chrome.tabs.onActivated.addListener(onTabActivated);
  chrome.windows.onFocusChanged.addListener(onFocusChanged);
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active && isValidPage(tab)) {
      handleTab(tab);
    }
  });
};

const onTabActivated = async (activeInfo: chrome.tabs.TabActiveInfo): Promise<void> => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (isValidPage(tab)) handleTab(tab);
  } catch (error) {
    colorLog(`Tab activation error: ${error}`, LogTypes.ERROR);
  }
};

const onFocusChanged = async (windowId: number): Promise<void> => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) return;
  try {
    const [tab] = await chrome.tabs.query({ active: true, windowId });
    if (isValidPage(tab)) handleTab(tab);
  } catch (error) {
    colorLog(`Window focus error: ${error}`, LogTypes.ERROR);
  }
};

const handleTab = (tab: chrome.tabs.Tab): void => {
  currentDomain = extractHostName(tab.url);
  startTimeTracking();
  startSaveInterval();
};

const startTimeTracking = (): void => {
  if (trackingInterval) clearInterval(trackingInterval);

  trackingInterval = setInterval(async () => {
    if (!currentDomain) return;

    try {
      const {platforms, timeSpent} = getStorageSnapshot();
      const platform = platforms.find(p => p.url.toLowerCase() === currentDomain.toLowerCase());

      if (!platform) {
        stopTracking();
        colorLog("URL not allowed, skipping tracking", LogTypes.INFO);
        return;
      }

      const today = new Date().toLocaleDateString('en-CA');
      const domainTime = timeSpent[today] ?? {};
      const currentTime = domainTime[currentDomain] ?? 0;

      domainTime[currentDomain] = currentTime + 1;
      timeSpent[today] = domainTime;

      const totalMinutes = Math.floor(currentTime / 60);
      const limitMinutes = (platform.timeLimit?.hours ?? 0) * 60 + (platform.timeLimit?.minutes ?? 0);

      if (totalMinutes >= limitMinutes) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
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
  }, 1000);
};

const startSaveInterval = (): void => {
  if (saveInterval) clearInterval(saveInterval);

  saveInterval = setInterval(update, 5000);
};

const update = async () =>{
  try {
    if (!currentDomain) return;
    let {timeSpent} = getStorageSnapshot();
    await setTimeSpent({...timeSpent}); // shallow clone to trigger the reactivity of solidjs
  } catch (error) {
    colorLog(`Save error: ${error}`, LogTypes.ERROR);
  }
}

const stopTracking = (): void => {
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
