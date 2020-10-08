import { instance } from '../utils/http';
import { IAddUserFormInputs } from '../components/UsersCRM/AddUserForm';

export default (user: IAddUserFormInputs) => {
  return instance.post(
    `users`,
    JSON.stringify({
      email: user.email,
      login: user.login,
      name: user.name,
      surname: user.surname,
      position: user.position ? user.position : undefined,
      comment: user.comment ? user.comment : undefined,
      active: user.active,
      fromActiveDirectory: user.fromActiveDirectory,
      skype: user.skype,
      roles: user.roles
    })
  );
};
