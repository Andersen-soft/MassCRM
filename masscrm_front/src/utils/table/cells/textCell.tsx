import React from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IContact, IContactResult } from 'src/interfaces';
import { getAddContactList, updateContact, updateCompany } from 'src/actions';
import { TableCellText } from 'src/components/common/Table/components';
import { getFilterSettings } from 'src/selectors';
import { format } from 'date-fns';

interface ITextCell {
  id: number;
  name: string;
  value?: string;
  switchValue?: boolean;
  required?: boolean;
  isCompany?: boolean;
  link?: string;
  validation?: (val: string) => string | false;
  contact?: IContactResult;
  type?: 'link' | 'text' | 'switch' | 'linkedin' | 'skype';
  isDate?: boolean;
  href?: string;
}

export const textCell = ({
  id,
  name,
  isCompany,
  link,
  value = '',
  contact,
  isDate,
  ...props
}: ITextCell) => ({
  className
}: React.PropsWithChildren<TableCellBaseProps>) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);

  const onSubmitHandler = (val?: string | boolean) => {
    const newValue: IContact = {};

    newValue[name] =
      isDate && val && typeof val === 'string'
        ? format(new Date(val), 'd.MM.yyyy')
        : val;

    const doAfterSave = () => dispatch(getAddContactList(filter));

    return isCompany
      ? updateCompany(id, newValue, contact?.id).then(doAfterSave)
      : updateContact(newValue, id).then(doAfterSave);
  };

  return (
    <TableCellText
      {...props}
      value={value}
      onSubmitChanges={onSubmitHandler}
      className={className}
      link={link}
      isDate={isDate}
    />
  );
};
