import React, { useContext, useCallback } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IContact, IContactResult } from 'src/interfaces';
import {
  getAddContactList,
  updateContact,
  updateCompany,
  getContact
} from 'src/actions';
import { TableCellText } from 'src/components/common/Table/components';
import { getFilterSettings } from 'src/selectors';
import { ErrorEmitterContext } from 'src/context';
import { createErrorsObject, DoubleClickError } from '../../errors';
import { checkUrl } from '../../form/chekUrl';

interface ITextCell {
  id: number;
  name: string;
  value?: string;
  switchValue?: boolean;
  required?: boolean;
  isCompany?: boolean;
  link?: string;
  validation?: (val: string) => boolean;
  contact?: IContactResult;
  type?: 'link' | 'text' | 'switch' | 'linkedin' | 'skype';
  isDate?: boolean;
  href?: string;
  formatter?: (
    name: string,
    value?: string | boolean,
    isDate?: boolean
  ) => string | boolean | undefined;
}

export const textCell = ({
  id,
  name,
  isCompany,
  link,
  value = '',
  contact,
  isDate,
  formatter,
  ...props
}: ITextCell) => ({
  className
}: React.PropsWithChildren<TableCellBaseProps>) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);
  const { errorsEventEmitter } = useContext(ErrorEmitterContext);

  const getFormattedValue = useCallback(
    (inputValue?: string | boolean) => {
      if (typeof formatter === 'function')
        return formatter(name, inputValue, isDate);

      return inputValue;
    },
    [formatter]
  );

  const onSubmitHandler = (val?: string | boolean) => {
    const newValue: IContact = {};

    newValue[name] = getFormattedValue(val);

    const FULL_NAME_MAP: { [key: string]: string } = {
      first_name: `${val} ${contact?.last_name}`,
      last_name: `${contact?.first_name} ${val}`,
      full_name: `${val}`,
      default: `${contact?.first_name} ${contact?.last_name}`
    };

    newValue.full_name = val ? FULL_NAME_MAP[name] : FULL_NAME_MAP.default;

    const errorCallback = (inputValue: string) => (errors: string) => {
      const parseError = JSON.parse(errors);

      const createError = (title: string[]) => (data: any) => {
        const errorsObject = createErrorsObject(title, data);
        errorsEventEmitter.emit('popUpErrors', {
          errorsArray: [JSON.stringify(errorsObject)]
        });
      };
      if (
        parseError.linkedin &&
        parseError.linkedin
          ?.toString()
          .includes('This LinkedIn is already used')
      ) {
        getContact({
          search: { linkedin: checkUrl(inputValue), skip_responsibility: 1 }
        }).then(createError(parseError.linkedin));
      } else if (
        parseError.linkedin?.toString().includes('This Email is already used')
      ) {
        getContact({
          search: { linkedin: checkUrl(inputValue), skip_responsibility: 1 }
        }).then(createError(parseError.linkedin));
      } else if (errors) {
        errorsEventEmitter.emit('snackBarErrors', {
          errorsArray: [DoubleClickError(errors)]
        });
      }
    };

    const doAfterSave = () => dispatch(getAddContactList(filter));

    return isCompany
      ? updateCompany(id, newValue, contact?.id)
          .then(doAfterSave)
          .catch(errorCallback(val as string))
      : updateContact(newValue, id)
          .then(doAfterSave)
          .catch(errorCallback(val as string));
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
