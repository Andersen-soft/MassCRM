import React, { FC, memo } from 'react';
import { infoPartStyles } from 'src/styles';

interface IProps {
  title: string;
  value?: Element | string;
}

const InfoPartItem: FC<IProps> = ({ value, title }) => {
  const infoPartClasses = infoPartStyles();

  return (
    <div className={infoPartClasses.item}>
      <span className={infoPartClasses.spanLeft}>{title}:</span>
      <span className={infoPartClasses.spanRight}>{value}</span>
    </div>
  );
};

export const Item = memo(InfoPartItem);
