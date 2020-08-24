import React, { FC } from 'react';
import { SearchInput } from 'src/components/common/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies } from 'src/selectors';
import {
  getNamesOfCompanies,
  getCompanyByName,
  getCompanyNameByID
} from 'src/utils/map/company.map';
import { getCompanyList } from 'src/actions';
import { ICompany } from 'src/interfaces';

export const ContactCompany: FC<{
  name: string;
  errorMessage?: string;
  placeholder: string;
  error?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  id?: number;
  onSelect: (value?: ICompany) => void;
}> = ({ id, value, onSelect, ...props }) => {
  const dispatch = useDispatch();
  const companies: ICompany[] = useSelector(getCompanies);
  const items = getNamesOfCompanies(companies);
  const inputValue = value || getCompanyNameByID(id, companies);

  const onChangeHandler = (val: string) => {
    dispatch(
      getCompanyList(
        val ? { search: { name: [val] }, mode: 'all' } : { mode: 'all' }
      )
    );
    if (items.length === 0) {
      onSelect({ id: 0, name: val });
    }
  };

  const onSelectHandler = (val: string) => {
    onSelect(getCompanyByName(val, companies));
  };

  return (
    <SearchInput
      {...props}
      value={inputValue}
      items={items}
      onChange={onChangeHandler}
      onSelect={onSelectHandler}
    />
  );
};
