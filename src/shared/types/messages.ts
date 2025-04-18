import { Platform } from "@pages/background/types/storage";

/**
 * Enum representing all possible message actions in the extension
 * @readonly
 */
export enum MessageAction {
  WELCOME_COMPLETED = 'welcomeCompleted',
  CLOSE_TAB = 'closeTab',
  CLOSE_OPTIONS_PAGE = 'closeOptionsPage',
  OPNE_OPTIONS_PAGE = 'openOptionsPage',
  GET_TIME_SPENT = 'getTimeSpent',
  GET_PLATFORMS = 'getPlatforms',
  SET_PLATFORMS = 'setPlatforms',
  ADD_PLATFORM = 'addPlatform',
  UPDATE_PLATFORM = 'updatePlatform',
  CLEAR_STORAGE = 'clear',
  SYNC_THEME = 'syncTheme',
}

/**
 * Base interface for all extension messages
 */
export interface BaseMessage {
  /** The action to be performed */
  action: MessageAction;
}

/**
 * Message sent when welcome screen is completed
 */
export interface WelcomeCompletedMessage extends BaseMessage {
  action: MessageAction.WELCOME_COMPLETED;
}

/**
 * Message to close the current tab
 */
export interface CloseTabMessage extends BaseMessage {
  action: MessageAction.CLOSE_TAB;
}

/**
 * Message to close the options page
 */
export interface OpenOptionsPageMessage extends BaseMessage {
  action: MessageAction.OPNE_OPTIONS_PAGE;
}

/**
 * Message to close the options page
 */
export interface CloseOptionsPageMessage extends BaseMessage {
  action: MessageAction.CLOSE_OPTIONS_PAGE;
}

/**
 * Represents a message for retrieving time spent data.
 * This message is used to request time tracking information from the background script.
 */
export interface GetTimeSpentMessage extends BaseMessage {
  action: MessageAction.GET_TIME_SPENT;
}

/**
 * Message to get platforms list
 */
export interface GetPlatformsMessage extends BaseMessage {
  action: MessageAction.GET_PLATFORMS;
}

/**
 * Message to set platforms list
 */
export interface SetPlatformsMessage extends BaseMessage {
  action: MessageAction.SET_PLATFORMS;
  platforms: Platform[];
}

/**
 * Message to add a new platform or platforms
 */
export interface AddPlatformMessage extends BaseMessage {
  action: MessageAction.ADD_PLATFORM;
  /** The platform to add */
  platform?: Platform;
  /** Array of platforms to add */
  platforms?: Platform[];
}

/**
 * Message to update an existing platform
 */
export interface UpdatePlatformMessage extends BaseMessage {
  action: MessageAction.UPDATE_PLATFORM;
  /** The platform to update */
  platform: Platform;
}

/**
 * Message to clear storage data
 */
export interface ClearStorageMessage extends BaseMessage {
  action: MessageAction.CLEAR_STORAGE;
}

/**
 * Message to sync the theme between tabs
 */
export interface SyncThemeMessage extends BaseMessage {
  action: MessageAction.SYNC_THEME;
  theme: 'light' | 'dark';
}

/**
 * Union type representing all possible messages in the extension
 */
export type ExtensionMessage = 
  | WelcomeCompletedMessage
  | CloseTabMessage
  | OpenOptionsPageMessage
  | CloseOptionsPageMessage
  | GetTimeSpentMessage
  | GetPlatformsMessage
  | SetPlatformsMessage
  | AddPlatformMessage
  | UpdatePlatformMessage
  | ClearStorageMessage
  | SyncThemeMessage;

/**
 * Generic success response interface
 * 
 * This interface is like a trophy for successful operations! It tells us whether the operation was a hit or a miss.
 * 
 * @template T - Type of the data returned
 */
export interface SuccessResponse<T = unknown> {
  /** Whether the operation was successful */
  success: true;
  /** Optional data returned by the operation */
  data?: T;
}

/**
 * Error response interface
 */
export interface ErrorResponse {
  /** Whether the operation was successful (always false for errors) */
  success: false;
  /** Error message describing what went wrong */
  error: string;
}

/**
 * Union type representing all possible message responses
 * @template T - Type of the data returned in case of success
 */
export type MessageResponse<T = unknown> = SuccessResponse<T> | ErrorResponse; 