import React from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanySizeFilter, getFilterSettings } from 'src/selectors';
import { getAddContactList, updateCompany } from 'src/actions';
import { EditPopup } from '..';
import { ICompanySizeCell } from './interfaces';
import { ItemsEdit } from './ItemsEdit';

export const companySizeCell = ({
  id,
  min_employees,
  max_employees,
  ...props
}: ICompanySizeCell) => (
  tdProps: React.PropsWithChildren<TableCellBaseProps>
) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);
  const createSizeType = ({ min, max }: { min: number; max: number }) =>
    `${min}-${max}`;

  const items = useSelector(getCompanySizeFilter)?.map(createSizeType);

  const currentValue =
    min_employees && max_employees
      ? createSizeType({ min: min_employees, max: max_employees })
      : '';

  const ContentTD = () => <div>{currentValue}</div>;

  const sendData = async (newData: string) => {
    const size = newData.split('-');
    await updateCompany(id, {
      min_employees: +size[0],
      max_employees: +size[1]
    });
    dispatch(getAddContactList(filter));
  };

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value: currentValue, items, sendData, ...props }}
      ContentTD={ContentTD}
      ContentEdit={ItemsEdit}
      disabled={!id}
    />
  );
};
