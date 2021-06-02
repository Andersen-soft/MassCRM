import { string, object } from 'yup';
import { URL_REGEXP } from 'src/constants';

export const contactFormJobsSchema = () =>
  object().shape({
    job: string().required('Required field'),
    skills: string(),
    link: string().matches(URL_REGEXP, 'Invalid format')
  });
