import {
  IContactResult,
  IEMail,
  IndustriesCommonFormat,
  IIndustry,
  INote,
  ISale,
  ISequence,
  ITableHeight
} from 'src/interfaces';
import { getSizeOfCompany, OTHER_HEIGHT } from 'src/utils';

export const MAP_AUTOCOMPLETE_RESPONSE: any = {
  responsible: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        responsible: [value]
      }
    };
  },
  first_name: (value: string, date: object, skip_responsibility: number) => {
    return {
      limit: 50,
      search: {
        skip_responsibility,
        created_at: date,
        first_name: value || undefined
      }
    };
  },
  last_name: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        last_name: value || undefined
      }
    };
  },
  full_name: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        full_name: value || undefined
      }
    };
  },
  country: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        country: [value]
      }
    };
  },
  region: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        region: [value]
      }
    };
  },
  city: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        city: [value]
      }
    };
  },
  position: (value: string, date: object, skip_responsibility: number) => {
    return {
      limit: 50,
      search: {
        skip_responsibility,
        created_at: date,
        position: [value]
      }
    };
  },
  linkedin: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        linkedin: value || undefined
      }
    };
  },
  social_networks: (
    value: string,
    date: object,
    skip_responsibility: number
  ) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        social_networks: value || undefined
      }
    };
  },
  phone: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        phone: value || undefined
      }
    };
  },
  skype: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        skype: value || undefined
      }
    };
  },
  email: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        email: value || undefined
      }
    };
  },
  service_id: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        service_id: +value
      }
    };
  },
  colleague: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        colleague_name: value
      }
    };
  },
  sequence: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        sequence: value
      }
    };
  },
  bounces: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        bounces: +value
      }
    };
  },
  mails: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        mails: value
      }
    };
  },
  my_notes: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        my_notes: value
      }
    };
  },
  source: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        sale: { source: [value] }
      }
    };
  },
  sale_id: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        sale: { id: value }
      }
    };
  },
  sale_status: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        sale: { status: [value] }
      }
    };
  },
  company: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { name: [value] }
      }
    };
  },
  company_website: (
    value: string,
    date: object,
    skip_responsibility: number
  ) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { website: value }
      }
    };
  },
  company_linkedin: (
    value: string,
    date: object,
    skip_responsibility: number
  ) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { linkedin: value }
      }
    };
  },
  company_industry: (
    value: string,
    date: object,
    skip_responsibility: number
  ) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { industry: [value] }
      }
    };
  },
  company_size: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: {
          company_size: getSizeOfCompany(value)
        }
      }
    };
  },
  company_subsidiary: (
    value: string,
    date: object,
    skip_responsibility: number
  ) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { subsidiary: value }
      }
    };
  },
  company_holding: (
    value: string,
    date: object,
    skip_responsibility: number
  ) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { holding: value }
      }
    };
  },
  cto: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { sto_full_name: value || undefined }
      }
    };
  },
  jobs: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { jobs: [value] }
      }
    };
  },
  jobs_skills: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { skills: [value] }
      }
    };
  },
  comment: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        comment: value || undefined
      }
    };
  }
};

const OTHER_HEIGHT_SMALL_SCREEN: ITableHeight = {
  userTable: '201px',
  dailyTable: '381px',
  contactTable: '346px',
  myContactTable: '346px',
  blacklistTable: '520px',
  exportTable: '250px',
  reportTable: '346px'
};

export const getOtherHeight = (isBigScreen?: boolean) =>
  window.innerWidth > 1493 || isBigScreen
    ? OTHER_HEIGHT
    : OTHER_HEIGHT_SMALL_SCREEN;

