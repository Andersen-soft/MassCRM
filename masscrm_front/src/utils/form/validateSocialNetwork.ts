import { string, object } from 'yup';
import { URL_REGEX } from '../../constants';

export const validateSocialNetworkFormMulti = () =>
  object().shape({
    formMulti: string().matches(URL_REGEX, 'Invalid format')
  });
