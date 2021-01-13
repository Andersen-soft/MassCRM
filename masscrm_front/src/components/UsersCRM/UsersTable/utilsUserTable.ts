import {
  ITableConfig,
  ITableRow
} from 'src/components/common/Table/interfaces';
import { IUser } from 'src/interfaces';

interface IStatuses {
  [key: string]: number;
  Active: number;
  Inactive: number;
}

interface IAutocompleteMap {
  [key: string]: (item: IUser) => string | undefined;
}

export const tableConfig: ITableConfig = {
  rows: [
    {
      name: 'full name',
      code: 'fullName',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'e-mail',
      code: 'email',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'login',
      code: 'login',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'roles',
      code: 'roles',
      hasFilter: true,
      isFiltered: false,
      hasCheckboxFilter: true
    },
    {
      name: 'skype',
      code: 'skype',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'position',
      code: 'position',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'status',
      code: 'status',
      hasFilter: true,
      isFiltered: true,
      hasRadioFilter: true
    },
    {
      name: 'more information',
      hasFilter: false,
      isFiltered: false
    }
  ],
  column: {
    hasControl: true
  },
  body: {}
};

export const userTableMap = ({
  id,
  name,
  surname,
  email,
  login,
  roles,
  skype,
  position,
  active,
  comment,
  fromActiveDirectory
}: IUser): ITableRow => ({
  id: id as number,
  disableResetPassword: fromActiveDirectory,
  cells: [
    {
      data: `${name} ${surname}`,
      isBold: true
    },
    {
      data: email
    },
    {
      data: login
    },
    {
      data: Object.keys(roles)
        .map(item => roles[`${item}`].text)
        .join(' / ')
    },
    {
      data: skype,
      isBlue: true
    },
    {
      data: position
    },
    {
      data: active ? 'Active' : 'Inactive'
    },
    {
      data: comment || '',
      isComment: true
    }
  ]
});

export const getRolesValuesForRequest = (rolesArray: string[]) => {
  return rolesArray?.map(item => {
    if (item === 'Admin') return 'administrator';
    return item.toLocaleLowerCase();
  });
};

export const USERS_AUTOCOMPLETE_VALUES_MAP: IAutocompleteMap = {
  'full name': ({ name, surname }: IUser) => `${name} ${surname}`,
  'e-mail': ({ email }: IUser) => email,
  login: ({ login }: IUser) => login,
  skype: ({ skype }: IUser) => skype,
  position: ({ position }: IUser) => {
    if (!position) return '';
    return position;
  }
};

export const STATUSES: IStatuses = {
  Active: 1,
  Inactive: 0
};