export const MAP_AUTOCOMPLETE_VALUES: any = {
  responsible: (acc: IContactResult, current: IContactResult) =>
    current.responsible
      ? [...acc.result, current.responsible]
      : [...acc.result],
  first_name: (acc: IContactResult, current: IContactResult) =>
    current.first_name ? [...acc.result, current.first_name] : [...acc.result],
  last_name: (acc: IContactResult, current: IContactResult) =>
    current.last_name ? [...acc.result, current.last_name] : [...acc.result],
  full_name: (acc: IContactResult, current: IContactResult) =>
    current.full_name ? [...acc.result, current.full_name] : [...acc.result],
  country: (acc: IContactResult, current: IContactResult) =>
    current.location.country
      ? [...acc.result, current.location.country]
      : [...acc.result],
  region: (acc: IContactResult, current: IContactResult) =>
    current.location.region
      ? [...acc.result, current.location.region]
      : [...acc.result],
  city: (acc: IContactResult, current: IContactResult) =>
    current.location.city
      ? [...acc.result, current.location.city]
      : [...acc.result],
  position: (acc: IContactResult, current: IContactResult) =>
    current.position ? [...acc.result, current.position] : [...acc.result],
  linkedin: (acc: IContactResult, current: IContactResult) =>
    current.linkedin ? [...acc.result, current.linkedin] : [...acc.result],
  social_networks: (acc: IContactResult, current: IContactResult) =>
    current.social_networks
      ? [...acc.result?.concat(current.social_networks.map(item => item.link))]
      : [...acc.result],
  phone: (acc: IContactResult, current: IContactResult) =>
    current.phones
      ? [...acc.result?.concat(current.phones.map(item => item.phone))]
      : [...acc.result],
  skype: (acc: IContactResult, current: IContactResult) =>
    current.skype ? [...acc.result, current.skype] : [...acc.result],
  email: (acc: IContactResult, current: IContactResult) =>
    current.emails
      ? [
          ...acc.result?.concat(
            current.emails.map(({ email }: IEMail) => email)
          )
        ]
      : [...acc.result],
  colleague: (acc: IContactResult, current: IContactResult) =>
    current.colleagues
      ? [
          ...acc.result?.concat(
            current.colleagues?.map(
              (item: {
                first_name: string;
                middle_name?: string;
                last_name: string;
              }) =>
                `${item.first_name} ${item.middle_name && item.middle_name} ${
                  item.last_name
                }`
            )
          )
        ]
      : [...acc.result],
  service_id: (acc: IContactResult, current: IContactResult) =>
    current.service_id
      ? [...acc.result, current.service_id.toString()]
      : [...acc.result],
  sequence: (acc: IContactResult, current: IContactResult) =>
    current.sequences
      ? [
          ...acc.result,
          ...current.sequences.map(({ sequence }: ISequence) => sequence)
        ]
      : [...acc.result],

  bounces: (acc: IContactResult, current: IContactResult) =>
    current.bounces
      ? [...acc.result, current.bounces.toString()]
      : [...acc.result, '0'],
  mails: (acc: IContactResult, current: IContactResult) =>
    current.mails
      ? [
          ...acc.result.concat(
            current.mails.map((item: { message: string }) => item.message)
          )
        ]
      : [...acc.result],
  my_notes: (acc: IContactResult, current: IContactResult) =>
    current.note
      ? [...acc.result, ...current.note.map(({ message }: INote) => message)]
      : [...acc.result],
  source: (acc: IContactResult, current: IContactResult) =>
    current.sales
      ? [...acc.result, ...current.sales.map(({ source }: ISale) => source)]
      : [...acc.result],
  sale_id: (acc: IContactResult, current: IContactResult) =>
    current.sales
      ? [...acc.result, ...current.sales.map(({ id }: ISale) => id)]
      : [...acc.result],
  company: (acc: IContactResult, current: IContactResult) =>
    current.company?.name
      ? [...acc.result, current.company.name]
      : [...acc.result],
  company_website: (acc: IContactResult, current: IContactResult) =>
    current.company?.website
      ? [...acc.result, current.company.website]
      : [...acc.result],
  company_industry: (acc: IContactResult, current: IContactResult) =>
    current.company?.industries
      ? [
          ...acc.result,
          ...current.company.industries.map(({ name }: IIndustry) => name)
        ]
      : [...acc.result],

  company_size: (acc: IContactResult, current: IContactResult) => {
    let item = `${current.company.min_employees}-${current.company.max_employees}`;
    if (
      current.company?.min_employees === 1 &&
      current.company?.max_employees === 1
    ) {
      item = 'Self-employed';
    }
    if (current.company?.min_employees === 10001) item = '10001+';
    return current.company?.min_employees
      ? [...acc.result.concat(item)]
      : [...acc.result];
  },
  company_linkedin: (acc: IContactResult, current: IContactResult) =>
    current.company?.linkedin
      ? [...acc.result, current.company.linkedin]
      : [...acc.result],
  cto: (acc: IContactResult, current: IContactResult) =>
    current.company?.sto_full_name
      ? [...acc.result, current.company.sto_full_name]
      : [...acc.result],
  company_subsidiary: (acc: IContactResult, current: IContactResult) =>
    current.company?.subsidiary
      ? [
          ...acc.result,
          ...current.company.subsidiary.map(
            ({ name }: IndustriesCommonFormat) => name
          )
        ]
      : [...acc.result],

  company_holding: (acc: IContactResult, current: IContactResult) =>
    current.company?.holding
      ? [
          ...acc.result,
          ...current.company.holding.map(
            ({ name }: IndustriesCommonFormat) => name
          )
        ]
      : [...acc.result],

  jobs: (acc: IContactResult, current: IContactResult) =>
    current.company?.vacancies
      ? [...acc.result.concat(current.company.vacancies.map(item => item.job))]
      : [...acc.result],
  jobs_skills: (acc: IContactResult, current: IContactResult) =>
    current.company?.vacancies
      ? [
          ...acc.result.concat(
            current.company.vacancies.map(item => item.skills).filter(Boolean)
          )
        ]
      : [...acc.result],
  comment: (acc: IContactResult, current: IContactResult) =>
    current.comment ? [...acc.result, current.comment] : [...acc.result]
};
