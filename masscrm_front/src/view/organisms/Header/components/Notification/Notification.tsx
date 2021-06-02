import React, { FC, useCallback } from 'react';
import { INotification, INotificationPayload } from 'src/interfaces';
import { Tabs } from 'src/view/molecules';
import { useTabsState } from 'src/hooks';
import { CustomList } from './components';
import { TABS_STATE_PARAMS, TABS_CONFIG } from './constants';
import { useStyles } from './Notification.styles';

interface IProps {
  getResult?: (type: string, id: number, payload: INotificationPayload) => void;
  newNotification: INotification[];
  historyNotification: INotification[];
}

export const Notification: FC<IProps> = ({
  getResult,
  newNotification,
  historyNotification
}) => {
  const styles = useStyles();

  const tabsState = useTabsState(TABS_STATE_PARAMS);

  const handleChangeTab = useCallback(
    (selectedTab: string | number) => {
      tabsState.onChangeTab(selectedTab);
    },
    [tabsState]
  );

  return (
    <>
      <Tabs
        className={styles.tabs}
        contentClassName={styles.tabContent}
        defaultSelected={tabsState.selectedTab}
        tabsConfig={TABS_CONFIG}
        onChange={handleChangeTab}
      >
        {TABS_CONFIG.map(({ label }) => (
          <CustomList
            key={label}
            list={label === 'New' ? newNotification : historyNotification}
            getResult={getResult}
          />
        ))}
      </Tabs>
    </>
  );
};
