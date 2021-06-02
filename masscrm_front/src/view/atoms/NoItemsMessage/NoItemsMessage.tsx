import React, { FC } from 'react';
import { useStyles } from './NoItemsMessage.styles';

interface IProps {
  items: string;
}

export const NoItemsMessage: FC<IProps> = ({ items }) => {
  const styles = useStyles();

  return (
    <div
      className={styles.noItems}
    >{`There are no ${items} at the moment.`}</div>
  );
};

export default NoItemsMessage;
