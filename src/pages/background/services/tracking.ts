import { colorLog, LogTypes } from "@src/shared/utils/logger";
import { extractHostName, isValidTab } from "@src/shared/utils/utilities";
import { blockSite } from "@pages/blocking";
import { getStorageSnapshot, initStorage, setTimeSpent } from "./storage";

/**
 * The current domain being tracked. It's like a detective's notebook, keeping track of the website we're currently snooping on.
 * @type {(string | null)}
 */
let currentDomain: string | null = null;

/**
 * The interval that keeps track of time spent on a site. It's like a timer that says, "Hey, you've been on Facebook for 3 hours, maybe take a break?"
 * @type {(ReturnType<typeof setInterval> | null)}
 */
let trackingInterval: ReturnType<typeof setInterval> | null = null;

/**
 * The interval that saves the time spent data. It's like a diligent accountant, making sure all the time spent is accurately recorded.
 * @type {(ReturnType<typeof setInterval> | null)}
 */
let saveInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Initializes the tracking service.
 * 
 * This function initializes the storage, sets up listeners for tab activations, window focus changes, and tab updates.
 * It's the starting point of our tracking adventure.
 * 
 * @returns {Promise<void>} - A promise that resolves when the initialization is complete. 
 * Jab sab kuch set ho jata hai, tab main tracking shuru kar sakta hoon!
 */
export const initializeTracking = async () => {
  try {
    await initStorage();
    registerListeners();
    colorLog("Tracking initialized", LogTypes.SUCCESS);
  } catch (error) {
    colorLog(`Init failed: ${error}`, LogTypes.ERROR);
  }
};

/**
 * Registers listeners for various events. It's like setting up traps to catch all the tab and window activity.
 * 
 * This function sets up listeners for tab activations, window focus changes, and tab updates. It's the ears and eyes of our tracking service.
 */
const registerListeners = (): void => {
  chrome.tabs.onActivated.addListener(onTabActivated);
  chrome.windows.onFocusChanged.addListener(onFocusChanged);
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active && isValidTab(tab)) {
      handleTab(tab);
    }
  });
};

/**
 * Handles tab activations. It's like responding to a distress call, "Tab activated, we need to start tracking!"
 * 
 * This function is called when a tab is activated. It checks if the tab is valid and starts tracking if it is.
 * 
 * @param {chrome.tabs.TabActiveInfo} activeInfo - The information about the activated tab.
 * @returns {Promise<void>} A promise that resolves when the tab activation handling is complete.
 */
const onTabActivated = async (activeInfo: chrome.tabs.TabActiveInfo): Promise<void> => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (isValidTab(tab)) handleTab(tab);
  } catch (error) {
    colorLog(`Tab activation error: ${error}`, LogTypes.ERROR);
  }
};

/**
 * Handles window focus changes. It's like responding to a window focus change, "Window focus changed, let's check if we need to start tracking!"
 * 
 * This function is called when the window focus changes. It checks if the new window is valid and starts tracking if it is.
 * 
 * @param {number} windowId - The ID of the window that gained focus.
 * @returns {Promise<void>} A promise that resolves when the window focus change handling is complete.
 */
const onFocusChanged = async (windowId: number): Promise<void> => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) return;
  try {
    const [tab] = await chrome.tabs.query({ active: true, windowId });
    if (isValidTab(tab)) handleTab(tab);
  } catch (error) {
    colorLog(`Window focus error: ${error}`, LogTypes.ERROR);
  }
};

/**
 * Handles tab updates. It's like responding to a tab update, "Tab updated, let's check if we need to start tracking!"
 * 
 * This function is called when a tab is updated. It checks if the tab is valid and starts tracking if it is.
 * 
 * @param {chrome.tabs.Tab} tab - The updated tab.
 */
const handleTab = (tab: chrome.tabs.Tab): void => {
  currentDomain = extractHostName(tab.url);
  startTimeTracking();
  startSaveInterval();
};

/**
 * Starts the time tracking interval. It's like starting a timer, "Time's a-tickin'!"
 * 
 * This function starts the interval that tracks the time spent on the current domain.
 */
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

/**
 * Starts the save interval. It's like setting up a backup system, "Time to save our progress!"
 * 
 * This function starts the interval that saves the time spent data.
 */
const startSaveInterval = (): void => {
  if (saveInterval) clearInterval(saveInterval);

  saveInterval = setInterval(update, 5000);
};

/**
 * Updates the time spent data. It's like saving the progress, "Time to update our records!"
 * 
 * This function updates the time spent data in the storage.
 * 
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
const update = async () =>{
  try {
    if (!currentDomain) return;
    const {timeSpent} = getStorageSnapshot();
    await setTimeSpent({...timeSpent}); // shallow clone to trigger the reactivity of solidjs
  } catch (error) {
    colorLog(`Save error: ${error}`, LogTypes.ERROR);
  }
}

/**
 * Stops the tracking. It's like calling off the investigation, "We're done tracking this site!"
 * 
 * This function stops the tracking interval and save interval, and resets the current domain.
 */
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
