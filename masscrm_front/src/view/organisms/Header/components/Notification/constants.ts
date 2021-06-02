import { ITabConfig } from 'src/interfaces';

export const TABS_CONFIG: ITabConfig[] = [
  {
    key: 'New',
    label: 'New'
  },
  {
    key: 'History',
    label: 'History'
  }
];

const TABS_LIST = TABS_CONFIG.map(({ key }: ITabConfig) => key);

const DEFAULT_SELECTED_TAB = TABS_CONFIG[0].key;

export const TABS_STATE_PARAMS = {
  tabsList: TABS_LIST,
  defaultSelected: DEFAULT_SELECTED_TAB
};
