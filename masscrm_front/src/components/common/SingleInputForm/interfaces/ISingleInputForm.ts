import { ICommonInputProps } from 'src/components/common/CommonInput/interfaces';

export interface ISingleInputFormProps {
  inputProps: ICommonInputProps;
  onSubmit: (val?: string) => void;
  onCancel: () => void;
  items?: Array<string>;
  validation?: (val: string) => string | false;
}

export interface ISingleInputForm {
  editInput?: string;
}
