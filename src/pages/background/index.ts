let timeSpent: Record<string, Record<string, number>> = {};
let dailyLimits: Record<string, number> = {};
let isTracking: boolean = false;

chrome.storage.sync.get(['timeSpent', 'dailyLimits']).then((result) => {
  timeSpent = result.timeSpent || {};
  dailyLimits = result.dailyLimits || {};
});

function updateTimeSpent(domain: string): void {
  const today = new Date().toDateString();
  if (!timeSpent[today]) {
    timeSpent[today] = {};
  }
  timeSpent[today][domain] = (timeSpent[today][domain] || 0) + 1;
  chrome.storage.sync.set({ timeSpent: timeSpent });
}

function checkTimeLimit(domain: string): void {
  const today = new Date().toDateString();
  const timeSpentToday = timeSpent[today]?.[domain] || 0;
  const limit = dailyLimits[domain] || Infinity;
  
  if (timeSpentToday >= limit * 60) {
    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "blockSite" });
      isTracking = false; // Stop tracking time when blocked
    });
  }
}

chrome.webNavigation.onCompleted.addListener((details) => {
  const url = new URL(details.url);
  const domain = url.hostname.replace('www.', '');
  
  if (['facebook.com', 'youtube.com', 'instagram.com'].includes(domain)) {
    isTracking = true;
    setInterval(() => {
      if (isTracking) {
        updateTimeSpent(domain);
        checkTimeLimit(domain);
      }
    }, 1000);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId).then((tab) => {
    const url = new URL(tab.url);
    const domain = url.hostname.replace('www.', '');
    isTracking = ['facebook.com', 'youtube.com', 'instagram.com'].includes(domain);
  });
});