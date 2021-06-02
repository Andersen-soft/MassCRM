import { string, object, array, boolean } from 'yup';
import { IRoles } from 'src/interfaces';
import {
  URL_REGEXP,
  PHONE_REG_EXP,
  LINKEDIN_REG_EXP,
  REGEX_INDUSTRY_NAME,
  SOCIALS_REG_EXP,
  SOCIAL_NETWORKS,
  POSITION_REG_EXP,
  NAME_REG_EXP,
  SKYPE_REG_EXP,
  LOGIN_REG_EXP,
  INVALID_CHARACTERS_OR_FORMAT
} from 'src/constants';

const countriesForGender = [
  'Luxembourg',
  'Germany',
  'Austria',
  'Switzerland',
  'Belgium',
  'France'
];

export const companyFormSchema = (roles: IRoles) =>
  object().shape({
    formCondition: boolean(),
    name: string().required('Required field'),
    website: string()
      .lowercase()
      .test('website', "social networks can't be a company website", value =>
        SOCIAL_NETWORKS.every(item => !value?.includes(item))
      )
      .matches(URL_REGEXP, 'Invalid format')
      .nullable(),
    linkedin: string()
      .matches(LINKEDIN_REG_EXP, 'Invalid format')
      .nullable(),
    industry: array().min(1, 'Required field'),
    companySize: string().nullable(),
    vacancies: roles?.nc2 ? array().required('Required field') : array()
  });

export const contactFormSchema = (roles: IRoles) =>
  object().shape({
    formCondition: boolean(),
    first_name: string()
      .matches(NAME_REG_EXP, INVALID_CHARACTERS_OR_FORMAT)
      .required('Required field')
      .test('isString', 'Must be a string', val => !Number(val))
      .nullable(),
    last_name: string()
      .matches(NAME_REG_EXP, INVALID_CHARACTERS_OR_FORMAT)
      .required('Required field')
      .test('isString', 'Must be a string', val => !Number(val))
      .nullable(),
    country: string()
      .required('Required field')
      .nullable(),
    position: string()
      .matches(POSITION_REG_EXP, INVALID_CHARACTERS_OR_FORMAT)
      .required('Required field')
      .test('isString', 'Must be a string', val => !Number(val))
      .nullable(),
    linkedin: string()
      .matches(LINKEDIN_REG_EXP, 'Invalid format')
      .nullable(),
    company: string()
      .required('Required field')
      .test('isString', 'Must be a string', val => typeof val === 'string'),
    companyWebSite: string()
      .required('Required field')
      .lowercase()
      .test(
        'companyWebSite',
        "social networks can't be a company website",
        value => SOCIAL_NETWORKS.every(item => !value?.includes(item))
      )
      .matches(URL_REGEXP, 'Invalid format')
      .nullable(),
    companyLinkedIn: string()
      .matches(LINKEDIN_REG_EXP, 'Invalid format')
      .nullable(),
    companySize: string().nullable(),
    industry: array().min(1, 'Required field'),
    emails: array().required('Required field'),
    email: string().email('Invalid email'),
    phone: string().matches(PHONE_REG_EXP, 'Invalid phone number'),
    vacancies: roles?.nc2 ? array().required('Required field') : array(),
    social_network: string().matches(SOCIALS_REG_EXP, 'Invalid format'),
    gender: string().when('country', {
      is: (val: string) => !!countriesForGender.find(value => val === value),
      then: string().required('Gender is required'),
      otherwise: string().notRequired()
    })
  });

export const addUserFormSchema = object({
  email: string()
    .required('Fill the Email field')
    .nullable()
    .email('Invalid value in the E-mail field')
    .trim(),
  roles: array().required('Fill the Role field'),
  login: string()
    .required('Fill the Login field')
    .nullable()
    .matches(LOGIN_REG_EXP, 'Invalid value in the Login field')
    .trim(),
  name: string()
    .matches(NAME_REG_EXP, 'Invalid value in the Name field')
    .required('Fill the Name field')
    .test('isString', 'Must be a string', val => !Number(val))
    .nullable()
    .trim(),
  skype: string()
    .required('Fill the Skype field')
    .nullable()
    .matches(SKYPE_REG_EXP, 'Invalid value in the Skype field')
    .trim(),
  surname: string()
    .matches(NAME_REG_EXP, 'Invalid value in the Surname field')
    .required('Fill the Surname field')
    .test('isString', 'Must be a string', val => !Number(val))
    .nullable()
    .trim()
});

export const createIndustrySchema = (industries: string[]) =>
  object().shape({
    industry: string()
      .lowercase()
      .matches(
        REGEX_INDUSTRY_NAME,
        'Only latin letters and symbols & \\ / , - are available'
      )
      .notOneOf(
        industries.map(item => item.toLocaleLowerCase()),
        'The industry is already exist'
      )
      .required()
  });

export const LoginSchema = object().shape({
  login: string().required('Required field'),
  password: string().required('Required field')
});
