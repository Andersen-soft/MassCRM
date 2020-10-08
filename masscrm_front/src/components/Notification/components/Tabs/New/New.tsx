import React from 'react';
import { CustomList } from '../../../../common/CustomList';
import { INewProps } from '../../../interfaces';

export const New = ({ list, getResult }: INewProps) => {
  return (
    <>
      <CustomList list={list} getResult={getResult} />
    </>
  );
};
