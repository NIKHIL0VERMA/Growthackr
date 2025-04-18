import { colorLog, LogTypes } from "@src/shared/utils/logger";
import { initStorage, updateStorage } from './services/storage';
import { initializeTracking } from './services/tracking';
import { handleMessage } from './listeners/message';
import { ExtensionMessage } from '@src/shared/types/messages';

// Logger for background script
colorLog("Starting background script", LogTypes.INFO);

// Error handling
self.onerror = (err) => {
  colorLog("Unhandled error: " + err, LogTypes.ERROR);
};

// Initialize services
const initializeServices = async() => {
  try {
    await Promise.all([initStorage(), initializeTracking()]);
    colorLog("All services initialized successfully", LogTypes.SUCCESS);
  } catch (error) {
    colorLog(`Failed to initialize services: ${error}`, LogTypes.ERROR);
  }
}

// Start the application
initializeServices();

// Message handling
chrome.runtime.onMessage.addListener((message: ExtensionMessage, sender, sendResponse) => {
  handleMessage(message)
    .then(sendResponse)
    .catch(error => {
      colorLog(`Error handling message: ${error}`, LogTypes.ERROR);
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    });
  return true; // Keep the message channel open for async response
});

// Extension installation and update handling
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    colorLog("Extension is installed", LogTypes.INFO);
    await updateStorage({
      timeSpent: {},
      platforms: [],
      welcome: true
    });
    chrome.runtime.openOptionsPage();
  }

  if (details.reason === 'update' && !details.previousVersion) {
    colorLog("Extension is updated", LogTypes.SUCCESS);
  }
});

// Additional event listeners
chrome.runtime.onStartup.addListener(() => {
  colorLog("Extension started", LogTypes.INFO);
});

chrome.windows.onFocusChanged.addListener(() => {
  colorLog("Window focus changed", LogTypes.INFO);
});