import { IContact, IContactResult } from 'src/interfaces';

export const getContactForUpdate = ({
  emails,
  location,
  requires_validation,
  social_networks,
  company,
  phones,
  bounces,
  deliveries,
  opens,
  replies,
  views,
  note,
  service_id,
  ...contact
}: IContactResult): IContact => ({
  location,
  emails: emails.map(({ email }) => email),
  requires_validation: emails && emails[0]?.verification ? 1 : 0,
  company_id: company.id,
  company: company.name,
  phones: phones.map(({ phone }) => phone),
  note: note?.map(({ message }) => message),
  ...contact
});

export const GENDER_MAP: { [key: string]: string } = {
  m: 'Male',
  f: 'Female'
};
