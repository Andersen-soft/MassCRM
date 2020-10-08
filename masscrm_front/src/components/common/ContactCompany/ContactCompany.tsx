import React, { FC, useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { SearchInput } from 'src/components/common/SearchInput';
import {
  getNamesOfCompanies,
  getCompanyByName,
  getCompanyNameByID
} from 'src/utils/map/company.map';
import { getCompanyList, getCompanyListRequest } from 'src/actions';
import { ICompany } from 'src/interfaces';

export const ContactCompany: FC<{
  name: string;
  errorMessage?: string;
  placeholder: string;
  error?: string;
  type?: string[];
  disabled?: boolean;
  required?: boolean;
  value?: string;
  id?: number;
  onSelect: (value?: ICompany) => void;
}> = ({ id, value, onSelect, type, ...props }) => {
  const dispatch = useDispatch();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const items = getNamesOfCompanies(companies) || [];
  const inputValue = Number.isInteger(value)
    ? getCompanyNameByID(Number(value), companies)
    : value;

  const onChangeHandler = debounce((val: string) => {
    getCompanyListRequest(
      val
        ? { search: { name: [val], type }, mode: 'all' }
        : { search: { type }, mode: 'all' }
    ).then(({ data }) => {
      if (data.length === 0) onSelect({ id: 0, name: val });
      return setCompanies(data);
    });
  }, 500);

  const onSelectHandler = useCallback(
    (val: string) => onSelect(getCompanyByName(val, companies)),
    [onSelect, companies]
  );

  useEffect(() => {
    dispatch(getCompanyList({ search: { type }, mode: 'all' }));
  }, [type]);

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
