import React, { FC } from 'react';
import { InfoItemValue } from './interfaces';
import { useStyles } from './InfoItem.styles';

interface IProps {
  title: string;
  value?: InfoItemValue;
  showMore?: string | false | JSX.Element;
  renderItem: (value?: InfoItemValue, label?: string) => JSX.Element;
}

export const InfoItem: FC<IProps> = ({
  title,
  value,
  showMore,
  renderItem
}) => {
  const styles = useStyles();

  return (
    <div className={styles.item} key={title}>
      {renderItem(value, title)}
      {showMore}
    </div>
  );
};
