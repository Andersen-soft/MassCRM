import { ICompany, ICompanyUpdate } from 'src/interfaces';

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

export const getCompanyForUpdate = ({
  industries,
  holding,
  subsidiary,
  ...company
}: ICompany): ICompanyUpdate => ({
  industries: industries?.map(({ id: industryID }) => industryID),
  holding: holding?.map(({ id: companyID }) => companyID),
  subsidiaries: subsidiary?.map(({ id: companyID }) => companyID),
  ...company
});
