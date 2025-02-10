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

function print(logFn, style, ...args) {
  if (typeof args[0] === 'string') {
    const newArgs = [...args];
    logFn(
      `Growthackr %c${new Date().toLocaleTimeString()}%c ${newArgs.shift()}`,
      style,
      'background-color: #eaf1fb; padding: 2px 4px; border-radius: 3px',
      '',
      ...newArgs,
    );
  } else {
    logFn('%cGrowthackr', style, ...args);
  }
}

export function log(...args) {
  if (process.env.NODE_ENV === 'development')
    print(
      console.log,
      'color: white; background-color: #1e8e3e; padding: 2px 4px; border-radius: 3px; font-weight: bold',
      ...args,
    );
}
enum LogTypes{SUCCESS, INFO, ERROR, WARNING};

function colorLog(message, type : LogTypes) {
  let color = COLORS.FgBlack;

  switch (type) {
    case LogTypes.SUCCESS:
      color = COLORS.FgGreen;
      break;
    case LogTypes.INFO:
      color = COLORS.FgBlue;
      break;
    case LogTypes.ERROR:
      color = COLORS.FgRed;
      break;
    case LogTypes.WARNING:
      color = COLORS.FgYellow;
      break;
  }

  log(message, `color: ${color};`);
}


export {
  colorLog, LogTypes,
};
