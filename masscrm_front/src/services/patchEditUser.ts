import { instance } from 'src/utils/http';
import { IAddUserFormInputs } from '../components/UsersCRM/AddUserForm';

export default (user: IAddUserFormInputs, id: number) => {
  return instance.patch(
    `users/${id}`,
    JSON.stringify({
      email: user.email,
      login: user.login,
      name: user.name,
      surname: user.surname,
      position: user.position ? user.position : '',
      comment: user.comment ? user.comment : '',
      active: user.active,
      fromActiveDirectory: user.fromActiveDirectory,
      skype: user.skype,
      roles: user.roles
    })
  );
};
