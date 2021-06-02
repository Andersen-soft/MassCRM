import { IContactResult, IUser } from 'src/interfaces';

export interface IContactTableAutocompleteState {
  [key: string]: IUser[] | IContactResult[];
  responsible: IUser[];
  other: IContactResult[];
}
