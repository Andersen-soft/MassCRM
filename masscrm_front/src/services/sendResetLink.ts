import { instance } from '../utils/http/index';

export default (id: number) => {
  return instance(`/users/change-password/${id}`);
};
