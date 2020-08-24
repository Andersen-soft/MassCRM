import { string, object, array, boolean } from 'yup';

const PHONE_REG_EXP = /^[\d ()+-]+$/;
const SOCIALS_REG_EXP = /^.*\b(https:\/\/www\.linkedin\.com|https:\/\/www\.facebook\.com|https:\/\/vk\.com)\b.*$/;

export const contactFormSchema = object().shape({
  formCondition: boolean(),
  first_name: string().required('Required field'),
  last_name: string().required('Required field'),
  country: string().required('Required field'),
  position: string().required('Required field'),
  linkedin: string()
    .required('Required field')
    .matches(/^https?:\/\/www.linkedin.com/, 'Invalid link'),
  company: string().required('Required field'),
  companyWebSite: string().required('Required field'),
  companySize: string().required('Required field'),
  industry: array().min(1, 'Required field'),
  emails: array().required('Required field'),
  email: string().email('Invalid email'),
  phone: string().matches(PHONE_REG_EXP, 'Invalid phone number'),
  vacancies: array().when('formCondition', {
    is: true,
    then: array().min(1, 'Required field')
  }),
  social_networks: string().matches(SOCIALS_REG_EXP, 'Invalid link')
});
