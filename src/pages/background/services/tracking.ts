import { colorLog, LogTypes } from "@src/shared/utils/logger";
import { extractHostName, isValidPage } from "@src/shared/utils/utilities";
import { blockSite } from "../../blocking";
import { getStorageData, setTimeSpent } from "./storage";

/**
 * Error thrown when tracking operations fail
 */
export class TrackingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TrackingError';
  }
}

/**
 * Tracks time spent on websites
 */
export class TrackingService {
  private static instance: TrackingService;
  private currentDomain: string | null = null;
  private trackingInterval: NodeJS.Timeout | null = null;
  private saveInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): TrackingService {
    if (!TrackingService.instance) {
      TrackingService.instance = new TrackingService();
    }
    return TrackingService.instance;
  }

  public async initialize(): Promise<void> {
    try {
      await getStorageData(); // Initialize storage
      this.startTracking();
      colorLog("Tracking service initialized", LogTypes.SUCCESS);
    } catch (error) {
      colorLog(`Failed to initialize tracking service: ${error}`, LogTypes.ERROR);
      throw new TrackingError('Failed to initialize tracking service');
    }
  }

  private startTracking(): void {
    // Start tracking when tab is activated
    chrome.tabs.onActivated.addListener((activeInfo) => {
      this.handleTabActivated(activeInfo);
    });

    // Start tracking when window is focused
    chrome.windows.onFocusChanged.addListener((windowId) => {
      if (windowId !== chrome.windows.WINDOW_ID_NONE) {
        this.handleWindowFocused(windowId);
      }
    });

    // Start tracking when tab is updated
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.active) {
        this.handleTabUpdated(tab);
      }
    });

    // Set up save interval
    this.saveInterval = setInterval(() => {
      this.saveTimeSpent().catch(error => {
        colorLog(`Failed to save time spent: ${error}`, LogTypes.ERROR);
      });
    }, 60000); // Save every minute
  }

  private async handleTabActivated(activeInfo: chrome.tabs.TabActiveInfo): Promise<void> {
    try {
      const tab = await chrome.tabs.get(activeInfo.tabId);
      if (isValidPage(tab)) {
        this.currentDomain = extractHostName(tab.url);
        this.startTimeTracking();
      }
    } catch (error) {
      colorLog(`Failed to handle tab activation: ${error}`, LogTypes.ERROR);
    }
  }

  private async handleWindowFocused(windowId: number): Promise<void> {
    try {
      const [tab] = await chrome.tabs.query({ active: true, windowId });
      if (isValidPage(tab)) {
        this.currentDomain = extractHostName(tab.url);
        this.startTimeTracking();
      }
    } catch (error) {
      colorLog(`Failed to handle window focus: ${error}`, LogTypes.ERROR);
    }
  }

  private async handleTabUpdated(tab: chrome.tabs.Tab): Promise<void> {
    try {
      if (isValidPage(tab)) {
        this.currentDomain = extractHostName(tab.url);
        this.startTimeTracking();
      }
    } catch (error) {
      colorLog(`Failed to handle tab update: ${error}`, LogTypes.ERROR);
    }
  }

  private startTimeTracking(): void {
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
    }

    this.trackingInterval = setInterval(async () => {
      try {
        if (!this.currentDomain) return;

        const data = await getStorageData();
        const platforms = data.platforms || [];
        const platform = platforms.find(p => p.url === this.currentDomain);
        if(!platform){
          clearInterval(this.trackingInterval);
          colorLog("Preventing tracking on invalid url", LogTypes.INFO);
        }else{
          const today = new Date().toISOString().split('T')[0];
          const timeSpent = data.timeSpent || {};
          const domainTime = timeSpent[today] || {};
          const currentTime = domainTime[this.currentDomain] || 0;

          domainTime[this.currentDomain] = currentTime + 1;
          timeSpent[today] = domainTime;

          // Check if time limit exceeded
          const totalMinutes = Math.floor(currentTime / 60);
          const limitMinutes = platform.timeLimit.hours * 60 + platform.timeLimit.minutes;

          if (totalMinutes >= limitMinutes) {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab?.id) {
              await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: blockSite
              });
            }
          }
        }
      } catch (error) {
        colorLog(`Failed to track time: ${error}`, LogTypes.ERROR);
      }
    }, 1000); // Track every second
  }

  private async saveTimeSpent(): Promise<void> {
    try {
      if (!this.currentDomain) return;
      const data = await getStorageData();
      await setTimeSpent(data.timeSpent);
    } catch (error) {
      colorLog(`Failed to save time spent: ${error}`, LogTypes.ERROR);
      throw new TrackingError('Failed to save time spent');
    }
  }

  public stopTracking(): void {
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
      this.trackingInterval = null;
    }
    if (this.saveInterval) {
      clearInterval(this.saveInterval);
      this.saveInterval = null;
    }
    this.currentDomain = null;
  }
} 