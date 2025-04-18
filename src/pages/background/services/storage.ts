import { StorageData, TimeSpentData, Platform } from '../types/storage';
import { colorLog, LogTypes } from "@src/shared/utils/logger";

/**
 * Error thrown when storage operations fail.
 * 
 * This error is like a party pooper, yaar! It ruins the fun when something goes wrong with storage.
 * It's a custom error class that extends the native Error class, making it easy to identify and handle storage-related errors.
 */
export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Type representing the keys of the StorageData
 * 
 * This type is like a map to the treasure chest of storage data. It helps us navigate and access specific parts of the storage.
 */
type StorageKey = keyof StorageData;

/**
 * Caching mechanism.
 * 
 * This is like a super-smart, super-fast, and super-efficient librarian that keeps track of the storage data in memory.
 * It ensures that we don't have to fetch the data from storage every time we need it, making our extension faster and more efficient.
 */
let currentStorage: StorageData = null;
const storageListeners: Array<(data: StorageData) => void> = [];
/**
 * Initializes storage state and sets up the change listeners.
 * 
 * This function is like a master builder, setting up the storage system and preparing it for use.
 * It initializes the current storage state and sets up listeners to detect any changes to the storage.
 * When changes are detected, it updates the in-memory storage state and notifies all the listeners.
 * 
 * @returns {Promise<void>} - A promise that resolves when the storage is initialized. 
 * Bas, jab storage ready ho jata hai, tab hi main chill kar sakta hoon!
 */
export const initStorage = async () => {
  if(currentStorage !== null) return;
  const data = await getStorageData();
  currentStorage = data;
  colorLog("Storage initialized", LogTypes.SUCCESS);
  chrome.storage.onChanged.addListener((changes, area : chrome.storage.AreaName) => {
    if(area !== 'local') return;

    if (changes.timeSpent) {
      currentStorage.timeSpent = changes.timeSpent.newValue;
    }
    if (changes.platforms) {
      currentStorage.platforms = changes.platforms.newValue;
    }

    notifyStorageListeners();
  })
}

/**
 * Gets the current in-memory snapshot of the storage.
 * 
 * This function is like a snapshot camera, it captures the current state of the storage and returns it.
 * It's a quick way to get the latest storage data without having to fetch it from storage.
 * 
 * @returns {StorageData} - The current in-memory storage data.
 */
export const getStorageSnapshot = () : StorageData => currentStorage;

const notifyStorageListeners = () => {
  storageListeners.forEach(cb => cb(currentStorage));
};

/**
 * Subscribes to changes in the in-memory storage.
 * 
 * This function is like a subscription service, it allows other parts of the extension to listen for changes in the storage.
 * When the storage changes, it notifies all the subscribers with the updated data.
 * 
 * @param {function} callback - The function to call when storage changes.
 * @returns {void} - No return value, but your app will be updated like a news channel!
 */
export const onStorageChange = (callback: (data: StorageData) => void) => {
  storageListeners.push(callback);
};

/**
 * Asynchronous function to get the current storage data.
 * 
 * This function is like a storage explorer, it ventures into the storage and retrieves the data.
 * It can fetch specific parts of the storage data based on the keys provided, or fetch the entire storage data if no keys are specified.
 * It's an asynchronous function, which means it returns a promise that resolves to the storage data.
 * 
 * @param {Array<StorageKey>} [keys] - Optional array of keys to get from the storage.
 * @returns {Promise<Pick<StorageData, T> | StorageData>} - A promise resolving to the current storage data.
 * @throws {StorageError} If storage access fails.
 */
const getStorageData = async <T extends StorageKey>(
  keys?: T[]
): Promise<Pick<StorageData, T> | StorageData> => {
  try {
    return new Promise((resolve, reject) => {

      const storageKeys = keys ?? ['timeSpent', 'platforms'];
      chrome.storage.local.get(storageKeys, (result) => {
        if (chrome.runtime.lastError) {
          reject(new StorageError(chrome.runtime.lastError.message));
          return;
        }

        const defaultValues: Partial<StorageData> = {
          timeSpent: {},
          platforms: [],
        };

        const data = keys
          ? keys.reduce((acc, key) => {
            acc[key] = result[key] ?? defaultValues[key];
            return acc;
          }, {} as Pick<StorageData, T>)
          : ({
            timeSpent: result.timeSpent ?? {},
            platforms: result.platforms ?? [],
          } as StorageData);

        resolve(data);
      });
    });
  } catch (error) {
    colorLog(`Failed to get storage data: ${error}`, LogTypes.ERROR);
    throw new StorageError('Failed to access storage');
  }
};

