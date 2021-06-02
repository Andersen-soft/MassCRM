import { IUser } from 'src/interfaces';

export interface IAutocompleteMap {
  [key: string]: (item: IUser) => string | undefined;
}
