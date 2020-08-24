import * as React from 'react';

export interface UseTabsStateParams {
  tabsList: Array<string | number>;
  defaultSelected?: string | number;
}

export const useTabsState = (params: UseTabsStateParams) => {
  const { defaultSelected, tabsList } = params;
  const [selectedTab, changeSelectedTab] = React.useState(
    defaultSelected || ''
  );

  const handleChangeSelectedTab = React.useCallback(
    (value: string | number) => {
      changeSelectedTab(value);
    },
    []
  );

  const getNextTab = React.useCallback(() => {
    const currentIndex = tabsList.findIndex(tab => tab === selectedTab);
    const nextTabKey = tabsList[currentIndex + 1];

    return nextTabKey;
  }, [selectedTab, tabsList]);

  const getPrevTab = React.useCallback(() => {
    const currentIndex = tabsList.findIndex(tab => tab === selectedTab);
    const prevTabKey = tabsList[currentIndex - 1];

    return prevTabKey;
  }, [selectedTab, tabsList]);

  const handleNextTab = React.useCallback(() => {
    const nextTabKey = getNextTab();

    if (nextTabKey) {
      changeSelectedTab(nextTabKey);
    }
  }, [getNextTab]);

  const handlePrevTab = React.useCallback(() => {
    const prevTabKey = getPrevTab();

    if (prevTabKey) {
      changeSelectedTab(prevTabKey);
    }
  }, [getPrevTab]);

  return React.useMemo(
    () => ({
      selectedTab,
      onChangeTab: handleChangeSelectedTab,
      onNextTab: handleNextTab,
      onPrevTab: handlePrevTab,
      getNextTab,
      getPrevTab
    }),
    [
      handleChangeSelectedTab,
      handleNextTab,
      handlePrevTab,
      getNextTab,
      getPrevTab,
      selectedTab
    ]
  );
};
