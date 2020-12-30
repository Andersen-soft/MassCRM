import React, { FC, useCallback, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { SearchInput } from 'src/components/common/SearchInput';
import { getContactListRequest } from 'src/actions';
import { IContact } from 'src/interfaces';
import {
  getContactByFullName,
  getNamesOfContacts,
  getContactFullNameByID
} from 'src/utils/map/contact.map';

const handleContacts = ({ data }: any, id: number) =>
  data.filter(({ company_id }: any) => company_id !== id);

export const ContactByEmail: FC<{
  name: string;
  errorMessage?: string;
  placeholder: string;
  error?: string;
  required?: boolean;
  value: string;
  onSelect: (value?: IContact) => void;
  id: number;
}> = ({ onSelect, value, id, ...props }) => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const items = getNamesOfContacts(contacts) || [];
  const inputValue = useMemo(
    () =>
      Number.isInteger(value)
        ? getContactFullNameByID(Number(value), contacts)
        : value,
    [value]
  );

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
      value={inputValue}
      {...props}
      items={items}
      onChange={onChangeHandler}
      onSelect={onSelectHandler}
    />
  );
};
