import React from 'react';
import { IContactResult, ICompany } from 'src/interfaces';
import { IJob } from 'src/interfaces/IJob';
import { TableCellBaseProps } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { ITableCell, ITableRow } from 'src/components/common/Table/interfaces';
import { SocialIcon, CommonIcon } from 'src/components/common';
import {
  countryCell,
  textCell,
  genderCell,
  commentCell,
  contactCell,
  companySizeCell
} from './cells';
import { industryCell } from './cells/ItemsCell/industryCell';

export const addContactMapCallback = (
  isNC2: boolean,
  isMyContact?: boolean,
  columnsSelected?: Array<string>
) => (contact: IContactResult, index: number) => {
  const {
    id,
    gender,
    location,
    linkedin,
    social_networks,
    emails = [],
    // TODO: fix it
    company = {} as ICompany,
    comment,
    created_at,
    updated_at,
    birthday,
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
    notes,
    colleague,
    phones = []
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
    founded,
    created_at: companyCreated
  } = company;

  const dateTypeTD = (date: string = '') => ({
    className
  }: React.PropsWithChildren<TableCellBaseProps>) => {
    const dateTime = date.split(' ');
    return (
      <td className={className}>
        {dateTime[0]}
        <br />
        {dateTime[1]}
      </td>
    );
  };

  const jobTypeTD = (
    vacancies: Array<IJob> = [],
    fieldName: string = 'job'
  ) => ({ className }: React.PropsWithChildren<TableCellBaseProps>) => (
    <td className={className}>
      {vacancies.map((vacancy: IJob) => (
        <p key={`${fieldName}-${vacancy.id}`}>{vacancy[fieldName]}</p>
      ))}
    </td>
  );

  const socialNetworkTD = ({
    className
  }: React.PropsWithChildren<TableCellBaseProps>) => (
    <td className={className}>
      {social_networks?.map(({ link, id: idSN }) => {
        const network = link?.split('/')[2]?.split('.');
        return (
          <SocialIcon
            socialName={network && network[0]}
            link={link}
            key={idSN}
          />
        );
      })}
    </td>
  );

  const verificationTD = ({
    className
  }: React.PropsWithChildren<TableCellBaseProps>) => (
    <td className={className}>
      {emails[0]?.verification && (
        <CommonIcon IconComponent={Done} style={{ color: '#46C662' }} />
      )}
    </td>
  );

  const textContactTD = (name: string, required?: boolean) =>
    textCell(id, name, contact[name], required);

  const textCompanyTD = (name: string, required?: boolean) =>
    textCell(company?.id, name, company[name]?.toString(), required, true);

  const linkCompanyTD = (name: string, required?: boolean) =>
    textCell(
      company?.id,
      name,
      company[name]?.toString(),
      required,
      true,
      company[name]?.toString().split('://')[1]
    );

  const isLinkedin = (val: string | string[]) =>
    val.indexOf('https://www.linkedin.com/') < 0 ? 'invalid link' : false;

  const personalInfo: Array<ITableCell> = [
    { code: 'first_name', component: textContactTD('first_name', true) },
    { code: 'last_name', component: textContactTD('last_name', true) },
    { code: 'full_name', component: textContactTD('full_name') },
    { code: 'gender', component: genderCell({ id, value: gender }) }
  ];

  const locationInfo: Array<ITableCell> = [
    {
      code: 'country',
      component: countryCell(id, location, 'country', true)
    },
    { code: 'region', component: countryCell(id, location, 'region') },
    { code: 'city', component: countryCell(id, location, 'city') }
  ];

  const workInfo = [
    { code: 'position', component: textContactTD('position') },
    {
      code: 'linkedin',
      component: textCell(
        id,
        'linkedin',
        linkedin,
        true,
        false,
        linkedin,
        'linkedin',
        isLinkedin
      )
    },
    { code: 'social_networks', component: socialNetworkTD },
    {
      code: 'phone',
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
    { code: 'requires_validation', component: verificationTD }
  ];

  const companyInfo = [
    { code: 'company_name', component: textCompanyTD('name') },
    { code: 'company_website', component: linkCompanyTD('website') },
    {
      code: 'company_industries',
      component: industryCell({ id: companyId, value: industries || [] })
    },
    {
      code: 'company_size',
      component: companySizeCell({
        min_employees,
        max_employees,
        id: companyId
      })
    },
    {
      code: 'company_linkedin',
      component: textCell(
        companyId,
        'linkedin',
        companyLinkedin,
        true,
        true,
        companyLinkedin,
        'linkedin',
        isLinkedin
      )
    },
    { code: 'company_sto', component: textCompanyTD('sto_full_name') }
  ];

  const dataRow: ITableRow = {
    id: id || 0,
    cells: [
      {
        data: (index + 1).toString()
      },
      ...personalInfo,
      ...locationInfo,
      ...workInfo,
      ...emailInfo,
      ...companyInfo
    ]
  };

  const jobInfo = [
    { code: 'job', component: jobTypeTD(companyVacancies, 'job') },
    { code: 'skills', component: jobTypeTD(companyVacancies, 'skills') }
  ];

  const commentInfo = {
    code: 'comment',
    component: commentCell({ id, value: comment })
  };

  if (isNC2) {
    dataRow.cells.push(...jobInfo);
  }

  dataRow.cells.push(commentInfo);

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

  if (isMyContact) {
    const allInfo: Array<ITableCell> = [
      ...personalInfo,
      { code: 'birthday', component: dateTypeTD(birthday) },
      ...locationInfo,
      ...workInfo,
      {
        code: 'skype',
        component: textCell(
          id,
          'skype',
          skype,
          false,
          false,
          `skype:${skype}`,
          'skype'
        )
      },
      ...emailInfo
    ];

    const dateContactInfo: Array<ITableCell> = [
      { code: 'created', component: dateTypeTD(created_at) },
      { code: 'updated', component: dateTypeTD(updated_at) }
    ];

    const dateCompanyInfo: Array<ITableCell> = [
      { code: 'company_created', component: dateTypeTD(companyCreated) },
      { code: 'company_founded', component: dateTypeTD(founded) }
    ];

    if (isNC2) {
      const dataNC2: ITableRow = {
        id: id || 0,
        cells: [
          {
            code: 'responsible',
            data: responsible
          },
          ...dateContactInfo,
          {
            code: 'origin',
            data: origin
          },
          ...allInfo,
          {
            code: 'confidence',
            data: confidence
          },
          {
            code: 'collegue',
            data: colleague && colleague[0]
          },
          {
            code: 'id',
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
            code: 'sequence_status',
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
            component: ({
              className
            }: React.PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {mails?.map(({ message }) => message).join('/')}
              </td>
            )
          },
          {
            code: 'my_notes',
            component: ({
              className
            }: React.PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {notes?.map(({ message }) => message).join('/')}
              </td>
            )
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
            code: 'sale_id',
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
          ...companyInfo,
          {
            code: 'company_type',
            data: companyType
          },
          {
            code: 'company_subsidiary',
            data: subsidiary && subsidiary[0].name
          },
          {
            code: 'holding_subsidiary',
            data: holding && holding[0].name
          },
          ...dateCompanyInfo,
          ...jobInfo,
          commentInfo
        ]
      };
      return selectColumns(dataNC2);
    }
    const dataNC1: ITableRow = {
      id: id || 0,
      cells: [
        ...dateContactInfo,
        ...allInfo,
        ...companyInfo,
        ...dateCompanyInfo,
        ...jobInfo,
        commentInfo
      ]
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
  Position: (acc: IContactResult, current: IContactResult) =>
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
  'E-mail': (acc: IContactResult, current: IContactResult) =>
    current.emails
      ? [...acc.result?.concat(current.emails.map(item => item.email))]
      : [...acc.result],
  Collegue: (acc: IContactResult, current: IContactResult) =>
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
    current.notes
      ? [...acc.result.concat(current.notes.map(item => item.message))]
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
  'Company size': (acc: IContactResult, current: IContactResult) =>
    current.company?.min_employees
      ? [
          ...acc.result.concat(
            `${current.company.min_employees} - ${current.company.max_employees}`
          )
        ]
      : [...acc.result],
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
  Responsible: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        responsible: [value]
      }
    };
  },
  'First name': (value: string, date: object) => {
    return {
      limit: 50,
      search: {
        created_at: date,
        first_name: value || undefined
      }
    };
  },
  'Last name': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        last_name: value || undefined
      }
    };
  },
  'Full name': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        full_name: value || undefined
      }
    };
  },
  Country: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        country: [value]
      }
    };
  },
  Region: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        region: [value]
      }
    };
  },
  City: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        city: [value]
      }
    };
  },
  Position: (value: string, date: object) => {
    return {
      limit: 50,
      search: {
        created_at: date,
        position: value || undefined
      }
    };
  },
  Li: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        linkedin: value || undefined
      }
    };
  },
  'Social Networks': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        social_networks: value || undefined
      }
    };
  },
  Phone: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        phone: value || undefined
      }
    };
  },
  Skype: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        skype: value || undefined
      }
    };
  },
  'E-mail': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        email: value || undefined
      }
    };
  },
  ID: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        service_id: Number(value)
      }
    };
  },
  Collegue: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        colleague_name: value
      }
    };
  },
  Sequence: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        sequence: value
      }
    };
  },
  Bounces: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        bounces: Number(value)
      }
    };
  },
  Mails: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        mails: value
      }
    };
  },
  'My notes': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        my_notes: value
      }
    };
  },
  Source: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        sale: { source: [value] }
      }
    };
  },
  'Sale ID': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        sale: { id: value }
      }
    };
  },
  'Sale status': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        sale: { status: [value] }
      }
    };
  },
  Company: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        company: { name: [value] }
      }
    };
  },
  'Company website': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        company: { website: value }
      }
    };
  },
  'Company LinkedIn': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        company: { linkedin: value }
      }
    };
  },
  Industry: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        company: { industry: [value] }
      }
    };
  },
  'Company size': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        company: {
          company_size: {
            min: Number(value.split(' ')[0]) || undefined,
            max: Number(value.split(' ')[2]) || undefined
          }
        }
      }
    };
  },
  'Subsidiary companies': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        company: { subsidiary: value }
      }
    };
  },
  'Holding company': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        company: { holding: value }
      }
    };
  },
  CTO: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        company: { sto_full_name: value || undefined }
      }
    };
  },
  Job: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        company: { jobs: [value] }
      }
    };
  },
  'Job Skills': (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        company: { skills: [value] }
      }
    };
  },
  Comment: (value: string, date: object) => {
    return {
      search: {
        created_at: date,
        comment: value || undefined
      }
    };
  }
};
