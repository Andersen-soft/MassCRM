export interface ITabConfig {
  key: string | number;
  label: string;
}

export type TabsConfig = ITabConfig[];

export interface DisabledTabs {
  [key: string]: boolean;
}
