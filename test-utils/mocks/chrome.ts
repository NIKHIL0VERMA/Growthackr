export const mockChrome = {
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
      clear: jest.fn(),
    },
  },
  runtime: {
    lastError: null,
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
  tabs: {
    query: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
  alarms: {
    create: jest.fn(),
    clear: jest.fn(),
    onAlarm: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
};

// Reset mocks before each test
beforeEach(() => {
  Object.values(mockChrome.storage.local).forEach(mock => mock.mockClear());
  Object.values(mockChrome.runtime).forEach(mock => {
    if (typeof mock === 'function') mock.mockClear();
  });
  Object.values(mockChrome.tabs).forEach(mock => mock.mockClear());
  Object.values(mockChrome.alarms).forEach(mock => {
    if (typeof mock === 'function') mock.mockClear();
  });
  mockChrome.runtime.lastError = null;
}); 