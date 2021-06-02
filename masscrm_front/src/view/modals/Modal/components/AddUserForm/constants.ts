import { ADMIN, MANAGER, NC1 as nc1, NC2 as nc2 } from 'src/constants';
import { IRolesDisplay } from 'src/interfaces';

export const INITIAL_VALUES = {
  email: '',
  login: '',
  name: '',
  surname: '',
  roles: [],
  position: '',
  skype: '',
  comment: '',
  active: true,
  fromActiveDirectory: false
};

export const rolesDisplay: IRolesDisplay = {
  Admin: ADMIN,
  Manager: MANAGER,
  NC1: nc1,
  NC2: nc2
};

export const LOGIN_OF_AUTH_USER =
  "A new user can log in using Kerio Andersen's corporate login and password if the one was registered by the corporate email";

export const AUTH_USING_CORP_EMAIL =
  'In case of using corporate e-mail, a new user will be able to log in using the Andersen corporate login and password';
