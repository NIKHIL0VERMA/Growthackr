const COLORS = {
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m"
};
function print(logFn, style, ...args) {
  if (typeof args[0] === "string") {
    const newArgs = [...args];
    logFn(
      `Growthackr %c${(/* @__PURE__ */ new Date()).toLocaleTimeString()}%c${newArgs.shift()}`,
      style,
      "",
      ...newArgs
    );
  } else {
    logFn("%cGrowthackr", style, ...args);
  }
}
function log(cnsl, ...args) {
  print(
    cnsl,
    "color: white; background-color: #1e8e3e; padding: 2px 4px; border-radius: 3px; font-weight: bold",
    ...args
  );
}
var LogTypes = /* @__PURE__ */ ((LogTypes2) => {
  LogTypes2[LogTypes2["SUCCESS"] = 0] = "SUCCESS";
  LogTypes2[LogTypes2["INFO"] = 1] = "INFO";
  LogTypes2[LogTypes2["ERROR"] = 2] = "ERROR";
  LogTypes2[LogTypes2["WARNING"] = 3] = "WARNING";
  return LogTypes2;
})(LogTypes || {});
const colorLog = (message, type) => {
  let color = COLORS.FgBlack;
  let cnsl = console.log;
  switch (type) {
    case 0:
      color = COLORS.FgGreen;
      break;
    case 1:
      cnsl = console.info;
      color = COLORS.FgBlue;
      break;
    case 2:
      cnsl = console.error;
      color = COLORS.FgRed;
      break;
    case 3:
      cnsl = console.warn;
      color = COLORS.FgYellow;
      break;
  }
  log(cnsl, " " + color + String(message));
};
var MessageAction = /* @__PURE__ */ ((MessageAction2) => {
  MessageAction2["WELCOME_COMPLETED"] = "welcomeCompleted";
  MessageAction2["CLOSE_TAB"] = "closeTab";
  MessageAction2["CLOSE_OPTIONS_PAGE"] = "closeOptionsPage";
  MessageAction2["OPNE_OPTIONS_PAGE"] = "openOptionsPage";
  MessageAction2["GET_TIME_SPENT"] = "getTimeSpent";
  MessageAction2["GET_PLATFORMS"] = "getPlatforms";
  MessageAction2["SET_PLATFORMS"] = "setPlatforms";
  MessageAction2["ADD_PLATFORM"] = "addPlatform";
  MessageAction2["UPDATE_PLATFORM"] = "updatePlatform";
  MessageAction2["CLEAR_STORAGE"] = "clear";
  MessageAction2["SYNC_THEME"] = "syncTheme";
  return MessageAction2;
})(MessageAction || {});
export {
  LogTypes as L,
  MessageAction as M,
  colorLog as c
};
//# sourceMappingURL=messages-DZkklMRP.js.map