/**
 * Updates the storage with new data.
 * 
 * This function is like a storage editor, updating the storage data with new information.
 * It's an asynchronous function that returns a promise, making it easy to handle the update operation.
 * 
 * @param {Partial<StorageData>} updates - Partial storage data to update.
 * @throws {StorageError} If storage update fails. 
 * Agar update fail ho gaya, toh mujhe toh bahut bura lagega!
 */
export const updateStorage = async (updates: Partial<StorageData>): Promise<void> => {
  try {
    await new Promise<void>((resolve, reject) => {
      chrome.storage.local.set(updates, () => {
        if (chrome.runtime.lastError) {
          reject(new StorageError(chrome.runtime.lastError.message));
          return;
        }
        colorLog('Storage updated', LogTypes.SUCCESS);
        resolve();
      });
    });
    return;
  } catch (error) {
    colorLog(`Failed to update storage: ${error}`, LogTypes.ERROR);
    throw new StorageError('Failed to update storage');
  }
};

/**
 * Sets the time spent data
 * 
 * This function is like a timekeeper, it updates the time spent data in the storage.
 * It's a convenient way to update the time spent data without having to manually construct the update object.
 * @param timeSpent - New time spent data
 * @throws {StorageError} If update fails
 */
export const setTimeSpent = async (timeSpent: TimeSpentData): Promise<void> => {
  currentStorage.timeSpent = timeSpent;
  await updateStorage({ timeSpent });
};

/**
 * Sets the platforms list, to be used from welcome page only
 * 
 * This function is like a platform manager, it updates the platforms list in the storage.
 * It's a specialized function for updating the platforms list, making it easy to manage platforms from the welcome page.
 * @param platforms - New platforms list
 * @throws {StorageError} If update fails
 */
export const setPlatforms = async (platforms: Platform[]): Promise<void> => {
  currentStorage.platforms = platforms;
  await updateStorage({ platforms });
};

/**
 * Adds a new platform to the list
 * 
 * This function is like a platform adder, it adds a new platform to the platforms list in the storage.
 * It checks if the platform already exists before adding it, ensuring no duplicates are created.
 * @param platform - Platform to add
 * @throws {StorageError} If update fails
 */
export const addPlatform = async (platform: Platform): Promise<void> => {
  const isPlatformExist = currentStorage.platforms.some(p => p.url.toLowerCase() === platform.url.toLowerCase());
  if(!isPlatformExist){
    const updated = [...currentStorage.platforms, platform];
    currentStorage.platforms = updated;
    await updateStorage({ platforms: updated });
  }
};

/**
 * Updates an existing platform
 * 
 * This function is like a platform editor, it updates an existing platform in the platforms list.
 * It finds the platform by its URL and updates it with the new data.
 * @param platform - Updated platform data
 * @throws {StorageError} If platform not found or update fails
 */
export const updatePlatform = async (platform: Platform): Promise<void> => {
  const index = currentStorage.platforms.findIndex(p => p.url.toLowerCase() === platform.url.toLowerCase());
  
  if (index === -1) {
    throw new StorageError('Platform not found');
  }
  currentStorage.platforms[index] = platform;
  await updateStorage({ platforms: currentStorage.platforms });
};

/**
 * Clears all storage data.
 * 
 * This function is like a storage cleaner, clearing all the data from the storage.
 * It's a convenient way to reset the storage to its initial state.
 * 
 * @throws {StorageError} If clear operation fails. 
 * Agar clear nahi hua, toh mujhe toh samajh nahi aayega, bhai!
 */
export const clearStorage = async (): Promise<void> => {
  await updateStorage({ timeSpent: {}, platforms: [] });
}; 