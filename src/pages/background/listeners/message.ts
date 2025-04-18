import { ExtensionMessage, MessageAction, MessageResponse, AddPlatformMessage, UpdatePlatformMessage, SetPlatformsMessage } from '@src/shared/types/messages';
import { updateStorage, addPlatform, updatePlatform, clearStorage, setPlatforms, getStorageSnapshot } from '../services/storage';
import { colorLog, LogTypes } from "@src/shared/utils/logger";

/**
 * Handles incoming messages from other parts of the extension
 * This function is like a superhero, saving the day by handling all sorts of messages
 * that come in from different parts of the extension. It's like a message dispatcher,
 * directing each message to the right function to handle it.
 * 
 * @param message - The message to handle
 * @returns Promise resolving to the response
 */
export const handleMessage = async (message: ExtensionMessage): Promise<MessageResponse> => {
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
      return handleSetPlatforms(message as SetPlatformsMessage);
    case MessageAction.ADD_PLATFORM:
      return handleAddPlatform(message as AddPlatformMessage);
    case MessageAction.UPDATE_PLATFORM:
      return handleUpdatePlatform(message as UpdatePlatformMessage);
    case MessageAction.CLEAR_STORAGE:
      return handleClearStorage();
    case MessageAction.SYNC_THEME:
      return; // This is handled by the frontend only no backend involvement required
    default:
      throw new Error(`Unknown message action: ${action}`);
    }
  } catch (error) {
    colorLog(`Error handling message: ${error}`, LogTypes.ERROR);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Handles welcome completed message
 * This function is like a party popper, celebrating the completion of the welcome process.
 * It updates the storage to reflect that the welcome process is done.
 * 
 * @returns Promise resolving to the response
 */
const handleWelcomeCompleted = async (): Promise<MessageResponse> => {
  await updateStorage({ welcome: false });
  return { success: true };
};

/**
 * Handles close tab message
 * This function is like a tab assassin, silently killing the current tab.
 * It queries for the active tab and removes it if found.
 * 
 * @returns Promise resolving to the response
 */
const handleCloseTab = async (): Promise<MessageResponse> => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    await chrome.tabs.remove(tab.id);
    return {success: true};
  }
  return { success: false, error: `Couldn't close current tab with id ${tab?.id}` };
};

/**
 * Handles open options page message
 * This function is like a door opener, opening the options page for the user.
 * It uses the chrome.runtime API to open the options page.
 * 
 * @returns Promise resolving to the response
 */
const handleOpenOptionsPage = async () : Promise<MessageResponse> => {
  chrome.runtime.openOptionsPage();
  return {success : true};
}

/**
 * Handles close options page message
 * This function is like a door closer, closing the options page if it's open.
 * It queries for the options page tab and removes it if found.
 * 
 * @returns Promise resolving to the response
 */
const handleCloseOptionsPage = async (): Promise<MessageResponse> => {
  const [tab] = await chrome.tabs.query({ url: chrome.runtime.getURL('src/pages/options/index.html') });
  if (tab?.id) {
    await chrome.tabs.remove(tab.id);
    return {success: true};
  }
  return { success: false,error: "Something went wrong while closing welcome page" };
};

/**
 * Handles get time spent message
 * This function is like a timekeeper, fetching the time spent data from storage.
 * It gets the storage snapshot and returns the time spent data.
 * 
 * @returns Promise resolving to the response
 */
const handleGetTimeSpent = async (): Promise<MessageResponse> => {
  const snapshot = getStorageSnapshot();
  return { success: true, data: snapshot.timeSpent };
};

/**
 * Handles get platforms message
 * This function is like a platform fetcher, fetching the platforms data from storage.
 * It gets the storage snapshot and returns the platforms data.
 * 
 * @returns Promise resolving to the response
 */
const handleGetPlatforms = async (): Promise<MessageResponse> => {
  const snapshot = getStorageSnapshot();
  return { success: true, data: snapshot.platforms };
};

/**
 * Handles set platforms message
 * This function is like a platform setter, setting the platforms data in storage.
 * It updates the storage with the new platforms data.
 * 
 * @param message - The message containing the platforms data
 * @returns Promise resolving to the response
 */
const handleSetPlatforms = async (message : SetPlatformsMessage): Promise<MessageResponse> => {
  await setPlatforms(message.platforms);
  return {success: true};
}

/**
 * Handles add platform message
 * This function is like a platform adder, adding new platforms to the storage.
 * It checks if the message contains an array of platforms or a single platform and adds them accordingly.
 * 
 * @param message - The message containing the platform(s) data
 * @returns Promise resolving to the response
 */
const handleAddPlatform = async (message: AddPlatformMessage): Promise<MessageResponse> => {
  if (message.platforms) {
    // Handle array of platforms
    // Don't optimize with Promise.all as we are updating storage
    for (const platform of message.platforms) { 
      await addPlatform(platform);
    }
    return { success: true };
  } else if (message.platform) {
    // Handle single platform (for backward compatibility)
    await addPlatform(message.platform);
    return { success: true };
  }
  throw new Error('Platform data missing from message');
};

/**
 * Handles update platform message
 * This function is like a platform updater, updating existing platforms in storage.
 * It checks if the message contains platform data and updates it accordingly.
 * 
 * @param message - The message containing the platform data
 * @returns Promise resolving to the response
 */
const handleUpdatePlatform = async (message: ExtensionMessage): Promise<MessageResponse> => {
  if ('platform' in message) {
    await updatePlatform(message.platform);
    return { success: true };
  }
  throw new Error('Platform data missing from message');
};

/**
 * Handles clear storage message
 * This function is like a storage cleaner, clearing all data from storage.
 * It uses the clearStorage function to clear the storage.
 * 
 * @returns Promise resolving to the response
 */
const handleClearStorage = async (): Promise<MessageResponse> => {
  await clearStorage();
  return { success: true };
}; 