import { useState, useCallback, useMemo } from 'react';

export interface UseTabsStateParams {
  tabsList: (string | number)[];
  defaultSelected?: string | number;
}

export const useTabsState = (params: UseTabsStateParams) => {
  const { defaultSelected, tabsList } = params;
  const [selectedTab, changeSelectedTab] = useState(defaultSelected || '');

  const handleChangeSelectedTab = useCallback((value: string | number) => {
    changeSelectedTab(value);
  }, []);

  const getNextTab = useCallback(() => {
    const currentIndex = tabsList.findIndex(tab => tab === selectedTab);
    const nextTabKey = tabsList[currentIndex + 1];

    return nextTabKey;
  }, [selectedTab, tabsList]);

  const getPrevTab = useCallback(() => {
    const currentIndex = tabsList.findIndex(tab => tab === selectedTab);
    const prevTabKey = tabsList[currentIndex - 1];

    return prevTabKey;
  }, [selectedTab, tabsList]);

  const handleNextTab = useCallback(() => {
    const nextTabKey = getNextTab();

    if (nextTabKey) {
      changeSelectedTab(nextTabKey);
    }
  }, [getNextTab]);

  const handlePrevTab = useCallback(() => {
    const prevTabKey = getPrevTab();

    if (prevTabKey) {
      changeSelectedTab(prevTabKey);
    }
  }, [getPrevTab]);

  return useMemo(
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
