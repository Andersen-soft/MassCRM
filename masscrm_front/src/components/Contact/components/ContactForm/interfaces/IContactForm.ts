import { FormikProps } from 'formik';
import { IContactFormInputs } from './index';

export interface IContactForm {
  edit?: boolean;
  formik: FormikProps<IContactFormInputs>;
  isEditedFullName: boolean;
  onChangeFullName: Function;
  onChangeCountry: Function;
  onChangeRegion: Function;
  onChangeCompany: Function;
  onChangeIndustry: Function;
  setSearchField: Function;
  industries: Array<string>;
  companies: Array<string>;
  countries: Array<string>;
  regions: Array<string>;
  cities: Array<string>;
  companySizeFilter: Array<string>;
  onCancel?: () => void;
  origins?: Array<string>;
  companyTypes?: Array<string>;
  isFullForm?: boolean;
  onChangeSubsidiary: Function;
  onChangeHolding: Function;
}
