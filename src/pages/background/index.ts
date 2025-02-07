import { logger } from "./logger";
import { extractHostName, isValidPage } from "./utilities";

// storage variables
// spent = Data: {urls, time}
// limit = urls, time
let timeSpentStorage: Record<string, Record<string, number>> = {};
let dailyLimitsStorage: Record<string, number> = {};

// Logger for future if I work on this ;)
logger.log("Starting of background script");
self.onerror = err => {
  logger.log("Unhandled error: ", err);
}

// Logging events and init storage
chrome.runtime.onInstalled.addListener(async details=>{
  if(details.reason == 'install'){
    logger.log("Extension is installed: ", details);
  }

  if(details.reason == 'update' && !details.previousVersion){
    logger.log("Extension is updated: ", details);
  }  

  chrome.storage.local.set({timeSpent: {}, dailyLimits: {}})
})

// Bunch of random events maybe used in future
chrome.runtime.onStartup.addListener(() => {
  logger.log("onStartup event");
});
chrome.windows.onFocusChanged.addListener(() => {
  logger.log("onFocusChanged");
});

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
  chrome.storage.local.get('timeSpent', (result) => {
    timeSpentStorage = result.timeSpent || {};
  });
  chrome.storage.local.get('dailyLimits', (result) => {
      dailyLimitsStorage = result.dailyLimits || {};
  });
}

async function isInBlockList(url: string) : Promise<boolean> {
  logger.log(`checking if ${url} is in block list`);
  return true;
  return Object.keys(dailyLimitsStorage).some(key => key.includes(url));
}

async function trackTime() {
 const window = await chrome.windows.getLastFocused({populate: true});
 if(window.focused){
  const activeTab = window.tabs?.find(t => t.active === true);
  if(isValidPage(activeTab)){
    const activeDomain = extractHostName(activeTab!.url);
    if(await isInBlockList(activeDomain)){
      currentDomain = activeDomain;
      const date = new Date().toISOString().split('T')[0];
      // Ensure the date entry exists
      if (!timeSpentStorage[date]) { 
        timeSpentStorage[date] = {};
        logger.log('create today date');
      }
      // Ensure the URL entry exists
      if (!timeSpentStorage[date][activeDomain]) { 
        timeSpentStorage[date][activeDomain] = 0;
        logger.log(`init the ${activeDomain} value to 0`);
      } 
      timeSpentStorage[date][activeDomain] += 1
      logger.log(`value changes on ${date} for ${activeDomain} to ${timeSpentStorage[date][activeDomain]}`);
    }else{
      currentDomain = null;
    }
  }else{
    currentDomain = null;
  }
 }
}