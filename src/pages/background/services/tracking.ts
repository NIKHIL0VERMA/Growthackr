// trackingService.ts
import { colorLog, LogTypes } from "@src/shared/utils/logger";
import { extractHostName, isValidPage } from "@src/shared/utils/utilities";
import { blockSite } from "@pages/blocking";
import { getStorageData, setTimeSpent } from "./storage";
import type { Platform } from "../types/storage"; 

let currentDomain: string | null = null;
let trackingInterval: ReturnType<typeof setInterval> | null = null;
let saveInterval: ReturnType<typeof setInterval> | null = null;

export const initializeTracking = async (): Promise<void> => {
  try {
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
    }else{
      stopTracking();
    }
  });
};

const onTabActivated = async (activeInfo: chrome.tabs.TabActiveInfo): Promise<void> => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (isValidPage(tab)) handleTab(tab);
    else stopTracking();
  } catch (error) {
    colorLog(`Tab activation error: ${error}`, LogTypes.ERROR);
  }
};

const onFocusChanged = async (windowId: number): Promise<void> => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) return;
  try {
    const [tab] = await chrome.tabs.query({ active: true, windowId });
    if (isValidPage(tab)) handleTab(tab);
    else stopTracking();
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
      const data = await getStorageData();
      const platforms: Platform[] = data.platforms || [];
      const platform = platforms.find(p => p.url === currentDomain);

      if (!platform) {
        stopTracking();
        colorLog("URL not allowed, skipping tracking", LogTypes.INFO);
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      const timeSpent = data.timeSpent ?? {};
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
        }
      }
    } catch (error) {
      colorLog(`Tracking error: ${error}`, LogTypes.ERROR);
    }
  }, 1000);
};

const startSaveInterval = (): void => {
  if (saveInterval) clearInterval(saveInterval);

  saveInterval = setInterval(async () => {
    try {
      if (!currentDomain) return;
      const data = await getStorageData();
      await setTimeSpent(data.timeSpent);
    } catch (error) {
      colorLog(`Save error: ${error}`, LogTypes.ERROR);
    }
  }, 5000);
};

const stopTracking = (): void => {
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
