import { string, object } from 'yup';
import { URL_REGEX } from 'src/constants/form';

export const contactFormJobsSchema = () =>
  object().shape({
    job: string().required('Required field'),
    skills: string(),
    link: string().matches(URL_REGEX, 'Invalid format')
  });
