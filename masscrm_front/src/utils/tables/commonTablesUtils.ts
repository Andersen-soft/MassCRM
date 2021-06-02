import { ITableHeight, ITableConfig } from 'src/interfaces';
import { ADMIN } from 'src/constants';

export const OTHER_HEIGHT: ITableHeight = {
  userTable: '201px',
  dailyTable: '381px',
  contactTable: '296px',
  myContactTable: '296px',
  blacklistTable: '520px',
  exportTable: '250px',
  reportTable: '296px'
};

export const addItemFilter = (filter: string[] | string, item: string) => [
  ...filter,
  item
];

export const deleteItemFilter = (filter: string[], item: string) => {
  return filter?.filter((id: string) => item !== id);
};

export const tableConfigCallback = (
  isFullTable: boolean,
  rowsForJob: boolean,
  isMyContact?: boolean
) => {
  const personalInfo = [
    {
      code: 'linkedin',
      name: 'Li',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'first_name',
      name: 'First name',
      hasFilter: true,
      isFiltered: true,
      hasInputFilter: true
    },
    {
      code: 'last_name',
      name: 'Last name',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'full_name',
      name: 'Full name',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'gender',
      name: 'Gender',
      hasFilter: true,
      isFiltered: false,
      hasCheckboxFilter: true
    }
  ];

  const locationInfo = [
    {
      code: 'city',
      name: 'City',
      hasFilter: true,
      isFiltered: false,
      hasMultiSelectFilter: true
    },
    {
      code: 'region',
      name: 'Region',
      hasFilter: true,
      isFiltered: false,
      hasMultiSelectFilter: true
    },
    {
      code: 'country',
      name: 'Country',
      hasFilter: true,
      isFiltered: false,
      hasMultiSelectFilter: true
    }
  ];

  const workInfo = [
    {
      code: 'social_networks',
      name: 'Social Networks',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'phone',
      name: 'Phone',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    }
  ];

  const emailInfo = [
    {
      code: 'email',
      name: 'Email',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'requires_validation',
      name: 'Validation',
      hasFilter: true,
      isFiltered: false,
      hasRadioFilter: true
    }
  ];

  const companyInfo = [
    {
      code: 'company',
      name: 'Company',
      hasFilter: true,
      isFiltered: false,
      hasMultiSelectFilter: true
    },
    {
      code: 'company_size',
      name: 'Company size',
      hasFilter: true,
      isFiltered: false,
      hasMultiSelectFilter: true
    },
    {
      code: 'company_linkedin',
      name: 'Company Li',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'company_website',
      name: 'Company website',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    }
  ];

  const jobInfo = [
    {
      code: 'jobs',
      name: 'Job',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'jobs_skills',
      name: 'Job Skills',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    }
  ];

  const blacklistInfo = {
    code: 'blacklist',
    name: 'blacklist',
    hasFilter: true,
    isFiltered: false,
    hasCheckboxFilter: true
  };

  const commentInfo = {
    code: 'comment',
    name: 'Comment',
    hasFilter: true,
    isFiltered: false,
    hasInputFilter: true
  };

  const dateContactInfo = [
    {
      code: 'contact_created',
      name: 'Contact created',
      hasFilter: true,
      isFiltered: true,
      hasDataRangeFilter: true,
      hasSorting: true
    },
    {
      code: 'contact_updated',
      name: 'Contact updated',
      hasFilter: true,
      isFiltered: true,
      hasDataRangeFilter: true,
      hasSorting: true
    }
  ];

  const dateCompanyInfo = [
    {
      code: 'company_created',
      name: 'Company created',
      hasFilter: true,
      isFiltered: false,
      hasDataRangeFilter: true
    },
    {
      code: 'founded',
      name: 'Founded',
      hasFilter: true,
      isFiltered: false,
      hasDataRangeFilter: true
    }
  ];

  const positionInfo = {
    code: 'position',
    name: 'Title',
    hasFilter: true,
    isFiltered: false,
    hasMultiSelectFilter: true
  };

  const industryInfo = {
    code: 'company_industry',
    name: 'Industry',
    hasFilter: true,
    isFiltered: false,
    hasMultiSelectFilter: true
  };

  const ctoInfo = {
    code: 'cto',
    name: 'CTO',
    hasFilter: true,
    isFiltered: false,
    hasInputFilter: true
  };

  const skypeInfo = {
    code: 'skype',
    name: 'Skype',
    hasFilter: true,
    isFiltered: false,
    hasInputFilter: true
  };

  const birthdayInfo = {
    code: 'date_of_birth',
    name: 'Date of birth',
    hasFilter: true,
    isFiltered: false,
    hasDataRangeFilter: true,
    hasSorting: true
  };

  const responsibleInfo = {
    code: 'responsible',
    name: 'Responsible',
    hasFilter: true,
    isFiltered: true,
    hasMultiSelectFilter: true
  };

  const inWorkInfo = [
    {
      code: 'is_in_work',
      name: 'In work',
      hasFilter: true,
      isFiltered: true,
      hasCheckboxFilter: true
    },
    {
      code: 'date_of_use',
      name: 'Date of use',
      hasFilter: true,
      isFiltered: true,
      hasDataRangeFilter: true,
      hasSorting: true
    }
  ];

  const tableConfig: ITableConfig = {
    rows: rowsForJob
      ? [
          { code: '№', name: '№', hasFilter: false, isFiltered: false },
          ...personalInfo,
          positionInfo,
          ...companyInfo,
          ...emailInfo,
          ...locationInfo,
          industryInfo,
          ...jobInfo,
          commentInfo,
          ctoInfo,
          ...workInfo
        ]
      : [
          { code: '№', name: '№', hasFilter: false, isFiltered: false },
          ...personalInfo,
          positionInfo,
          ...companyInfo,
          ...emailInfo,
          ...locationInfo,
          industryInfo,
          commentInfo,
          ctoInfo,
          ...workInfo
        ],
    column: {
      hasSelectAll: true,
      hasDelete: true,
      hasEdit: true,
      hasInfo: false,
      hasCopy: true
    },
    body: {}
  };

  if (isMyContact) {
    const allInfo = rowsForJob
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

    if (isFullTable) {
      return {
        rows: [
          ...dateContactInfo,
          ...personalInfo,
          positionInfo,
          ...companyInfo,
          ...emailInfo,
          {
            code: 'confidence',
            name: 'Confidence',
            hasFilter: true,
            isFiltered: false,
            hasNumericRangeFilter: true
          },
          ...locationInfo,
          industryInfo,
          ...jobInfo,
          commentInfo,
          ctoInfo,
          ...dateCompanyInfo,
          {
            code: 'company_type',
            name: 'Type of company',
            hasFilter: true,
            isFiltered: false,
            hasCheckboxFilter: true
          },
          {
            code: 'company_subsidiary',
            name: 'Subsidiary companies',
            hasFilter: true,
            isFiltered: false,
            hasInputFilter: true
          },
          {
            code: 'company_holding',
            name: 'Holding companies',
            hasFilter: true,
            isFiltered: false,
            hasInputFilter: true
          },
          {
            code: 'origin',
            name: 'Origin',
            hasFilter: true,
            isFiltered: true,
            hasCheckboxFilter: true
          },
          {
            code: 'service_id',
            name: 'ID',
            hasFilter: true,
            isFiltered: false,
            hasInputFilter: true
          },
          {
            code: 'added_to_mailing',
            name: 'Added to mailing',
            hasFilter: true,
            isFiltered: false,
            hasDataRangeFilter: true,
            hasSorting: true
          },
          {
            code: 'last_touch',
            name: 'Last touch',
            hasFilter: true,
            isFiltered: false,
            hasDataRangeFilter: true,
            hasSorting: true
          },
          {
            code: 'sequence',
            name: 'Sequence',
            hasFilter: true,
            isFiltered: false,
            hasInputFilter: true
          },
          {
            code: 'status',
            name: 'Status',
            hasFilter: true,
            isFiltered: false,
            hasCheckboxFilter: true
          },
          {
            code: 'opens',
            name: 'Opens',
            hasFilter: true,
            isFiltered: false,
            hasNumericRangeFilter: true
          },
          {
            code: 'views',
            name: 'Views',
            hasFilter: true,
            isFiltered: false,
            hasNumericRangeFilter: true
          },
          {
            code: 'deliveries',
            name: 'Deliveries',
            hasFilter: true,
            isFiltered: false,
            hasNumericRangeFilter: true
          },
          {
            code: 'replies',
            name: 'Replies',
            hasFilter: true,
            isFiltered: false,
            hasNumericRangeFilter: true
          },
          {
            code: 'bounces',
            name: 'Bounces',
            hasFilter: true,
            isFiltered: false,
            hasCheckboxFilter: true
          },
          {
            code: 'mails',
            name: 'Mails',
            hasFilter: true,
            isFiltered: false,
            hasInputFilter: true
          },
          {
            code: 'my_notes',
            name: 'My notes',
            hasFilter: true,
            isFiltered: false,
            hasInputFilter: true
          },
          {
            code: 'sale_created',
            name: 'Sale created',
            hasFilter: true,
            isFiltered: false,
            hasDataRangeFilter: true
          },
          {
            code: 'source',
            name: 'Source',
            hasFilter: true,
            isFiltered: false,
            hasMultiSelectFilter: true
          },
          {
            code: 'sale_id',
            name: 'Sale ID',
            hasFilter: true,
            isFiltered: false,
            hasInputFilter: true
          },
          {
            code: 'sale_status',
            name: 'Sale status',
            hasFilter: true,
            isFiltered: false,
            hasCheckboxFilter: true
          },
          {
            code: 'project_c1',
            name: '1C Project',
            hasFilter: false,
            isFiltered: false,
            hasRadioFilter: true
          },
          ...workInfo,
          {
            code: 'colleague',
            name: 'Colleague',
            hasFilter: false,
            isFiltered: false,
            hasInputFilter: true
          },
          skypeInfo,
          birthdayInfo,
          responsibleInfo,
          ...inWorkInfo,
          blacklistInfo
        ],
        column: tableConfig.column,
        body: tableConfig.body
      };
    }
    return {
      rows: [...dateContactInfo, ...allInfo],
      column: tableConfig.column,
      body: tableConfig.body
    };
  }
  return tableConfig;
};

export const getRolesValuesForRequest = (rolesArray: string[]) => {
  return rolesArray?.map(item => {
    if (item === 'Admin') return ADMIN;

    return item.toLocaleLowerCase();
  });
};
