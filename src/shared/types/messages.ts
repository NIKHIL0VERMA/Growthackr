import { Platform } from "../../pages/background/types/storage";

/**
 * Enum representing all possible message actions in the extension
 * @readonly
 */
export enum MessageAction {
  WELCOME_COMPLETED = 'welcomeCompleted',
  CLOSE_TAB = 'closeTab',
  CLOSE_OPTIONS_PAGE = 'closeOptionsPage',
  GET_TIME_SPENT = 'getTimeSpent',
  GET_PLATFORMS = 'getPlatforms',
  ADD_PLATFORM = 'addPlatform',
  UPDATE_PLATFORM = 'updatePlatform',
  CLEAR_STORAGE = 'clear'
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
export interface CloseOptionsPageMessage extends BaseMessage {
  action: MessageAction.CLOSE_OPTIONS_PAGE;
}

/**
 * Message to get time spent data
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
 * Union type representing all possible messages in the extension
 */
export type ExtensionMessage = 
  | WelcomeCompletedMessage
  | CloseTabMessage
  | CloseOptionsPageMessage
  | GetTimeSpentMessage
  | GetPlatformsMessage
  | AddPlatformMessage
  | UpdatePlatformMessage
  | ClearStorageMessage;

/**
 * Generic success response interface
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