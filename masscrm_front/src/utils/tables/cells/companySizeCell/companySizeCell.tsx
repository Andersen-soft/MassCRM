import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCompanySizeFilter,
  getFilterSettings,
  getAddContactList,
  updateCompany
} from 'src/store/slices';
import { ICompanySize } from 'src/interfaces';
import { EditPopup } from 'src/view/atoms';
import { ItemsEdit } from 'src/view/molecules';

interface IProps {
  id: number;
  contactID: number;
  min_employees?: number;
  max_employees?: number;
  doubleClickEdit?: boolean;
}

export const companySizeCell = ({
  id,
  min_employees,
  max_employees,
  contactID,
  doubleClickEdit,
  ...props
}: IProps) => (tdProps: PropsWithChildren<TableCellBaseProps>) => {
  const dispatch = useDispatch();

  const filter = useSelector(getFilterSettings);
  const sizes = useSelector(getCompanySizeFilter);

  const createSizeType = ({ name }: { name: string }) => name;

  const items = sizes?.map(createSizeType);

  const selectedSizeCompanyBySize = (
    minNumberOfEmployees: number | null,
    maxNumberOfEmployees: number | null
  ) =>
    sizes?.find(
      ({ min, max }: ICompanySize) =>
        minNumberOfEmployees === min && maxNumberOfEmployees === max
    )?.name;

  const selectedSizeCompanyByName = (nameSize: string) => {
    return sizes?.find(({ name }: ICompanySize) => name === nameSize);
  };

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
      doubleClickEdit={doubleClickEdit}
    />
  );
};
