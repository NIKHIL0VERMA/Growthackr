import { StorageData, TimeSpentData, Platform } from '../types/storage';
import { colorLog, LogTypes } from "@src/shared/utils/logger";

/**
 * Error thrown when storage operations fail
 */
export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageError';
  }
}
/**
 * Type representing the keys of the StorageData
 */
type StorageKey = keyof StorageData;

/**
 * Asynchronous function to get the current storage data
 * @param keys - Optional array of keys to get from the storage
 * @returns Promise resolving to the current storage data
 * @throws {StorageError} If storage access fails
 */
export const getStorageData = async <T extends StorageKey>(
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
          ? (keys.reduce((acc, key) => {
              acc[key] = result[key] ?? defaultValues[key];
              return acc;
            }, {} as any) as Pick<StorageData, T>)
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
 * Updates the storage with new data
 * @param updates - Partial storage data to update
 * @throws {StorageError} If storage update fails
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
 * @param timeSpent - New time spent data
 * @throws {StorageError} If update fails
 */
export const setTimeSpent = async (timeSpent: TimeSpentData): Promise<void> => {
  await updateStorage({ timeSpent });
};

/**
 * Sets the platforms list
 * @param platforms - New platforms list
 * @throws {StorageError} If update fails
 */
export const setPlatforms = async (platforms: Platform[]): Promise<void> => {
  await updateStorage({ platforms });
};

/**
 * Adds a new platform to the list
 * @param platform - Platform to add
 * @throws {StorageError} If update fails
 */
export const addPlatform = async (platform: Platform): Promise<void> => {
  const {platforms} = await getStorageData(['platforms']);
  const isPlatformExist = platforms.some(p => p.url === platform.url);
  if(!isPlatformExist){
    platforms.push(platform);
  }
  await updateStorage({ platforms });
};

/**
 * Updates an existing platform
 * @param platform - Updated platform data
 * @throws {StorageError} If platform not found or update fails
 */
export const updatePlatform = async (platform: Platform): Promise<void> => {
  const {platforms} = await getStorageData(['platforms']);
  const index = platforms.findIndex(p => p.url === platform.url);
  
  if (index === -1) {
    throw new StorageError('Platform not found');
  }
  
  const updatedPlatforms = [...platforms];
  updatedPlatforms[index] = platform;
  await updateStorage({ platforms: updatedPlatforms });
};

/**
 * Clears all storage data
 * @throws {StorageError} If clear operation fails
 */
export const clearStorage = async (): Promise<void> => {
  await updateStorage({ timeSpent: {}, platforms: [] });
}; 