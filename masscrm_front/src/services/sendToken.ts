import { instance } from '../utils/http/index';

export default (token: string) => {
  return instance(`users/token?token=${token}`, {
    method: 'get'
  });
};
