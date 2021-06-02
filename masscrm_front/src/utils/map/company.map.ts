import { ICompany, ICompanyUpdate } from 'src/interfaces';

export const getNamesOfCompanies = (companies: ICompany[]) => {
  return companies.map(({ name }) => name);
};

export const getCompanyByName = (company: string, companies: ICompany[]) => {
  return companies.find(({ name }) => name === company);
};

export const getCompanyNameByID = (
  companies: ICompany[],
  idCompany?: number
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

export const getSizeOfCompany = (size: string) => {
  let min = +size.split('-')[0] || undefined;
  let max = +size.split('-')[1] || undefined;

  if (size === 'Self-employed') {
    min = 1;
    max = 1;
  }

  if (size === '10001+') min = 10001;

  return { min, max };
};

export const getCompaniesSizes = (sizes: string[]) =>
  sizes.map(size => getSizeOfCompany(size));
