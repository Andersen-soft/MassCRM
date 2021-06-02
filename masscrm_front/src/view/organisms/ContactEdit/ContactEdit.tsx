import React, { FC, useMemo } from 'react';
import {
  IContactResult,
  Open,
  IContactFormInputs,
  IEMail,
  IPhone,
  ISocialNetwork
} from 'src/interfaces';
import { ContactModal } from 'src/view/modals';

interface IProps {
  contact: IContactResult;
  open: Open;
  handleClose: () => void;
  autoFocus?: string;
  onSubmitSuccess?: Function;
}

export const ContactEdit: FC<IProps> = ({ contact, open, ...props }) => {
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
      } else if (company?.max_employees && company?.min_employees) {
        companySize = `${company?.min_employees} - ${company?.max_employees}`;
      } else if (!company?.max_employees && company?.min_employees) {
        companySize = `${company?.min_employees} +`;
      }

      let inputValues: IContactFormInputs = {
        first_name: '',
        last_name: '',
        ...fields,
        country: location.country,
        gender: gender || '',
        region: location.region,
        city: location.city,
        phones: [],
        emails: [],
        origin,
        email: '',
        social_networks: [],
        validation: emails.length ? emails[0].verification : false,
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
          emails: emails.map(({ email }: IEMail) => email),
          social_networks: social_networks?.map(
            ({ link }: ISocialNetwork) => link
          ),
          phones: phones.map(({ phone }: IPhone) => phone)
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
