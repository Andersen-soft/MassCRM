import * as Yup from 'yup';
import { string, object, array, boolean } from 'yup';
import { IRoles } from 'src/interfaces';
import {
  URL_REGEX,
  PHONE_REG_EXP,
  LINKEDIN_REG_EXP,
  REGEX_INDUSTRY_NAME,
  SOCIALS_REG_EXP,
  SOCIAL_NETWORKS,
  POSITION_REG_EXP,
  NAME_REG_EXP,
  INVALID_CHARACTERS_OR_FORMAT
} from 'src/constants/form';

const countreisForGender = [
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
      .matches(URL_REGEX, 'Invalid format')
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
      .test('isString', 'Must be a string', val => !Number(val)),
    companyWebSite: string()
      .lowercase()
      .test(
        'companyWebSite',
        "social networks can't be a company website",
        value => SOCIAL_NETWORKS.every(item => !value?.includes(item))
      )
      .matches(URL_REGEX, 'Invalid format')
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
