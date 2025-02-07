function print(logFn: typeof console.log, style: string, ...args: any[]) {
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
  
  export function log(...args: any[]) {
    if (process.env.NODE_ENV === "development")
      print(
        console.log,
        'color: white; background-color: #1e8e3e; padding: 2px 4px; border-radius: 3px; font-weight: bold',
        ...args,
      );
  }
  
  export const logger = {
    log,
  };