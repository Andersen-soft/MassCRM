import React from 'react';
import { IContactResult, ICompany } from 'src/interfaces';
import { TableCellBaseProps } from '@material-ui/core';
import { ITableCell, ITableRow } from 'src/components/common/Table/interfaces';
import { format } from 'date-fns';
import {
  countryCell,
  textCell,
  genderCell,
  commentCell,
  contactCell,
  companySizeCell,
  originCell,
  confidenceCell,
  companyCell,
  typeCompanyCell,
  networkCell,
  jobCell
} from './cells';
import { industryCell } from './cells/ItemsCell/industryCell';
import { getCompanySize } from '../map';
import { LINKEDIN_REG_EXP, SOCIAL_NETWORKS, URL_REGEX } from '../../constants';
import { checkUrl } from '../form/chekUrl';

type FormatterType = (
  name: string,
  value?: string | boolean,
  isDate?: boolean
) => string | boolean | undefined;

export const addContactMapCallback = (
  isNC2: boolean,
  rowsForJob: boolean,
  isMyContact?: boolean,
  columnsSelected?: Array<string>
) => (contact: IContactResult, index: number) => {
  const {
    id,
    first_name,
    gender,
    location,
    linkedin,
    social_networks,
    emails = [],
    // TODO: fix it
    company,
    comment,
    created_at,
    updated_at,
    skype,
    responsible,
    confidence,
    origin,
    added_to_mailing,
    last_touch,
    views,
    deliveries,
    bounces,
    mails,
    opens,
    replies,
    sequences,
    sales,
    note,
    colleague,
    phones = [],
    in_blacklist,
    is_in_work,
    date_of_use
  } = contact;

  const {
    type: companyType,
    holding,
    max_employees,
    min_employees,
    id: companyId,
    industries,
    vacancies: companyVacancies,
    linkedin: companyLinkedin,
    subsidiary,
    created_at: companyCreated
  } = company || ({} as ICompany);

  const required_validation =
    (emails.length && emails[0]?.verification) || false;

  const dateTypeTD = (date: string = '') => ({
    className
  }: React.PropsWithChildren<TableCellBaseProps>) => {
    const [dateValue, timeValue] = (date && date.split(' ')) || '';

    return (
      <td className={className}>
        {dateValue}
        <br />
        {timeValue}
      </td>
    );
  };

  const formatter = (
    name: string,
    value?: string | boolean,
    isDate?: boolean
  ) => {
    if (isDate && value && typeof value === 'string') {
      return format(new Date(value), 'd.MM.yyyy');
    }
    if (name === 'linkedin' || 'website') {
      return checkUrl(value as string);
    }
    return value;
  };

  const isLinkedin = (val: string) => LINKEDIN_REG_EXP.test(val);

  const isWebsite = (val: string) =>
    URL_REGEX.test(val) && SOCIAL_NETWORKS.every(item => !val.includes(item));

  const textContactTD = (
    name: string,
    required?: boolean,
    isDate?: boolean,
    formatterFunction?: FormatterType
  ) =>
    textCell({
      id,
      name,
      value: contact[name],
      required,
      isDate,
      contact,
      formatter: formatterFunction
    });

  const textCompanyTD = (
    name: string,
    required?: boolean,
    isDate?: boolean,
    formatterFunction?: FormatterType
  ) =>
    textCell({
      id: company?.id,
      name,
      value: company ? company[name]?.toString() : '',
      required,
      isCompany: true,
      isDate,
      contact,
      formatter: formatterFunction
    });

  const linkCompanyTD = (
    name: string,
    required?: boolean,
    formatterFunction?: FormatterType
  ) =>
    textCell({
      id: company?.id,
      name,
      value: company ? company[name]?.toString() : '',
      required,
      isCompany: true,
      link: company ? company[name]?.toString().split('://')[1] : '',
      type: 'link',
      contact,
      validation: isWebsite,
      formatter: formatterFunction
    });

  const contactLink = textCell({
    id,
    name: 'first_name',
    value: first_name,
    required: true,
    link: first_name,
    type: 'link',
    href: `/contact?id=${id}`,
    contact
  });

  const personalInfo: Array<ITableCell> = [
    {
      code: 'linkedin',
      component: textCell({
        id,
        name: 'linkedin',
        value: linkedin,
        required: true,
        validation: isLinkedin,
        type: 'linkedin',
        formatter
      })
    },
    { code: 'first_name', component: contactLink },
    { code: 'last_name', component: textContactTD('last_name', true) },
    {
      code: 'full_name',
      component: textCell({
        id,
        name: 'full_name',
        value:
          contact.full_name || `${contact.first_name} ${contact.last_name}`,
        contact
      })
    },
    { code: 'gender', component: genderCell({ id, value: gender }) }
  ];

  const locationInfo: Array<ITableCell> = [
    { code: 'city', component: countryCell(id, location, 'city') },
    { code: 'region', component: countryCell(id, location, 'region') },
    {
      code: 'country',
      component: countryCell(id, location, 'country', true)
    }
  ];

  const workInfo = [
    {
      code: 'social_networks',
      component: networkCell({ value: social_networks, id })
    },
    {
      code: 'phones',
      component: contactCell({
        id,
        value: phones?.map(({ phone }) => phone),
        type: 'phones'
      })
    }
  ];

  const emailInfo = [
    {
      code: 'emails',
      component: contactCell({
        id,
        value: emails.map(({ email }) => email),
        type: 'emails'
      })
    },
    {
      code: 'requires_validation',
      component: textCell({
        id,
        name: 'requires_validation',
        switchValue: required_validation,
        type: 'switch'
      })
    }
  ];

  const companyInfo = [
    {
      code: 'company',
      component: companyCell({
        value: company ? [company] : [],
        id: companyId,
        contactID: id,
        type: 'name',
        href: `/company?id=${companyId}`
      })
    },
    {
      code: 'company_size',
      component: companySizeCell({
        min_employees,
        max_employees,
        id: companyId,
        contactID: id
      })
    },
    {
      code: 'company_linkedin',
      component: textCell({
        id: companyId,
        name: 'linkedin',
        value: companyLinkedin,
        isCompany: true,
        required: true,
        type: 'linkedin',
        validation: isLinkedin,
        contact,
        formatter
      })
    },
    {
      code: 'company_website',
      component: linkCompanyTD('website', false, formatter)
    }
  ];

  const jobInfo = [
    {
      code: 'jobs',
      component: jobCell({
        value: companyVacancies,
        idContact: id,
        companyId,
        fieldName: 'job'
      })
    },
    {
      code: 'jobs_skills',
      component: jobCell({
        value: companyVacancies,
        idContact: id,
        companyId,
        fieldName: 'skills'
      })
    }
  ];

  const inWorkInfo = [
    { code: 'is_in_work', data: is_in_work ? 'Yes' : 'No' },
    { code: 'date_of_use', component: dateTypeTD(date_of_use) }
  ];

  const blacklistInfo = {
    code: 'in_blacklist',
    data: in_blacklist ? 'Yes' : 'No'
  };

  const commentInfo = {
    code: 'comments',
    component: commentCell({ id, value: comment })
  };

  const dataRow: ITableRow = {
    id: id || 0,
    cells: rowsForJob
      ? [
          {
            data: (index + 1).toString()
          },
          ...personalInfo,
          { code: 'position', component: textContactTD('position') },
          ...companyInfo,
          ...emailInfo,
          ...locationInfo,
          {
            code: 'company_industries',
            component: industryCell({
              id: companyId,
              value: industries || [],
              contactID: id
            })
          },
          ...jobInfo,
          commentInfo,
          { code: 'company_cto', component: textCompanyTD('sto_full_name') },
          ...workInfo
        ]
      : [
          {
            data: (index + 1).toString()
          },
          ...personalInfo,
          { code: 'position', component: textContactTD('position') },
          ...companyInfo,
          ...emailInfo,
          ...locationInfo,
          {
            code: 'company_industries',
            component: industryCell({
              id: companyId,
              value: industries || [],
              contactID: id
            })
          },
          commentInfo,
          { code: 'company_cto', component: textCompanyTD('sto_full_name') },
          ...workInfo
        ]
  };

  const selectColumns = ({ cells, ...data }: ITableRow) => {
    return columnsSelected && columnsSelected?.length > 0
      ? {
          ...data,
          cells:
            cells.filter(
              ({ code }) => !code || columnsSelected?.includes(code)
            ) || []
        }
      : { cells, ...data };
  };

  const dateContactInfo: Array<ITableCell> = [
    { code: 'created', component: dateTypeTD(created_at) },
    { code: 'updated', component: dateTypeTD(updated_at) }
  ];

  const dateCompanyInfo: Array<ITableCell> = [
    { code: 'company_created', component: dateTypeTD(companyCreated) },
    {
      code: 'company_founded',
      component: textCompanyTD('founded', false, true, formatter)
    }
  ];

  const positionInfo = {
    code: 'position',
    component: textContactTD('position', true)
  };

  const industryInfo = {
    code: 'company_industries',
    component: industryCell({
      id: companyId,
      value: industries || [],
      contactID: id
    })
  };

  const ctoInfo = {
    code: 'company_cto',
    component: textCompanyTD('sto_full_name')
  };

  const skypeInfo = {
    code: 'skype',
    component: textCell({
      id,
      name: 'skype',
      value: skype,
      link: skype,
      type: 'skype'
    })
  };

  const responsibleInfo = {
    code: 'responsible_id',
    data: responsible
  };

  const birthdayInfo = {
    code: 'birthday',
    component: textContactTD('birthday', false, true, formatter)
  };

  if (isMyContact) {
    const allInfo: Array<ITableCell> = rowsForJob
      ? [
          ...personalInfo,
          positionInfo,
          ...companyInfo,
          ...emailInfo,
          ...locationInfo,
          industryInfo,
          ...jobInfo,
          commentInfo,
          ctoInfo,
          ...dateCompanyInfo,
          ...workInfo,
          skypeInfo,
          birthdayInfo
        ]
      : [
          ...personalInfo,
          positionInfo,
          ...companyInfo,
          ...emailInfo,
          ...locationInfo,
          industryInfo,
          commentInfo,
          ctoInfo,
          ...dateCompanyInfo,
          ...workInfo,
          skypeInfo,
          birthdayInfo
        ];

    if (isNC2) {
      const dataNC2: ITableRow = {
        id: id || 0,
        cells: [
          ...dateContactInfo,
          ...personalInfo,
          positionInfo,
          ...companyInfo,
          ...emailInfo,
          {
            code: 'confidence',
            component: confidenceCell({
              id,
              value: confidence,
              disabled: !required_validation
            })
          },
          ...locationInfo,
          industryInfo,
          ...jobInfo,
          commentInfo,
          ctoInfo,
          ...dateCompanyInfo,
          {
            code: 'company_type',
            component: typeCompanyCell({
              value: companyType,
              id: companyId,
              contactID: id
            })
          },
          {
            code: 'company_holding',
            component: companyCell({
              value: subsidiary,
              id: companyId,
              type: companyType === 'Holding' ? companyType : undefined,
              contactID: id
            })
          },
          {
            code: 'company_subsidiary',
            component: companyCell({
              value: holding,
              id: companyId,
              type: companyType === 'Subsidiary' ? companyType : undefined,
              contactID: id
            })
          },
          {
            code: 'origin',
            component: originCell({ id, value: origin })
          },
          {
            code: 'service_id',
            component: textContactTD('service_id', false)
          },
          {
            code: 'added_to_mailing',
            data: added_to_mailing
          },
          {
            code: 'last_touch',
            data: last_touch
          },
          {
            code: 'sequence',
            component: ({
              className
            }: React.PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sequences?.map(({ sequence }) => sequence).join('/')}
              </td>
            )
          },
          {
            code: 'status',
            component: ({
              className
            }: React.PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sequences?.map(({ status }) => status).join('/')}
              </td>
            )
          },
          {
            code: 'opens',
            data: opens
          },
          {
            code: 'views',
            data: views
          },
          {
            code: 'deliveries',
            data: deliveries
          },
          {
            code: 'replies',
            data: replies
          },
          {
            code: 'bounces',
            data: bounces
          },
          {
            code: 'mails',
            data: mails?.map(item => item.message).join('\n')
          },
          {
            code: 'my_notes',
            component: contactCell({
              id,
              value: note?.map(({ message }) => message),
              type: 'note'
            })
          },
          {
            code: 'sale_created',
            component: ({
              className
            }: React.PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sales
                  ?.map(({ created_at: created_atSales }) => created_atSales)
                  .join('/')}
              </td>
            )
          },
          {
            code: 'source',
            component: ({
              className
            }: React.PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sales?.map(({ source }) => source).join('/')}
              </td>
            )
          },
          {
            code: 'sale_link',
            component: ({
              className
            }: React.PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sales?.map(({ id: idSales }) => idSales).join('/')}
              </td>
            )
          },
          {
            code: 'sale_status',
            component: ({
              className
            }: React.PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sales?.map(({ status: statusSales }) => statusSales).join('/')}
              </td>
            )
          },
          {
            code: 'sale_project_c1',
            component: ({
              className
            }: React.PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sales?.map(({ project_c1 }) => project_c1).join('/')}
              </td>
            )
          },
          ...workInfo,
          {
            code: 'colleagues',
            data: colleague && colleague[0]
          },
          skypeInfo,
          birthdayInfo,
          responsibleInfo,
          ...inWorkInfo,
          blacklistInfo
        ]
      };
      return selectColumns(dataNC2);
    }
    const dataNC1: ITableRow = {
      id: id || 0,
      cells: [...dateContactInfo, ...allInfo]
    };
    return selectColumns(dataNC1);
  }

  return selectColumns(dataRow);
};

