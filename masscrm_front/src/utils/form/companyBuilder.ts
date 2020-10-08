import { ICompanySize, IIndustry } from 'src/interfaces';
import { IJob } from 'src/interfaces/IJob';

export class CompanyBuilder {
  public name?: string;

  public website?: string;

  public industries?: number[];

  public min_employees?: number;

  public max_employees?: number;

  public founded?: string;

  public type?: string;

  public subsidiaries?: number[];

  public vacancies?: Array<IJob>;

  public sto_full_name?: string;

  public linkedin?: string;

  setName(company?: string) {
    this.name = company;
    return this;
  }

  setWebsite(companyWebSite?: string) {
    this.website = companyWebSite;
    return this;
  }

  setIndustries(industries: Array<IIndustry>, industry?: string[]) {
    this.industries = industries.reduce((acc: number[], cur) => {
      return industry?.includes(cur.name) ? [...acc, cur.id] : [...acc];
    }, []);
    return this;
  }

  setMinEmployees(selectedSizeCompany?: ICompanySize) {
    this.min_employees = selectedSizeCompany?.min;
    return this;
  }

  setMaxEmployees(selectedSizeCompany?: ICompanySize) {
    this.max_employees = selectedSizeCompany?.max;
    return this;
  }

  setFounded(company_founded?: string) {
    this.founded = company_founded;
    return this;
  }

  setCompanyType(company_type?: string) {
    this.type = company_type;
    return this;
  }

  setCompanySubsidiary(company_subsidiary?: any) {
    if (company_subsidiary) {
      this.subsidiaries = company_subsidiary ? [company_subsidiary] : undefined;
    }
    return this;
  }

  setCompanyHolding(company_holding?: any) {
    if (company_holding) {
      this.subsidiaries = company_holding ? [company_holding] : undefined;
    }
    return this;
  }

  setVacancies(formForVacancies: boolean, vacancies?: Array<IJob>) {
    if (formForVacancies) {
      this.vacancies = vacancies?.length ? vacancies : undefined;
    }
    return this;
  }

  setCTOFullName(sto_full_name?: string) {
    this.sto_full_name = sto_full_name;
    return this;
  }

  setCompanyLinkedIn(companyLinkedIn?: string) {
    this.linkedin = companyLinkedIn;
    return this;
  }
}
