import { colorLog, LogTypes } from "@utils/logger";
import { extractHostName, isValidPage } from "./utilities";
import { blockSite } from "../blocking";

// storage variables
// spent = Data: {urls, time}
// limit = urls, time
let timeSpentStorage: Record<string, Record<string, number>> = {};
let dailyLimitsStorage: Record<string, number> = {};
let monitorList: Array<string>;

// Logger for future if I work on this ;)
colorLog("Starting of background script", LogTypes.INFO);
self.onerror = err => {
  colorLog("Unhandled error: " + err, LogTypes.ERROR);
}

// Logging events and init storage
chrome.runtime.onInstalled.addListener(async details=>{
  if(details.reason == 'install'){
    colorLog("Extension is installed: " + details, LogTypes.INFO);
    chrome.runtime.openOptionsPage();
    chrome.storage.local.set({timeSpent: {}, dailyLimits: {}, monitorList: {}, welcome: true});  
  }

  if(details.reason == 'update' && !details.previousVersion){
    colorLog("Extension is updated: "+  details, LogTypes.SUCCESS);
  } 
  colorLog("add welcome init to install only", LogTypes.WARNING);
  });

// Bunch of random events maybe used in future
chrome.runtime.onStartup.addListener(() => {
  colorLog("onStartup event",LogTypes.SUCCESS);
});
chrome.windows.onFocusChanged.addListener(() => {
  colorLog("onFocusChanged",LogTypes.WARNING);
});

// Function to close the options page
function closeOptionsPage() {
  chrome.tabs.query({ url: chrome.runtime.getURL("src/pages/options/index.html") }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.remove(tabs[0].id);
    }
  });
}

// Clearing the storage if requested from extension
chrome.runtime.onMessage.addListener(async msg => {
  if(msg == 'clear'){
    chrome.storage.local.set({timeSpent: {}});
  }
})

initTracking();
let currentDomain: string | null;

async function initTracking() {
  setInterval(trackTime, 1000); // track every second
  setInterval(setTimeSpent, 5000); // save every 5 second to prevent abusing storage api
  LoadData(); 
}

// Set timeSpent
function setTimeSpent(): void {
  if(currentDomain == null) return;
  const date = new Date().toISOString().split('T')[0];
  chrome.storage.local.get('timeSpent', (result) => {
      const timeSpent = result.timeSpent || {};

      // initializing the global data if not exist for today
      if (!timeSpent[date]) {
        timeSpent[date] = {};
      }
      if (!timeSpent[date][currentDomain]) {
        timeSpent[date][currentDomain] = -1;
      }

      if(timeSpentStorage[date][currentDomain] > timeSpent[date][currentDomain]){
        chrome.storage.local.set({ timeSpent: timeSpentStorage });
      }
  });
}

// Set dailyLimits
function setDailyLimits(key: string, value: number): void {
  chrome.storage.local.get('dailyLimits', (result) => {
      const dailyLimits = result.dailyLimits || {};
      dailyLimits[key] = value;
      chrome.storage.local.set({ dailyLimits });
  });
}

// Load the data
function LoadData(): void {
  chrome.storage.local.get(['timeSpent', 'monitorList', 'dailyLimits'], (result) => {
    timeSpentStorage = result.timeSpent || {};
    dailyLimitsStorage = result.dailyLimits || {};
    monitorList = result.monitorList || Array<string>;
  });
};

async function isInBlockList(url: string) : Promise<boolean> {
  colorLog(`checking if ${url} is in block list`, LogTypes.INFO);
  return monitorList.includes(url);
}

async function trackTime() {
    const window = await chrome.windows.getLastFocused({ populate: true });

    if (!window.focused) {
        colorLog("window lost the focus", LogTypes.WARNING);
        return;
    }

    const activeTab = window.tabs?.find(t => t.active === true);
    if (!activeTab) {
        colorLog("No active tab found", LogTypes.WARNING);
        return;
    }

    // Check if the tab is fully loaded
    const tabInfo = await chrome.tabs.get(activeTab.id);
    if (tabInfo.status !== 'complete') {
        colorLog(`Tab ${activeTab.id} is not fully loaded. Status: ${tabInfo.status}`, LogTypes.WARNING);
        return; // Exit if the tab is not fully loaded
    }

    if (!isValidPage(activeTab)) {
        colorLog("Not a valid page", LogTypes.WARNING);
        currentDomain = null;
        return;
    }

    const activeDomain = extractHostName(activeTab.url);
    if (!(await isInBlockList(activeDomain))) {
        colorLog(`${activeDomain} is not in monitored list`, LogTypes.WARNING);
        currentDomain = null;
        return;
    }

    currentDomain = activeDomain;
    const date = new Date().toISOString().split('T')[0];

    // Ensure the date entry exists
    if (!timeSpentStorage[date]) {
        timeSpentStorage[date] = {};
        colorLog('create today date', LogTypes.SUCCESS);
    }

    // Ensure the URL entry exists
    if (!timeSpentStorage[date][activeDomain]) {
        timeSpentStorage[date][activeDomain] = 0;
        colorLog(`init the ${activeDomain} value to 0`, LogTypes.SUCCESS);
    }

    // Main Blocking here
    // TODO: testing with 10s change it to user selected
    if (timeSpentStorage[date][activeDomain] >= 10) {
        colorLog(`Testing 10s blocking on ${activeDomain}`, LogTypes.INFO);

        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: blockSite
        });
    } else {
        timeSpentStorage[date][activeDomain] += 1;
        colorLog(`value changes on ${date} for ${activeDomain} to ${timeSpentStorage[date][activeDomain]}`, LogTypes.INFO);
    }
}

// Handling the frontend requests
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.action === 'welcomeCompleted'){
    chrome.storage.local.set({welcome: false}, () => {
      sendResponse({success: true});
    });
    return true;
  }

  if (message.action === "closeTab") {
    chrome.tabs.remove(sender.tab.id); 
  }

  if (message.action === "closeOptionsPage") {
    closeOptionsPage();
    sendResponse({ status: "Options page closed" });
  }

  if(message.action === 'monitorList'){
    chrome.storage.local.set({monitorList : message.value.map(platform => platform.url)}, () => {
      sendResponse({success : true});
    });
    LoadData(); // After every time list update update the local db
    return true;
  }
});
