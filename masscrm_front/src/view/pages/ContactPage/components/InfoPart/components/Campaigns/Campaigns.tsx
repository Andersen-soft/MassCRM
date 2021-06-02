import React, { FC, useMemo } from 'react';
import { IContactResult } from 'src/interfaces';
import { infoPartStyles } from 'src/styles';
import { Item } from '..';
import { dataMap } from './constants';

interface IProps {
  contactData: IContactResult;
}

export const Campaigns: FC<IProps> = ({ contactData }) => {
  const infoPartClasses = infoPartStyles();

  const info = useMemo(
    () =>
      Object.keys(dataMap).map(item => (
        <div className={infoPartClasses.column} key={item}>
          <Item title={dataMap[item]} key={item} value={contactData[item]} />
        </div>
      )),
    [contactData]
  );

  return <div className={infoPartClasses.wrapper}>{info}</div>;
};
