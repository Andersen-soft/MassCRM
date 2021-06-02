import { ContactsJobs, IIndustry } from 'src/interfaces';
import { FormikProps } from 'formik';

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
  industries: string[];
  companies: string[];
  companySizeFilter: string[];
  onCancel?: () => void;
  companyTypes?: string[];
  isFullForm?: boolean;
  onChangeSubsidiary: Function;
  onChangeHolding: Function;
  autoFocus?: string;
}

export interface ICompanyFormInputs {
  [index: string]:
    | number
    | string
    | undefined
    | string[]
    | IIndustry[]
    | boolean
    | ContactsJobs
    | number[];
  id?: number;
  name: string;
  website?: string;
  linkedin?: string;
  sto_full_name?: string;
  type?: string;
  founded?: string;
  companySize?: string;
  min_employees?: number;
  max_employees?: number;
  comment?: string;
  industry?: any;
  subsidiary?: any;
  holding?: any;
  vacancies?: ContactsJobs;
}
