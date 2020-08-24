import * as React from 'react';

interface Props {
  tabKey: string | number;
  selected: string | number;
}

export const TabPanel: React.FC<Props> = props => {
  const { tabKey, selected, children } = props;

  return tabKey === selected ? <>{children}</> : null;
};
