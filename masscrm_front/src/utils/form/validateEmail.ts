import { string, object, array } from 'yup';

export const contactFormEmailSchema = () =>
  object().shape({
    items: array()
      .of(
        string()
          .email('Invalid email')
          .required('Required field')
      )
      .nullable()
  });

export const validateEmailFormMulti = () =>
  object().shape({
    formMulti: string()
      .email('Invalid email')
      .required('Required field')
  });