interface IYesNo {
  [index: string]: number;
  Yes: number;
  No: number;
}

export const VALIDATION_VALUE: IYesNo = {
  Yes: 1,
  No: 0
};

export const deleteItemFilter = (filter: string[], item: string) =>
  filter?.filter((id: string) => item !== id);

export const addItemFilter = (filter: string[] | string, item: string) => [
  ...filter,
  item
];

export const getBouncesValue = (bounncesValue: string[]) =>
  bounncesValue.map(item => (item === 'Yes' ? 1 : 0));

export const ROWS_COUNT = 50;

export const MAP_AUTOCOMPLETE_VALUES: any = {
  Responsible: (acc: IContactResult, current: IContactResult) =>
    current.responsible
      ? [...acc.result, current.responsible]
      : [...acc.result],
  'First name': (acc: IContactResult, current: IContactResult) =>
    current.first_name ? [...acc.result, current.first_name] : [...acc.result],
  'Last name': (acc: IContactResult, current: IContactResult) =>
    current.last_name ? [...acc.result, current.last_name] : [...acc.result],
  'Full name': (acc: IContactResult, current: IContactResult) =>
    current.full_name ? [...acc.result, current.full_name] : [...acc.result],
  Country: (acc: IContactResult, current: IContactResult) =>
    current.location.country
      ? [...acc.result, current.location.country]
      : [...acc.result],
  Region: (acc: IContactResult, current: IContactResult) =>
    current.location.region
      ? [...acc.result, current.location.region]
      : [...acc.result],
  City: (acc: IContactResult, current: IContactResult) =>
    current.location.city
      ? [...acc.result, current.location.city]
      : [...acc.result],
  Title: (acc: IContactResult, current: IContactResult) =>
    current.position ? [...acc.result, current.position] : [...acc.result],
  Li: (acc: IContactResult, current: IContactResult) =>
    current.linkedin ? [...acc.result, current.linkedin] : [...acc.result],
  'Social Networks': (acc: IContactResult, current: IContactResult) =>
    current.social_networks
      ? [...acc.result?.concat(current.social_networks.map(item => item.link))]
      : [...acc.result],
  Phone: (acc: IContactResult, current: IContactResult) =>
    current.phones
      ? [...acc.result?.concat(current.phones.map(item => item.phone))]
      : [...acc.result],
  Skype: (acc: IContactResult, current: IContactResult) =>
    current.skype ? [...acc.result, current.skype] : [...acc.result],
  Email: (acc: IContactResult, current: IContactResult) =>
    current.emails
      ? [...acc.result?.concat(current.emails.map(item => item.email))]
      : [...acc.result],
  Colleague: (acc: IContactResult, current: IContactResult) =>
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
  ID: (acc: IContactResult, current: IContactResult) =>
    current.service_id
      ? [...acc.result, current.service_id.toString()]
      : [...acc.result],
  Sequence: (acc: IContactResult, current: IContactResult) =>
    current.sequences
      ? [...acc.result.concat(current.sequences.map(item => item.sequence))]
      : [...acc.result],
  Bounces: (acc: IContactResult, current: IContactResult) =>
    current.bounces
      ? [...acc.result, current.bounces.toString()]
      : [...acc.result, '0'],
  Mails: (acc: IContactResult, current: IContactResult) =>
    current.mails
      ? [
          ...acc.result.concat(
            current.mails.map((item: { message: string }) => item.message)
          )
        ]
      : [...acc.result],
  'My notes': (acc: IContactResult, current: IContactResult) =>
    current.note
      ? [...acc.result.concat(current?.note?.map(item => item.message))]
      : [...acc.result],
  Source: (acc: IContactResult, current: IContactResult) =>
    current.sales
      ? [...acc.result.concat(current.sales.map(item => item.source))]
      : [...acc.result],
  'Sale ID': (acc: IContactResult, current: IContactResult) =>
    current.sales
      ? [...acc.result.concat(current.sales.map(item => item.id))]
      : [...acc.result],
  Company: (acc: IContactResult, current: IContactResult) =>
    current.company?.name
      ? [...acc.result, current.company.name]
      : [...acc.result],
  'Company website': (acc: IContactResult, current: IContactResult) =>
    current.company?.website
      ? [...acc.result, current.company.website]
      : [...acc.result],
  Industry: (acc: IContactResult, current: IContactResult) =>
    current.company?.industries
      ? [
          ...acc.result.concat(
            current.company.industries.map(item => item.name)
          )
        ]
      : [...acc.result],
  'Company size': (acc: IContactResult, current: IContactResult) => {
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
  'Company LinkedIn': (acc: IContactResult, current: IContactResult) =>
    current.company?.linkedin
      ? [...acc.result, current.company.linkedin]
      : [...acc.result],
  CTO: (acc: IContactResult, current: IContactResult) =>
    current.company?.sto_full_name
      ? [...acc.result, current.company.sto_full_name]
      : [...acc.result],
  'Subsidiary companies': (acc: IContactResult, current: IContactResult) =>
    current.company?.subsidiary
      ? [
          ...acc.result.concat(
            current.company.subsidiary.map(item => item.name)
          )
        ]
      : [...acc.result],
  'Holding company': (acc: IContactResult, current: IContactResult) =>
    current.company?.holding
      ? [...acc.result.concat(current.company.holding.map(item => item.name))]
      : [...acc.result],
  Job: (acc: IContactResult, current: IContactResult) =>
    current.company?.vacancies
      ? [...acc.result.concat(current.company.vacancies.map(item => item.job))]
      : [...acc.result],
  'Job Skills': (acc: IContactResult, current: IContactResult) =>
    current.company?.vacancies
      ? [
          ...acc.result.concat(
            current.company.vacancies.map(item => item.skills)
          )
        ]
      : [...acc.result],
  Comment: (acc: IContactResult, current: IContactResult) =>
    current.comment ? [...acc.result, current.comment] : [...acc.result]
};

export const MAP_AUTOCOMPLETE_RESPONSE: any = {
  Responsible: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        responsible: [value]
      }
    };
  },
  'First name': (value: string, date: object, skip_responsibility: number) => {
    return {
      limit: 50,
      search: {
        skip_responsibility,
        created_at: date,
        first_name: value || undefined
      }
    };
  },
  'Last name': (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        last_name: value || undefined
      }
    };
  },
  'Full name': (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        full_name: value || undefined
      }
    };
  },
  Country: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        country: [value]
      }
    };
  },
  Region: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        region: [value]
      }
    };
  },
  City: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        city: [value]
      }
    };
  },
  Title: (value: string, date: object, skip_responsibility: number) => {
    return {
      limit: 50,
      search: {
        skip_responsibility,
        created_at: date,
        position: [value]
      }
    };
  },
  Li: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        linkedin: value || undefined
      }
    };
  },
  'Social Networks': (
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
  Phone: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        phone: value || undefined
      }
    };
  },
  Skype: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        skype: value || undefined
      }
    };
  },
  Email: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        email: value || undefined
      }
    };
  },
  ID: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        service_id: Number(value)
      }
    };
  },
  Colleague: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        colleague_name: value
      }
    };
  },
  Sequence: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        sequence: value
      }
    };
  },
  Bounces: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        bounces: Number(value)
      }
    };
  },
  Mails: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        mails: value
      }
    };
  },
  'My notes': (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        my_notes: value
      }
    };
  },
  Source: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        sale: { source: [value] }
      }
    };
  },
  'Sale ID': (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        sale: { id: value }
      }
    };
  },
  'Sale status': (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        sale: { status: [value] }
      }
    };
  },
  Company: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { name: [value] }
      }
    };
  },
  'Company website': (
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
  'Company LinkedIn': (
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
  Industry: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { industry: [value] }
      }
    };
  },
  'Company size': (
    value: string,
    date: object,
    skip_responsibility: number
  ) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: {
          company_size: getCompanySize(value)
        }
      }
    };
  },
  'Subsidiary companies': (
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
  'Holding company': (
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
  CTO: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { sto_full_name: value || undefined }
      }
    };
  },
  Job: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { jobs: [value] }
      }
    };
  },
  'Job Skills': (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        company: { skills: [value] }
      }
    };
  },
  Comment: (value: string, date: object, skip_responsibility: number) => {
    return {
      search: {
        skip_responsibility,
        created_at: date,
        comment: value || undefined
      }
    };
  }
};
