import { IRoles } from '../../../../interfaces';

export interface IUsers {
  id: number | string;
  name: string;
  surname: string;
  email: string;
  login: string;
  roles: IRoles;
  skype: string;
  position: string;
  active: boolean;
  comment: string;
  fromActiveDirectory: boolean;
}
