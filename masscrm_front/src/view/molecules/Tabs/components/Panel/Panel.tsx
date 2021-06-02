import React, { FC } from 'react';

interface IProps {
  tabKey: string | number;
  selected: string | number;
}

export const Panel: FC<IProps> = ({ tabKey, selected, children }) => {
  return tabKey === selected ? <>{children}</> : null;
};
