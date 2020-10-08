import React from 'react';
import { useTabsState } from '../../hooks/tabs.hook';
import { Tabs } from '../common/Tabs';
import { New } from './components/Tabs/New';
import { History } from './components/Tabs/History';
import { useStyles } from './Notification.styles';
import { INotificationProps } from './interfaces';

interface TabConfig {
  key: string | number;
  label: string;
}

const TABS_CONFIG: Array<TabConfig> = [
  {
    key: 'New',
    label: 'New'
  },
  {
    key: 'History',
    label: 'History'
  }
];

const TABS_LIST = TABS_CONFIG.map((tabConfig: TabConfig) => tabConfig.key);
const DEFAULT_SELECTED_TAB = TABS_CONFIG[0].key;
const TABS_STATE_PARAMS = {
  tabsList: TABS_LIST,
  defaultSelected: DEFAULT_SELECTED_TAB
};

export const Notification = ({
  getResult,
  newNotification,
  historyNotification
}: INotificationProps) => {
  const classes = useStyles();
  const tabsState = useTabsState(TABS_STATE_PARAMS);
  const handleChangeTab = React.useCallback(
    (selectedTab: string | number) => {
      tabsState.onChangeTab(selectedTab);
    },
    [tabsState]
  );

  return (
    <>
      <Tabs
        className={classes.tabs}
        defaultSelected={tabsState.selectedTab}
        tabsConfig={TABS_CONFIG}
        onChange={handleChangeTab}
      >
        <New list={newNotification || []} getResult={getResult} />
        <History list={historyNotification || []} getResult={getResult} />
      </Tabs>
    </>
  );
};
