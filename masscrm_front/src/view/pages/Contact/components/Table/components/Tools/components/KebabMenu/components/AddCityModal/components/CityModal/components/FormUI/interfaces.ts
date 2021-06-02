import { IFormItem } from 'src/interfaces';

export interface IFormikProps {
  values: {
    location: IFormItem[];
  };
  setFieldValue: Function;
  errors: {
    location: IFormItem[];
  };
}
