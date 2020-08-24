import { instance } from '../utils/http/index';

export default () => {
  return instance(`auth/user`);
};
