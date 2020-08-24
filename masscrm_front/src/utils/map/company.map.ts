import { ICompany } from 'src/interfaces';

export const getNamesOfCompanies = (companies: Array<ICompany>) => {
  return companies.map(({ name }) => name);
};

export const getCompanyByName = (
  company: string,
  companies: Array<ICompany>
) => {
  return companies.find(({ name }) => name === company);
};

export const getCompanyNameByID = (
  idCompany: number | undefined,
  companies: Array<ICompany>
) => {
  return companies.find(({ id }) => idCompany === id)?.name;
};
