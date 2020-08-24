import { instance } from '../utils/http/index';

export default (login: string, password: string) => {
  return instance.post(
    `auth/login`,
    JSON.stringify({
      login,
      password
    })
  );
};
