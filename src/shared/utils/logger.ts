/**
 * Defines the color codes for console logging.
 * 
 * This object is like a color palette for our console logs! It helps us make our logs look pretty and organized.
 * 
 * @type {{Reset: string, Bright: string, Dim: string, Underscore: string, Blink: string, Reverse: string, Hidden: string, FgBlack: string, FgRed: string, FgGreen: string, FgYellow: string, FgBlue: string, FgMagenta: string, FgCyan: string, FgWhite: string, BgBlack: string, BgRed: string, BgGreen: string, BgYellow: string, BgBlue: string, BgMagenta: string, BgCyan: string, BgWhite: string}}
 */
const COLORS = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",
  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
};

/**
 * Prints a log message with a specified style.
 * 
 * @param {Function} logFn - The logging function to use (e.g., console.log).
 * @param {string} style - The style to apply to the log message.
 * @param {...any} args - The arguments to pass to the logging function.
 * 
 * Is function se main apne messages ko stylish tareeke se log kar sakta hoon. 
 * Development mein toh style zaroori hai, boss!
 */
function print(logFn, style, ...args) {
  if (typeof args[0] === 'string') {
    const newArgs = [...args];
    logFn(
      `Growthackr %c${new Date().toLocaleTimeString()}%c${newArgs.shift()}`,
      style,
      '',
      ...newArgs,
    );
  } else {
    logFn('%cGrowthackr', style, ...args);
  }
}

/**
 * Logs a message to the console with a custom style for development environment.
 * 
 * @param {Function} cnsl - The console function to use (e.g., console.log).
 * @param {...any} args - The arguments to pass to the logging function.
 * 
 * Is function se main apne messages ko stylish tareeke se log kar sakta hoon. 
 * Development mein toh style zaroori hai, boss!
 */
export function log(cnsl, ...args) {
  if (process.env.NODE_ENV === 'development')
    print(
      cnsl,
      'color: white; background-color: #1e8e3e; padding: 2px 4px; border-radius: 3px; font-weight: bold',
      ...args,
    );
}

/**
 * Enum for defining log types.
 * 
 * This enum is like a menu for log types! It helps us categorize our logs into different types.
 * 
 * @enum {number}
 */
export enum LogTypes {
  SUCCESS,
  INFO,
  ERROR,
  WARNING
}

/**
 * Logs a message with a color based on the log type.
 * 
 * @param {string} message - The message to log.
 * @param {LogTypes} type - The type of log message. 
 * Alag-alag types ke liye alag-alag colors, kyunki variety is the spice of life!
 */
export const colorLog = (message, type: LogTypes) => {
  let color = COLORS.FgBlack;
  let cnsl = console.log;

  switch (type) {
  case LogTypes.SUCCESS:
    color = COLORS.FgGreen;
    break;
  case LogTypes.INFO:
    cnsl = console.info;
    color = COLORS.FgBlue;
    break;
  case LogTypes.ERROR:
    cnsl = console.error;
    color = COLORS.FgRed;
    break;
  case LogTypes.WARNING:
    cnsl = console.warn;
    color = COLORS.FgYellow;
    break;
  }

  log(cnsl, '\x20'+color+String(message));
}