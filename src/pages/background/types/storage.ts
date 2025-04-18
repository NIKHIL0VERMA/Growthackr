/**
 * Background Types
 * 
 * This section defines the types used in the background script for managing storage data.
 * 
 * @namespace BackgroundTypes
 */

/**
 * TimeSpentData
 * 
 * Represents the time spent on different domains across various dates.
 * 
 * @property {[date: string]} - The date for which time spent is recorded.
 * @property {[domain: string]} - The domain for which time spent is recorded.
 * @property {number} - The time spent on the domain in minutes.
 */
export interface TimeSpentData {
  [date: string]: {
    [domain: string]: number;
  };
}

/**
 * Platform
 * 
 * Represents a platform with its details and time limit.
 * 
 * @property {string} url - The URL of the platform.
 * @property {string} name - The name of the platform.
 * @property {string} icon - The icon URL of the platform.
 * @property {{hours: number; minutes: number}} timeLimit - The time limit for the platform.
 * @property {boolean} isCustom - Indicates if the platform is custom or not.
 */
export interface Platform {
  url: string;
  name: string;
  icon: string;
  timeLimit: {
    hours: number;
    minutes: number;
  };
  isCustom: boolean;
}

/**
 * StorageData
 * 
 * Represents the data stored in the browser storage.
 * 
 * @property {TimeSpentData} timeSpent - The time spent data.
 * @property {Platform[]} platforms - An array of platforms.
 * @property {boolean} [welcome] - Indicates if the welcome message has been shown.
 */
export interface StorageData {
  timeSpent: TimeSpentData;
  platforms: Platform[];
  welcome?: boolean;
}