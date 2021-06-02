import { string, object } from 'yup';
import { URL_REGEXP } from 'src/constants';

export const validateSocialNetworkFormMulti = () =>
  object().shape({
    formMulti: string().matches(URL_REGEXP, 'Invalid format')
  });
