export interface TabConfig {
  key: string | number;
  label: string;
}

export type TabsConfig = Array<TabConfig>;

export interface DisabledTabs {
  [key: string]: boolean;
}

export interface Props {
  defaultSelected: string | number;
  tabsConfig: TabsConfig;
  className?: string;
  contentClassName?: string;
  tabClassName?: string;
  disabledTabs?: DisabledTabs;
  selected?: string | number;

  onChange?: (selected: string | number) => void;
}
