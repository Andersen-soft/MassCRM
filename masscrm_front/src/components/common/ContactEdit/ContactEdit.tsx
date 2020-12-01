import React, { FC, useMemo } from 'react';
import { IContactResult } from 'src/interfaces';
import { ContactModal } from '..';
import { IContactFormInputs } from '../ContactForm/interfaces';
import { TOpen } from '../Table/interfaces';

export const ContactEdit: FC<{
  contact: IContactResult;
  open: TOpen;
  handleClose: () => void;
  autoFocus?: string;
  onSubmitSuccess?: Function;
}> = ({ contact, open, ...props }) => {
  const contactForForm = useMemo(
    () => ({
      first_name,
      last_name,
      full_name,
      linkedin,
      location,
      emails,
      social_networks,
      company,
      colleague,
      origin,
      phones,
      gender,
      ...fields
    }: IContactResult) => {
      let companySize = '';
      if (company?.max_employees === 1) {
        companySize = 'Self Employed';
      } else if (company.max_employees && company.min_employees) {
        companySize = `${company?.min_employees} - ${company?.max_employees}`;
      } else if (!company.max_employees && company.min_employees) {
        companySize = `${company.min_employees} +`;
      }

      let inputValues: IContactFormInputs = {
        first_name: '',
        last_name: '',
        ...fields,
        country: location.country,
        gender: gender ? String(gender) : '',
        region: location.region,
        city: location.city,
        phones: [],
        emails: [],
        origin,
        email: '',
        social_networks: [],
        validation: emails.length ? Boolean(emails[0].verification) : false,
        colleague: colleague ? colleague[0] : '',
        company: company?.name,
        company_id: company?.id || 0,
        companyWebSite: company?.website,
        companySize,
        min_employees: company?.min_employees,
        max_employees: company?.max_employees,
        companyLinkedIn: company?.linkedin,
        industry: company?.industries?.map(({ name }) => name),
        company_holding: company?.holding?.length && company?.holding[0].id,
        company_subsidiary:
          company?.subsidiary?.length && company?.subsidiary[0].id,
        CTO: company?.sto_full_name,
        company_type: company?.type || '',
        company_founded: company?.founded,
        vacancies: company?.vacancies
      };

      if (open !== 'copy') {
        inputValues = {
          ...inputValues,
          first_name,
          last_name,
          linkedin,
          emails: emails.length ? emails.map(email => email.email) : [],
          social_networks: social_networks?.map(item => item.link),
          phones: phones.length ? phones.map(phone => phone.phone) : []
        };
      }

      return inputValues;
    },
    [open, contact]
  );
  return (
    <ContactModal {...props} open={open} contact={contactForForm(contact)} />
  );
};
