import React from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanySizeFilter, getFilterSettings } from 'src/selectors';
import { getAddContactList, updateCompany } from 'src/actions';
import { EditPopup } from '..';
import { ICompanySizeCell } from './interfaces';
import { ItemsEdit } from './ItemsEdit';
import { ICompanySize } from '../../../../interfaces';

export const companySizeCell = ({
  id,
  min_employees,
  max_employees,
  contactID,
  ...props
}: ICompanySizeCell) => (
  tdProps: React.PropsWithChildren<TableCellBaseProps>
) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);
  const createSizeType = ({ name }: { name: string }) => name;
  const sizes = useSelector(getCompanySizeFilter);

  const items = sizes?.map(createSizeType);

  const selectedSizeCompanyBySize = (
    min_employ: number | null,
    max_employ: number | null
  ) =>
    sizes?.find(
      ({ min, max }: ICompanySize) => min_employ === min && max_employ === max
    )?.name;

  const selectedSizeCompanyByName = (nameSize: string) =>
    sizes?.find(({ name }: ICompanySize) => name === nameSize);

  const currentValue = selectedSizeCompanyBySize(
    min_employees || null,
    max_employees || null
  );

  const ContentTD = () => <div>{currentValue}</div>;

  const sendData = async (newData: string) => {
    const size: ICompanySize | undefined = selectedSizeCompanyByName(newData);
    await updateCompany(
      id,
      {
        min_employees: size?.min,
        max_employees: size?.max
      },
      contactID
    );
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
