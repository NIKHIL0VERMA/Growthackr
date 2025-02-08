import { logger } from "./logger";
import { extractHostName, isValidPage } from "./utilities";

// storage variables
// spent = Data: {urls, time}
// limit = urls, time
let timeSpentStorage: Record<string, Record<string, number>> = {};
let dailyLimitsStorage: Record<string, number> = {};
let monitorList: Array<string>;

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
  chrome.storage.local.set({welcome:true});
  logger.log("add welcome init to install only");
  chrome.storage.local.set({timeSpent: {}, dailyLimits: {}});
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
  chrome.storage.local.get(['timeSpent', 'monitorList', 'dailyLimits'], (result) => {
    timeSpentStorage = result.timeSpent || {};
    dailyLimitsStorage = result.dailyLimits || {};
    monitorList = result.monitorList || Array<string>;
  });
};

async function isInBlockList(url: string) : Promise<boolean> {
  logger.log(`checking if ${url} is in block list`);
  return monitorList.includes(url);
}

// Currently this code increase time even if tab is not active 
// async function loadCurrentTab() {
//   const window = await chrome.windows.getLastFocused({populate: true});
//   if(!window.focused){
//     logger.log("window lost the focus");
//     return;
//   }

//   const activeTab = window.tabs?.find(t => t.active === true);
//   if(!isValidPage(activeTab)){
//     logger.log("Not a valid page");
//     currentDomain = null;
//     return;
//   }

//   const activeDomain = extractHostName(activeTab!.url);
//   if(!(await isInBlockList(activeDomain))){
//     logger.log(`${activeDomain} is not in monitored list`);
//     currentDomain = null;
//     return;
//   }
//   currentDomain = activeDomain;
//   if(!monitorTabs[activeTab.id]){
//     monitorTabs[activeTab.id] = currentDomain;
//   }
// }

// async function trackTime() {
//   await loadCurrentTab();
//   for(const [tabId, domain] of Object.entries(monitorTabs) as [string, string][]){
//     if(!(await isInBlockList(domain))){
//       logger.log(`Tab with id ${tabId} and domain ${domain} shouldn't be in the monitored list`);
//       currentDomain = null;
//       return;
//     }

//     // Will be using it for case when user want to stop tracking current session/domain only
//     currentDomain = domain;
//     const date = new Date().toISOString().split('T')[0];

//     // Ensure the date entry exists
//     if(!timeSpentStorage[date]){
//       timeSpentStorage[date] = {};
//       logger.log(`created data for ${date}`);
//     }
//     //Ensure the url entry exists
//     if(!timeSpentStorage[date][domain]){
//       timeSpentStorage[date][domain] = 0;
//       logger.log(`init the ${domain} value to 0`);
//     }

//     timeSpentStorage[date][domain] += 1;
//     logger.log(`value changes on ${date} for ${domain} to ${timeSpentStorage[date][domain]}`);
//   }

//   if(Object.keys(monitorTabs).length === 0){
//     currentDomain = null;
//   }
// }

// last working tracker of time
async function trackTime() {
 const window = await chrome.windows.getLastFocused({populate: true});
 
 if(!window.focused){
  logger.log("window lost the focus");
  return;
 }

 const activeTab = window.tabs?.find(t => t.active === true);
 if(!isValidPage(activeTab)){
  logger.log("Not a valid page");
  currentDomain = null;
  return;
 }
 
 const activeDomain = extractHostName(activeTab!.url);
 if(!(await isInBlockList(activeDomain))){
  logger.log(`${activeDomain} is not in monitored list`);
  currentDomain = null;
  return;
 }
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
};

// // Temp in-memory mapping of monitored site which are audible and activated by the user
// let monitorTabs = {};

// // monitor the tab activities
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if(changeInfo.audible){
//     const domain = extractHostName(tab.url);
//     if(isInBlockList(domain)){
//       monitorTabs[tabId] = domain;
//     }
//   } else if(changeInfo.audible = false && monitorTabs[tabId]){
//       delete monitorTabs[tabId];
//     }
// });

// // remove monitoring if tab is deleted
// chrome.tabs.onRemoved.addListener((tabId) => {
//   if(monitorTabs[tabId]){
//     delete monitorTabs[tabId];
//   }
// })

// // monitor current activate tab
// chrome.tabs.onActivated.addListener(async (activeInfo) => {
//   const activeTab = await chrome.tabs.get(activeInfo.tabId);
//   if(activeTab.audible && isInBlockList(extractHostName(activeTab.url))){
//     monitorTabs[activeInfo.tabId] = extractHostName(activeTab.url);
//   } else if (monitorTabs[activeInfo.tabId]) {
//     delete monitorTabs[activeInfo.tabId];
//   }
// });

// Handling the frontend requests
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.action === 'welcomeCompleted'){
    chrome.storage.local.set({welcome: false}, () => {
      sendResponse({success: true});
    });
    return true;
  }

  if(message.action === 'monitorList'){
    chrome.storage.local.set({monitorList : message.value.map(platform => platform.url)}, () => {
      sendResponse({success : true});
    });
    return true;
  }
});