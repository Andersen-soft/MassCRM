import { setToken } from 'src/services/setTokenToCookies';
import history from 'src/utils/history';
import { instance } from '../utils/http';

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
      history.push({ pathname: '/' });
    });
};
