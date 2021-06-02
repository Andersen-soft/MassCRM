import React, { useContext, useCallback, PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  IContact,
  IContactResult,
  ICompanyOrContactArgs
} from 'src/interfaces';
import {
  getAddContactList,
  updateContact,
  updateCompany,
  getContact,
  getFilterSettings
} from 'src/store/slices';
import { ErrorsEmitterContext } from 'src/contexts';
import { createErrorsObject, DoubleClickError, checkUrl } from 'src/utils';
import {
  COMPANY_DUPLICATE_ERRORS,
  POPUP_ERRORS,
  SNACKBAR_ERRORS
} from 'src/constants';
import { Edit } from './components';

interface IProps {
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
  doubleClickEdit?: boolean;
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
  doubleClickEdit,
  ...props
}: IProps) => ({ className }: PropsWithChildren<TableCellBaseProps>) => {
  const dispatch = useDispatch();

  const filter = useSelector(getFilterSettings);

  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

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
      ? errorsEventEmitter.emit(COMPANY_DUPLICATE_ERRORS, {
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
        }).then(createError(error[wrongField], POPUP_ERRORS));
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
        errorsEventEmitter.emit(COMPANY_DUPLICATE_ERRORS, {
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
        errorsEventEmitter.emit(SNACKBAR_ERRORS, {
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
    <Edit
      {...props}
      value={value}
      onSubmitChanges={onSubmitHandler}
      className={className}
      link={link}
      isDate={isDate}
      doubleClickEdit={doubleClickEdit}
    />
  );
};
