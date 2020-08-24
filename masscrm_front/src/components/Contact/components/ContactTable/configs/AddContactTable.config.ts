import { ITableConfig } from 'src/components/common/Table/interfaces';

export const TableConfigCallBack = (
  isFullTable: boolean,
  isMyContact?: boolean
) => {
  const personalInfo = [
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
      code: 'country',
      name: 'Country',
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
      code: 'city',
      name: 'City',
      hasFilter: true,
      isFiltered: false,
      hasMultiSelectFilter: true
    }
  ];

  const workInfo = [
    {
      code: 'position',
      name: 'Position',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'linkedin',
      name: 'Li',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
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
      code: 'emails',
      name: 'E-mail',
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
      code: 'company_name',
      name: 'Company',
      hasFilter: true,
      isFiltered: false,
      hasMultiSelectFilter: true
    },
    {
      code: 'company_website',
      name: 'Company website',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'company_industries',
      name: 'Industry',
      hasFilter: true,
      isFiltered: false,
      hasMultiSelectFilter: true
    },
    {
      code: 'company_size',
      name: 'Company size',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'company_linkedin',
      name: 'Company LinkedIn',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'company_sto',
      name: 'CTO',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    }
  ];

  const jobInfo = [
    {
      code: 'job',
      name: 'Job',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'skills',
      name: 'Job Skills',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    }
  ];

  const commentInfo = {
    code: 'comment',
    name: 'Comment',
    hasFilter: true,
    isFiltered: false,
    hasInputFilter: true
  };

  const tableConfig: ITableConfig = {
    rows: [
      { name: '№', hasFilter: false, isFiltered: false },
      ...personalInfo,
      ...locationInfo,
      ...workInfo,
      ...emailInfo,
      ...companyInfo
    ],
    column: {
      hasSelectAll: true,
      hasDelete: true,
      hasEdit: true,
      hasInfo: false
    },
    body: {}
  };

  if (isFullTable) {
    tableConfig.rows.push(...jobInfo);
  }

  tableConfig.rows.push(commentInfo);

  if (isMyContact) {
    const allInfo = [
      ...personalInfo,
      {
        code: 'birthday',
        name: 'Date of birth',
        hasFilter: true,
        isFiltered: false,
        hasDataRangeFilter: true,
        hasSorting: true
      },
      ...locationInfo,
      ...workInfo,
      {
        code: 'skype',
        name: 'Skype',
        hasFilter: true,
        isFiltered: false,
        hasInputFilter: true
      },
      ...emailInfo
    ];

    const dateContactInfo = [
      {
        code: 'created',
        name: 'Contact created',
        hasFilter: true,
        isFiltered: true,
        hasDataRangeFilter: true,
        hasSorting: true
      },
      {
        code: 'updated',
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
        code: 'company_founded',
        name: 'Founded',
        hasFilter: true,
        isFiltered: false,
        hasDataRangeFilter: true
      }
    ];

    if (isFullTable) {
      return {
        rows: [
          {
            code: 'responsible',
            name: 'Responsible',
            hasFilter: true,
            isFiltered: true,
            hasMultiSelectFilter: true
          },
          ...dateContactInfo,
          {
            code: 'origin',
            name: 'Origin',
            hasFilter: true,
            isFiltered: true,
            hasCheckboxFilter: true
          },
          ...allInfo,
          {
            code: 'confidence',
            name: 'Confidence',
            hasFilter: true,
            isFiltered: false,
            hasNumericRangeFilter: true
          },
          {
            code: 'collegue',
            name: 'Collegue',
            hasFilter: true,
            isFiltered: false,
            hasInputFilter: true
          },
          {
            code: 'id',
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
            code: 'sequence_status',
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
            hasInputFilter: true
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
            code: 'sale_project_c1',
            name: '1C Project',
            hasFilter: true,
            isFiltered: false,
            hasRadioFilter: true
          },
          ...companyInfo,
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
            code: 'holding_subsidiary',
            name: 'Holding company',
            hasFilter: true,
            isFiltered: false,
            hasInputFilter: true
          },
          ...dateCompanyInfo,
          ...jobInfo,
          commentInfo
        ],
        column: tableConfig.column,
        body: tableConfig.body
      };
    }
    return {
      rows: [
        ...dateContactInfo,
        ...allInfo,
        ...companyInfo,
        ...dateCompanyInfo,
        ...jobInfo,
        commentInfo
      ],
      column: tableConfig.column,
      body: tableConfig.body
    };
  }
  return tableConfig;
};
