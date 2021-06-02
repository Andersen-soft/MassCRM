import { IContactJobValues } from 'src/interfaces';

export interface IContactJobForm {
  anchorForm: { el: HTMLElement; index: number } | null;
  data: IContactJobValues | null;
  onChange: (data: IContactJobValues, index: number) => void;
  onClose: () => void;
}
