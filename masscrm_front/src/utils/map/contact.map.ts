import { IContact, IContactResult } from 'src/interfaces';

export const transformContactForUpdate = ({
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

export const getContactByFullName = (
  contact: string,
  contacts: Array<IContact>
) => {
  return contacts.find(
    ({ first_name, last_name }) => `${first_name} ${last_name}` === contact
  );
};

export const getNamesOfContacts = (contacts: Array<IContact>) => {
  return contacts.map(
    ({ first_name, last_name }) => `${first_name} ${last_name}`
  );
};

export const getContactFullNameByID = (
  idCompany: number | undefined,
  contacts: Array<IContact>
) => {
  const matchedContact = contacts.find(({ id }) => idCompany === id);
  return matchedContact
    ? `${matchedContact?.first_name} ${matchedContact?.last_name}`
    : '';
};
