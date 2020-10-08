import React from 'react';
import { IHistoryProps } from '../../../interfaces';
import { CustomList } from '../../../../common/CustomList';

export const History = ({ list, getResult }: IHistoryProps) => {
  return (
    <>
      <CustomList list={list} getResult={getResult} />
    </>
  );
};
