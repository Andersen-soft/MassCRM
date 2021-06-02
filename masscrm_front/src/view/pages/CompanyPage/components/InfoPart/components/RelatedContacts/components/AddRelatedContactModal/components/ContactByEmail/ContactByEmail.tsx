import React, { FC, useCallback, useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { SearchInput } from 'src/view/organisms';
import { getContactListRequest } from 'src/store/slices';
import { IContact } from 'src/interfaces';
import {
  getContactByFullName,
  getNamesOfContacts,
  getContactFullNameByID
} from 'src/utils';

interface IProps {
  name: string;
  errorMessage?: string;
  placeholder: string;
  error?: string;
  required?: boolean;
  value: string;
  onSelect: (value?: IContact) => void;
  id: number;
}

export const ContactByEmail: FC<IProps> = ({
  onSelect,
  value,
  id,
  ...props
}) => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  const items = getNamesOfContacts(contacts);

  const inputValue = useMemo(
    () =>
      Number.isInteger(value)
        ? getContactFullNameByID(+value, contacts)
        : value,
    [value]
  );

  const handleContacts = ({ data }: any, companyId: number) => {
    return data.filter(({ company_id }: any) => company_id !== companyId);
  };

  const onChangeHandler = debounce((email: string) => {
    if (!email) return;

    getContactListRequest({ search: { email } })
      .then((contactsData: any) => handleContacts(contactsData, id))
      .then(setContacts);
  }, 500);

  const onSelectHandler = useCallback(
    (val: string) => {
      onSelect(getContactByFullName(val, contacts));
    },
    [onSelect, contacts]
  );

  return (
    <SearchInput
      width='100%'
      value={inputValue}
      {...props}
      items={items}
      onChange={onChangeHandler}
      onSelect={onSelectHandler}
    />
  );
};
