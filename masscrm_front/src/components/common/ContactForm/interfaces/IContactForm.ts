import { FormikProps } from 'formik';
import { IContactFormInputs } from './index';

export interface IContactForm {
  edit?: boolean;
  formik: FormikProps<IContactFormInputs>;
  isEditedFullName: boolean;
  onChangeFullName: Function;
  onChangeIndustry: Function;
  setSearchField: Function;
  handleChange: Function;
  handleChangeFirstLastName: Function;
  setFieldValueHandler: Function;
  setFieldValues: Function;
  industries: Array<string>;
  companies: Array<string>;
  companySizeFilter: Array<string>;
  onCancel?: () => void;
  origins?: Array<string>;
  companyTypes?: Array<string>;
  isFullForm?: boolean;
  onChangeSubsidiary: Function;
  onChangeHolding: Function;
  autoFocus?: string;
}
