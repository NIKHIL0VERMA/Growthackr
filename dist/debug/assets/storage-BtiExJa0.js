import { c as colorLog, L as LogTypes } from "./messages-DZkklMRP.js";
class StorageError extends Error {
  constructor(message) {
    super(message);
    this.name = "StorageError";
  }
}
let currentStorage = null;
const storageListeners = [];
const initStorage = async () => {
  if (currentStorage !== null) return;
  const data = await getStorageData();
  currentStorage = data;
  colorLog("Storage initialized", LogTypes.SUCCESS);
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes.timeSpent) {
      currentStorage.timeSpent = changes.timeSpent.newValue;
    }
    if (changes.platforms) {
      currentStorage.platforms = changes.platforms.newValue;
    }
    notifyStorageListeners();
  });
};
const getStorageSnapshot = () => currentStorage;
const notifyStorageListeners = () => {
  storageListeners.forEach((cb) => cb(currentStorage));
};
const onStorageChange = (callback) => {
  storageListeners.push(callback);
};
const getStorageData = async (keys) => {
  try {
    return new Promise((resolve, reject) => {
      const storageKeys = keys ?? ["timeSpent", "platforms"];
      chrome.storage.local.get(storageKeys, (result) => {
        if (chrome.runtime.lastError) {
          reject(new StorageError(chrome.runtime.lastError.message));
          return;
        }
        const defaultValues = {
          timeSpent: {},
          platforms: []
        };
        const data = keys ? keys.reduce((acc, key) => {
          acc[key] = result[key] ?? defaultValues[key];
          return acc;
        }, {}) : {
          timeSpent: result.timeSpent ?? {},
          platforms: result.platforms ?? []
        };
        resolve(data);
      });
    });
  } catch (error) {
    colorLog(`Failed to get storage data: ${error}`, LogTypes.ERROR);
    throw new StorageError("Failed to access storage");
  }
};
const updateStorage = async (updates) => {
  try {
    await new Promise((resolve, reject) => {
      chrome.storage.local.set(updates, () => {
        if (chrome.runtime.lastError) {
          reject(new StorageError(chrome.runtime.lastError.message));
          return;
        }
        colorLog("Storage updated", LogTypes.SUCCESS);
        resolve();
      });
    });
    return;
  } catch (error) {
    colorLog(`Failed to update storage: ${error}`, LogTypes.ERROR);
    throw new StorageError("Failed to update storage");
  }
};
const setTimeSpent = async (timeSpent) => {
  currentStorage.timeSpent = timeSpent;
  await updateStorage({ timeSpent });
};
const setPlatforms = async (platforms) => {
  currentStorage.platforms = platforms;
  await updateStorage({ platforms });
};
const addPlatform = async (platform) => {
  const isPlatformExist = currentStorage.platforms.some((p) => p.url.toLowerCase() === platform.url.toLowerCase());
  if (!isPlatformExist) {
    const updated = [...currentStorage.platforms, platform];
    currentStorage.platforms = updated;
    await updateStorage({ platforms: updated });
  }
};
const updatePlatform = async (platform) => {
  const index = currentStorage.platforms.findIndex((p) => p.url.toLowerCase() === platform.url.toLowerCase());
  if (index === -1) {
    throw new StorageError("Platform not found");
  }
  currentStorage.platforms[index] = platform;
  await updateStorage({ platforms: currentStorage.platforms });
};
const clearStorage = async () => {
  await updateStorage({ timeSpent: {}, platforms: [] });
};
export {
  addPlatform as a,
  setPlatforms as b,
  clearStorage as c,
  updateStorage as d,
  getStorageSnapshot as g,
  initStorage as i,
  onStorageChange as o,
  setTimeSpent as s,
  updatePlatform as u
};
//# sourceMappingURL=storage-BtiExJa0.js.map
