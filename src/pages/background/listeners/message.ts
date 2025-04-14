import { ExtensionMessage, MessageAction, MessageResponse, AddPlatformMessage, UpdatePlatformMessage, SetPlatformsMessage } from '@src/shared/types/messages';
import { updateStorage, getStorageData, addPlatform, updatePlatform, clearStorage, setPlatforms } from '../services/storage';
import { colorLog, LogTypes } from "@src/shared/utils/logger";

/** 
 * Handles incoming messages from other parts of the extension
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
 */
const handleWelcomeCompleted = async (): Promise<MessageResponse> => {
  await updateStorage({ welcome: false });
  return { success: true };
};

/**
 * Handles close tab message
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
 * Handles close options page message
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
 */
const handleGetTimeSpent = async (): Promise<MessageResponse> => {
  const {timeSpent} = await getStorageData(['timeSpent']);
  return { success: true, data: timeSpent };
};

/**
 * Handles get platforms message
 */
const handleGetPlatforms = async (): Promise<MessageResponse> => {
  const {platforms} = await getStorageData(['platforms']);
  return { success: true, data: platforms };
};

const handleSetPlatforms = async (message : SetPlatformsMessage): Promise<MessageResponse> => {
  await setPlatforms(message.platforms);
  return {success: true};
}

/**
 * Handles add platform message
 */
const handleAddPlatform = async (message: AddPlatformMessage): Promise<MessageResponse> => {
  if (message.platforms) {
    // Handle array of platforms
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
 */
const handleClearStorage = async (): Promise<MessageResponse> => {
  await clearStorage();
  return { success: true };
}; 