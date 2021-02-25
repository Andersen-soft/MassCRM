import { ICommonInputProps } from 'src/components/common/CommonInput/interfaces';

export interface ISingleInputFormProps {
  inputProps: ICommonInputProps;
  onSubmit: (val?: any) => void;
  onCancel: () => void;
  items?: Array<string>;
  validation?: (val: string) => boolean;
  type?: 'link' | 'text' | 'switch' | 'linkedin' | 'skype';
  switchValue?: boolean;
  isDate?: boolean;
  isDoubleClick?: boolean;
}

export interface ISingleInputForm {
  editInput?: any;
}
