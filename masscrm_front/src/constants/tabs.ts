import { ITabConfig } from 'src/interfaces';

const getTabsList = (tabButtonsConfig: ITabConfig[]) =>
  tabButtonsConfig.map((tabConfig: ITabConfig) => tabConfig.key);

const getDefaultSelectedTab = (tabButtonsConfig: ITabConfig[]) =>
  tabButtonsConfig[0].key;

export const getTabsStateParams = (tabButtonsConfig: ITabConfig[]) => ({
  tabsList: getTabsList(tabButtonsConfig),
  defaultSelected: getDefaultSelectedTab(tabButtonsConfig)
});
