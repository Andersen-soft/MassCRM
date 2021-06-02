import { IUser } from 'src/interfaces';
import { IAutocompleteMap } from './interfaces';

export const USERS_AUTOCOMPLETE_VALUES_MAP: IAutocompleteMap = {
  fullName: ({ name, surname }: IUser) => `${name} ${surname}`,
  email: ({ email }: IUser) => email,
  login: ({ login }: IUser) => login,
  skype: ({ skype }: IUser) => skype,
  position: ({ position }: IUser) => {
    if (!position) return '';
    return position;
  }
};

export const ROWS_COUNT = 50;
