import { ITableConfig, ITableRow } from '../../common/Table/interfaces';
import { IUser } from '../../../interfaces';

export const tableConfig: ITableConfig = {
  rows: [
    {
      name: 'full name',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'e-mail',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'login',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'roles',
      hasFilter: true,
      isFiltered: false,
      hasCheckboxFilter: true
    },
    {
      name: 'skype',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'position',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'status',
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
      data: comment,
      isComment: true
    }
  ]
});

export const USERS_AUTOCOMPLETE_VALUES_MAP: any = {
  'full name': (item: any) => `${item.name} ${item.surname}`,
  'e-mail': (item: any) => item.email,
  login: (item: any) => item.login,
  skype: (item: any) => item.skype,
  position: (item: any) => {
    if (!item.position) return '';
    return item.position;
  }
};

interface IStatuses {
  [key: string]: number;
  Active: number;
  Inactive: number;
}

export const STATUSES: IStatuses = {
  Active: 1,
  Inactive: 0
};
