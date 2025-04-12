import type { IconProp } from "@fortawesome/fontawesome-svg-core";
export interface TimeSpentData {
  [date: string]: {
    [domain: string]: number;
  };
}

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

export interface StorageData {
  timeSpent: TimeSpentData;
  platforms: Platform[];
  welcome?: boolean;
}