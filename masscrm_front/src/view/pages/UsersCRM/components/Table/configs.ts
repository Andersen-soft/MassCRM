import { ITableConfig, IUser, ITableRow } from 'src/interfaces';

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
      code: 'more_information',
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
