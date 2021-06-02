import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import {
  FormatterType,
  ICompany,
  IContactResult,
  IContactsSortingFieldId,
  ITableCell,
  ITableRow
} from 'src/interfaces';
import { format } from 'date-fns';
import {
  D_MM_YYYY,
  LINKEDIN_REG_EXP,
  NAME_REG_EXP,
  POSITION_REG_EXP,
  SOCIAL_NETWORKS,
  URL_REGEXP
} from 'src/constants';
import {
  checkUrl,
  commentCell,
  companyCell,
  companySizeCell,
  confidenceCell,
  contactCell,
  countryCell,
  genderCell,
  industryCell,
  jobCell,
  networkCell,
  originCell,
  textCell,
  typeCompanyCell
} from 'src/utils';

export const CONTACTS_SORTING_FIELDS_CONFIG: IContactsSortingFieldId = {
  contact_created: 'created_at',
  contact_updated: 'updated_at',
  date_of_birth: 'birthday',
  added_to_mailing: 'added_to_mailing',
  last_touch: 'last_touch',
  date_of_use: 'date_of_use'
};

export const contactMapCallback = (
  isNC2: boolean,
  rowsForJob: boolean,
  isMyContact?: boolean,
  columnsSelected?: string[],
  doubleClickEdit: boolean = true
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
    created_at: company_created
  } = company || ({} as ICompany);
  const required_validation =
    (emails.length && emails[0]?.verification) || false;

  const dateTypeTD = (date: string = '') => ({
    className
  }: PropsWithChildren<TableCellBaseProps>) => {
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
      return format(new Date(value), D_MM_YYYY);
    }
    if (name === 'linkedin' || 'website') {
      return checkUrl(value as string);
    }
    return value;
  };

  const isLinkedin = (val: string) => LINKEDIN_REG_EXP.test(val);

  const isWebsite = (val: string) =>
    URL_REGEXP.test(val) && SOCIAL_NETWORKS.every(item => !val.includes(item));

  const nameValidation = (val: string) => !!val.match(NAME_REG_EXP);
  const positionValidation = (val: string) => !!val.match(POSITION_REG_EXP);

  interface ITextContactTD {
    name: string;
    required?: boolean;
    isDate?: boolean;
    formatterFunction?: FormatterType;
    validation?: (val: string) => boolean;
  }

  const textContactTD = ({
    name,
    required,
    isDate,
    formatterFunction,
    validation
  }: ITextContactTD) =>
    textCell({
      id,
      name,
      value: contact[name],
      required,
      isDate,
      contact,
      formatter: formatterFunction,
      validation,
      doubleClickEdit
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
      formatter: formatterFunction,
      doubleClickEdit
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
      formatter: formatterFunction,
      doubleClickEdit
    });

  const personalInfo: ITableCell[] = [
    {
      code: 'linkedin',
      component: textCell({
        id,
        name: 'linkedin',
        value: linkedin,
        required: true,
        validation: isLinkedin,
        type: 'linkedin',
        formatter,
        doubleClickEdit
      })
    },
    {
      code: 'first_name',
      component: textCell({
        id,
        name: 'first_name',
        value: first_name,
        required: true,
        link: first_name,
        type: 'link',
        href: `/contact?id=${id}`,
        contact,
        validation: nameValidation,
        doubleClickEdit
      })
    },
    {
      code: 'last_name',
      component: textContactTD({
        name: 'last_name',
        required: true,
        validation: nameValidation
      })
    },
    {
      code: 'full_name',
      component: textCell({
        id,
        name: 'full_name',
        value:
          contact.full_name || `${contact.first_name} ${contact.last_name}`,
        contact,
        validation: nameValidation,
        doubleClickEdit
      })
    },
    { code: 'gender', component: genderCell({ id, value: gender }) }
  ];

  const locationInfo: ITableCell[] = [
    {
      code: 'city',
      component: countryCell({ id, location, type: 'city', doubleClickEdit })
    },
    {
      code: 'region',
      component: countryCell({ id, location, type: 'region', doubleClickEdit })
    },
    {
      code: 'country',
      component: countryCell({
        id,
        location,
        type: 'country',
        required: true,
        doubleClickEdit
      })
    }
  ];

  const workInfo = [
    {
      code: 'social_networks',
      component: networkCell({ value: social_networks, id, doubleClickEdit })
    },
    {
      code: 'phone',
      component: contactCell({
        id,
        value: phones?.map(({ phone }) => phone),
        type: 'phones',
        doubleClickEdit
      })
    }
  ];

  const emailInfo = [
    {
      code: 'email',
      component: contactCell({
        id,
        value: emails.map(({ email }) => email),
        type: 'emails',
        doubleClickEdit
      })
    },
    {
      code: 'requires_validation',
      component: textCell({
        id,
        name: 'requires_validation',
        switchValue: required_validation,
        type: 'switch',
        doubleClickEdit
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
        href: `/company?id=${companyId}`,
        doubleClickEdit
      })
    },
    {
      code: 'company_size',
      component: companySizeCell({
        min_employees,
        max_employees,
        id: companyId,
        contactID: id,
        doubleClickEdit
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
        formatter,
        doubleClickEdit
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
        fieldName: 'job',
        doubleClickEdit
      })
    },
    {
      code: 'jobs_skills',
      component: jobCell({
        value: companyVacancies,
        idContact: id,
        companyId,
        fieldName: 'skills',
        doubleClickEdit
      })
    }
  ];

  const inWorkInfo = [
    { code: 'is_in_work', data: is_in_work ? 'Yes' : 'No' },
    { code: 'date_of_use', component: dateTypeTD(date_of_use) }
  ];

  const blacklistInfo = {
    code: 'blacklist',
    data: in_blacklist ? 'Yes' : 'No'
  };

  const commentInfo = {
    code: 'comment',
    component: commentCell({ id, value: comment, doubleClickEdit })
  };

  const dataRow: ITableRow = {
    id: id || 0,
    cells: rowsForJob
      ? [
          {
            data: (index + 1).toString()
          },
          ...personalInfo,
          {
            code: 'position',
            component: textContactTD({
              name: 'position',
              validation: positionValidation
            })
          },
          ...companyInfo,
          ...emailInfo,
          ...locationInfo,
          {
            code: 'company_industry',
            component: industryCell({
              id: companyId,
              value: industries || [],
              contactID: id,
              doubleClickEdit
            })
          },
          ...jobInfo,
          commentInfo,
          { code: 'cto', component: textCompanyTD('sto_full_name') },
          ...workInfo
        ]
      : [
          {
            data: (index + 1).toString()
          },
          ...personalInfo,
          {
            code: 'position',
            component: textContactTD({
              name: 'position',
              validation: positionValidation
            })
          },
          ...companyInfo,
          ...emailInfo,
          ...locationInfo,
          {
            code: 'company_industry',
            component: industryCell({
              id: companyId,
              value: industries || [],
              contactID: id,
              doubleClickEdit
            })
          },
          commentInfo,
          { code: 'cto', component: textCompanyTD('sto_full_name') },
          ...workInfo
        ]
  };

  const selectColumns = ({ cells, ...data }: ITableRow) => {
    return columnsSelected && columnsSelected?.length
      ? {
          ...data,
          cells:
            cells.filter(
              ({ code }) => !code || columnsSelected?.includes(code)
            ) || []
        }
      : { cells, ...data };
  };

  const dateContactInfo: ITableCell[] = [
    { code: 'contact_created', component: dateTypeTD(created_at) },
    { code: 'contact_updated', component: dateTypeTD(updated_at) }
  ];

  const dateCompanyInfo: ITableCell[] = [
    { code: 'company_created', component: dateTypeTD(company_created) },
    {
      code: 'founded',
      component: textCompanyTD('founded', false, true, formatter)
    }
  ];

  const positionInfo = {
    code: 'position',
    component: textContactTD({
      name: 'position',
      required: true,
      validation: positionValidation
    })
  };

  const industryInfo = {
    code: 'company_industry',
    component: industryCell({
      id: companyId,
      value: industries || [],
      contactID: id,
      doubleClickEdit
    })
  };

  const ctoInfo = {
    code: 'cto',
    component: textCompanyTD('sto_full_name')
  };

  const skypeInfo = {
    code: 'skype',
    component: textCell({
      id,
      name: 'skype',
      value: skype,
      link: skype,
      type: 'skype',
      doubleClickEdit
    })
  };

  const responsibleInfo = {
    code: 'responsible',
    data: responsible
  };

  const birthdayInfo = {
    code: 'date_of_birth',
    component: textContactTD({
      name: 'birthday',
      isDate: true,
      formatterFunction: formatter
    })
  };

  if (isMyContact) {
    const allInfo: ITableCell[] = rowsForJob
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
              disabled: !required_validation,
              doubleClickEdit
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
              contactID: id,
              doubleClickEdit
            })
          },
          {
            code: 'company_holding',
            component: companyCell({
              value: subsidiary,
              id: companyId,
              type: companyType === 'Holding' ? companyType : undefined,
              contactID: id,
              doubleClickEdit
            })
          },
          {
            code: 'company_subsidiary',
            component: companyCell({
              value: holding,
              id: companyId,
              type: companyType === 'Subsidiary' ? companyType : undefined,
              contactID: id,
              doubleClickEdit
            })
          },
          {
            code: 'origin',
            component: originCell({ id, value: origin, doubleClickEdit })
          },
          {
            code: 'service_id',
            component: textContactTD({ name: 'service_id' })
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
            }: PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sequences?.map(({ sequence }) => sequence).join('/')}
              </td>
            )
          },
          {
            code: 'status',
            component: ({
              className
            }: PropsWithChildren<TableCellBaseProps>) => (
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
              type: 'note',
              doubleClickEdit
            })
          },
          {
            code: 'sale_created',
            component: ({
              className
            }: PropsWithChildren<TableCellBaseProps>) => (
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
            }: PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sales?.map(({ source }) => source).join('/')}
              </td>
            )
          },
          {
            code: 'sale_id',
            component: ({
              className
            }: PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sales?.map(({ id: idSales }) => idSales).join('/')}
              </td>
            )
          },
          {
            code: 'sale_status',
            component: ({
              className
            }: PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sales?.map(({ status: statusSales }) => statusSales).join('/')}
              </td>
            )
          },
          {
            code: 'sale_project_c1',
            component: ({
              className
            }: PropsWithChildren<TableCellBaseProps>) => (
              <td className={className}>
                {sales?.map(({ project_c1 }) => project_c1).join('/')}
              </td>
            )
          },
          ...workInfo,
          {
            code: 'colleague',
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
