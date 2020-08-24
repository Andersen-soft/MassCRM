import React from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IContact } from 'src/interfaces';
import { getAddContactList, updateContact, updateCompany } from 'src/actions';
import { TableCellText } from 'src/components/common/Table/components';
import { getFilterSettings } from 'src/selectors';
import { SocialIcon } from '../../../components/common/SocialIcon';

export const textCell = (
  id: number,
  name: string,
  value = '',
  required?: boolean,
  isCompany?: boolean,
  link?: string,
  socialName?: string,
  validation?: (val: string) => string | false
) => ({ className }: React.PropsWithChildren<TableCellBaseProps>) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);

  const onSubmitHandler = (val?: string) => {
    const newValue: IContact = {};
    newValue[name] = val;
    const doAfterSave = () => dispatch(getAddContactList(filter));
    return isCompany
      ? updateCompany(id, newValue).then(doAfterSave)
      : updateContact(newValue, id).then(doAfterSave);
  };

  return (
    <TableCellText
      onSubmitChanges={onSubmitHandler}
      value={value}
      className={className}
      required={required}
      link={link}
      td={socialName && <SocialIcon socialName={socialName} link={link} />}
      validation={validation}
    />
  );
};
