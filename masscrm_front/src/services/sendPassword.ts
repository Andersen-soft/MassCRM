import { setToken } from 'src/services/setTokenToCookies';
import { instance } from '../utils/http/index';

export default (id: number, password: string) => {
  return instance
    .post(
      `users/set-password`,
      JSON.stringify({
        id,
        password
      })
    )
    .then(token => {
      setToken(String(token));
      window.location.reload();
    });
};
