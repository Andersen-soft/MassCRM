import { IJob } from 'src/interfaces/IJob';
import { checkUrl, checkJobUrl } from './chekUrl';
import { IIndustry } from '../../interfaces';

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

  public skip_validation?: number;

  public comment?: string;

  setName(company?: string) {
    this.name = company;
    return this;
  }

  setWebsite(companyWebSite?: string) {
    this.website = companyWebSite ? checkUrl(companyWebSite as string) : '';
    return this;
  }

  setIndustries(allIndustries: IIndustry[], industries?: string[]) {
    this.industries = allIndustries.reduce((acc: number[], cur: IIndustry) => {
      return industries?.includes(cur.name) ? [...acc, cur.id] : [...acc];
    }, []);
    return this;
  }

  setMinEmployees(min?: number) {
    this.min_employees = min;
    return this;
  }

  setMaxEmployees(max?: number) {
    this.max_employees = max;
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
      this.vacancies = vacancies?.map(checkJobUrl) ?? [];
    }
    return this;
  }

  setCTOFullName(sto_full_name?: string) {
    this.sto_full_name = sto_full_name;
    return this;
  }

  setCompanyLinkedIn(companyLinkedIn?: string) {
    this.linkedin = companyLinkedIn ? checkUrl(companyLinkedIn) : '';
    return this;
  }

  setSkipValidation(skip_validation?: boolean) {
    this.skip_validation = skip_validation ? 1 : 0;
    return this;
  }

  setComment(comment?: string) {
    this.comment = comment;
    return this;
  }
}
