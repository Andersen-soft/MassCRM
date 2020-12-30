import { FormikProps } from 'formik';
import { ICompanyFormInputs } from '.';

export interface ICompanyForm {
  formik: FormikProps<ICompanyFormInputs>;
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
  companyTypes?: Array<string>;
  isFullForm?: boolean;
  onChangeSubsidiary: Function;
  onChangeHolding: Function;
  autoFocus?: string;
}
