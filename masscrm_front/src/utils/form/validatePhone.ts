import { string, object, array } from 'yup';
import { PHONE_REG_EXP } from 'src/constants';

export const contactFormPhoneSchema = () =>
  object().shape({
    items: array()
      .of(string().matches(PHONE_REG_EXP, 'Invalid phone number'))
      .nullable()
  });

export const validatePhoneFormMulti = () =>
  object().shape({
    formMulti: string().matches(PHONE_REG_EXP, 'Invalid phone number')
  });
