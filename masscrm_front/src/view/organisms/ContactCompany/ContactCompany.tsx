import React, { FC, useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { SearchInput } from 'src/view/organisms';
import {
  getNamesOfCompanies,
  getCompanyByName,
  getCompanyNameByID
} from 'src/utils';
import { getCompanyListRequest } from 'src/store/slices';
import { ICompany } from 'src/interfaces';

interface IProps {
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
  autoFocus?: string;
}

export const ContactCompany: FC<IProps> = ({
  id,
  value,
  onSelect,
  type,
  ...props
}) => {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  const items = getNamesOfCompanies(companies) || [];

  const inputValue = Number.isInteger(value)
    ? getCompanyNameByID(companies, Number(value))
    : value;

  const onChangeHandler = debounce((val: string) => {
    getCompanyListRequest(
      val
        ? { search: { name: [val], type }, mode: 'all' }
        : { search: { type }, mode: 'all' }
    ).then(({ data }) => {
      if (!data.length) {
        onSelect({ id: 0, name: val });
      }
      return setCompanies(data);
    });
  }, 500);

  const onSelectHandler = useCallback(
    (val: string) =>
      onSelect(val ? getCompanyByName(val, companies) : { id: 0, name: '' }),
    [onSelect, companies]
  );

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
