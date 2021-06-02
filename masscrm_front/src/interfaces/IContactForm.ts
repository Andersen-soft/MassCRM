import { FormikProps } from 'formik';
import { IContactFormInputs } from 'src/interfaces';

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
  industries: string[];
  companies: string[];
  companySizeFilter: string[];
  onCancel?: () => void;
  origins?: string[];
  companyTypes?: string[];
  isFullForm?: boolean;
  onChangeSubsidiary: Function;
  onChangeHolding: Function;
  autoFocus?: string;
}
