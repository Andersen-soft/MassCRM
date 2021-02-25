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

interface ICompanyOrContactArgs {
  error: { [key: string]: string[] };
  inputValue: string;
  submitFunction: Function;
  wrongField: string;
  isUrl?: boolean;
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
    [formatter, value]
  );

  const createError = (title: string[], errorName: string) => (data: any) => {
    const errorsObject = createErrorsObject(title, data);
    errorsEventEmitter.emit(errorName, {
      errorsArray: [JSON.stringify(errorsObject)]
    });
  };

  const companyOrContact = ({
    error,
    inputValue,
    wrongField,
    submitFunction,
    isUrl
  }: ICompanyOrContactArgs) => {
    return isCompany
      ? errorsEventEmitter.emit('companyDuplicateErrors', {
          errorsObject: [
            {
              title: error.website
                ? [...error.linkedin, ...error.website]
                : error.linkedin,
              value: inputValue,
              submitFunction
            }
          ]
        })
      : getContact({
          search: {
            [wrongField]: isUrl ? checkUrl(inputValue) : inputValue,
            skip_responsibility: 1
          }
        }).then(createError(error[wrongField], 'popUpErrors'));
  };

  const onSubmitHandler = (
    val?: string | boolean,
    skipValidation?: boolean
  ) => {
    const newValue: IContact = {};
    newValue[name] = getFormattedValue(val);

    const skip_validation = skipValidation ? 1 : 0;
    const errorCallback = (inputValue: string) => (errors: string) => {
      const parseError = JSON.parse(errors);
      const islinkedInDuplicate = parseError.linkedin
        ?.toString()
        .includes('LinkedIn is already used');
      const isWebsitenDuplicate = parseError.website
        ?.toString()
        .includes('website is already');

      if (islinkedInDuplicate) {
        companyOrContact({
          error: parseError,
          inputValue,
          wrongField: 'linkedin',
          submitFunction: onSubmitHandler,
          isUrl: true
        });
      }
      if (isWebsitenDuplicate) {
        errorsEventEmitter.emit('companyDuplicateErrors', {
          errorsObject: [
            {
              title:
                islinkedInDuplicate && isWebsitenDuplicate
                  ? [...parseError.linkedin, ...parseError.website]
                  : parseError.website || parseError.linkedin,
              value: checkUrl(inputValue),
              submitFunction: onSubmitHandler
            }
          ]
        });
      } else if (errors && !islinkedInDuplicate && !isWebsitenDuplicate) {
        errorsEventEmitter.emit('snackBarErrors', {
          errorsArray: [DoubleClickError(errors)]
        });
      }
    };

    const FULL_NAME_MAP: { [key: string]: string } = {
      first_name: `${val} ${contact?.last_name}`,
      last_name: `${contact?.first_name} ${val}`,
      full_name: `${val}`,
      default: `${contact?.first_name} ${contact?.last_name}`
    };

    newValue.full_name = val ? FULL_NAME_MAP[name] : FULL_NAME_MAP.default;

    const doAfterSave = () => dispatch(getAddContactList(filter));

    return isCompany
      ? updateCompany(id, { ...newValue, skip_validation }, contact?.id)
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
