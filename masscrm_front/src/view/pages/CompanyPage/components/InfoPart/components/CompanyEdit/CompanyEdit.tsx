import React, { FC, useMemo } from 'react';
import { ICompany, Open, ICompanyFormInputs } from 'src/interfaces';
import { getCompanySize } from 'src/utils/companySize';
import { CompanyModal } from 'src/view/modals';

interface IProps {
  company: ICompany;
  open: Open;
  handleClose: () => void;
  onSubmitSuccess?: Function;
}

export const CompanyEdit: FC<IProps> = ({ company, open, ...props }) => {
  const companyForForm = useMemo(
    () => ({
      id,
      founded,
      name,
      website,
      linkedin,
      sto_full_name,
      type,
      comment,
      industries,
      subsidiary,
      holding,
      vacancies,
      min_employees,
      max_employees
    }: ICompany) => {
      const inputValues: ICompanyFormInputs = {
        id,
        founded,
        name,
        website,
        linkedin,
        sto_full_name,
        type,
        companySize: getCompanySize(max_employees, min_employees),
        comment,
        industry: industries?.map(({ name: industryName }) => industryName),
        subsidiary: subsidiary?.length && subsidiary[0].id,
        holding: holding?.length && holding[0].id,
        vacancies,
        min_employees,
        max_employees
      };

      return inputValues;
    },
    [open, company]
  );
  return (
    <CompanyModal {...props} open={open} company={companyForForm(company)} />
  );
};
