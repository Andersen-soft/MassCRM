import * as Yup from 'yup';
import { string, object, array, boolean } from 'yup';
import { IRoles } from 'src/interfaces';
import { URL_REGEX, PHONE_REG_EXP, LINKEDIN_REG_EXP } from 'src/constants/form';

const countreisForGender = [
  'Luxembourg',
  'Germany',
  'Austria',
  'Switzerland',
  'Belgium',
  'France'
];

export const contactFormSchema = (roles: IRoles) =>
  object().shape({
    formCondition: boolean(),
    first_name: string().required('Required field'),
    last_name: string().required('Required field'),
    country: string().required('Required field'),
    position: string().required('Required field'),
    linkedin: string()
      .matches(LINKEDIN_REG_EXP, 'Invalid format')
      .nullable(),
    company: string().required('Required field'),
    companyWebSite: string()
      .matches(URL_REGEX, 'Invalid format')
      .nullable(),
    companyLinkedIn: string()
      .matches(LINKEDIN_REG_EXP, 'Invalid format')
      .nullable(),
    companySize: string(),
    industry: array().min(1, 'Required field'),
    emails: array().required('Required field'),
    email: string().email('Invalid email'),
    phone: string().matches(PHONE_REG_EXP, 'Invalid phone number'),
    vacancies: roles?.nc2 ? array().required('Required field') : array(),
    social_network: string().matches(URL_REGEX, 'Invalid format'),
    gender: string().when('country', {
      is: (val: string) =>
        Boolean(countreisForGender.find(value => val === value)),
      then: string().required('Gender is required'),
      otherwise: string().notRequired()
    })
  });

export const addUserFormSchema = Yup.object({
  email: string().required(' '),
  roles: array().required(' '),
  login: string().required(' '),
  name: string().required(' '),
  skype: string().required(' '),
  surname: string().required(' ')
});
