import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilterSettings,
  getIndustries,
  getAddContactList,
  updateCompany
} from 'src/store/slices';
import { findIndustryIDByName, getNamesOfIndustry } from 'src/utils';
import { IIndustry } from 'src/interfaces';
import { EditPopup } from 'src/view/atoms';
import { ItemsEdit } from 'src/view/molecules';
import { ShowAllTD } from 'src/view/organisms';

interface IProps {
  id: number;
  contactID: number;
  value: IIndustry[];
  doubleClickEdit?: boolean;
}

export const industryCell = ({
  id,
  value,
  contactID,
  doubleClickEdit,
  ...props
}: IProps) => (tdProps: PropsWithChildren<TableCellBaseProps>) => {
  const dispatch = useDispatch();

  const filter = useSelector(getFilterSettings);
  const industryList = useSelector(getIndustries);

  const items = getNamesOfIndustry(industryList);
  const values = getNamesOfIndustry(value);

  const ContentTD = () => <ShowAllTD value={value.map(({ name }) => name)} />;

  const sendData = async (newData: string[]) => {
    const industries = findIndustryIDByName(newData, industryList) || value;

    await updateCompany(id, { industries }, contactID);
    dispatch(getAddContactList(filter));
  };

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value: values, items, sendData, multi: true, ...props }}
      ContentTD={ContentTD}
      ContentEdit={ItemsEdit}
      disabled={!id}
      doubleClickEdit={doubleClickEdit}
    />
  );
};
