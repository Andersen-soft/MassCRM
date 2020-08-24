import { instance } from '../utils/http/index';

export default (email: string) => {
  return instance(`users/ldap_user?email=${email}`);
};
