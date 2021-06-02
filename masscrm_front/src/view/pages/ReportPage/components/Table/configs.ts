import PermIdentity from 'assets/svg/perm_identity.svg';
import HourGlass from 'assets/svg/hourglass.svg';
import Sum from 'assets/svg/sum.svg';
import Cross from 'assets/svg/cross.svg';
import {
  IReportTableMapForManager,
  IReportTableMapForNC2,
  IReportTableMapForNC1,
  ITableConfig,
  ITableRow,
  ReportNCData,
  IDatesPeriod
} from 'src/interfaces';
import { NC1, NC2 } from 'src/constants';
import { IReportSortingFieldId } from './interfaces';

const commonRowsConfig = [
  {
    code: 'in_review',
    name: 'in review',
    hasFilter: false,
    isFiltered: false,
    hasInputFilter: false,
    // TODO set true when Draft-page will be implemented
    hasSorting: false,
    IconComponent: PermIdentity
  },
  {
    code: 'waiting',
    name: 'waiting',
    hasFilter: false,
    isFiltered: false,
    hasInputFilter: false,
    // TODO set true when Draft-page will be implemented
    hasSorting: false,
    IconComponent: HourGlass
  },
  {
    code: 'declined',
    name: 'declined',
    hasFilter: false,
    isFiltered: false,
    hasInputFilter: false,
    // TODO set true when Draft-page will be implemented
    hasSorting: false,
    IconComponent: Cross
  },
  {
    code: 'total_errors',
    name: 'total errors',
    hasFilter: false,
    isFiltered: false,
    hasInputFilter: false,
    // TODO set true when Draft-page will be implemented
    hasSorting: false,
    IconComponent: Sum
  }
];

export const reportTableConfigForManager: ITableConfig = {
  rows: [
    { code: '№', name: '№', hasFilter: false, isFiltered: false },
    {
      code: 'employee',
      name: 'employee',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'role',
      name: 'role',
      hasFilter: true,
      isFiltered: false,
      hasCheckboxFilter: true
    },
    {
      code: 'created',
      name: 'created',
      hasFilter: false,
      isFiltered: false,
      hasSorting: true,
      hasInputFilter: false
    },
    {
      code: 'updated',
      name: 'updated',
      hasFilter: false,
      isFiltered: false,
      hasSorting: true,
      hasInputFilter: false
    },
    {
      code: 'total',
      name: 'total',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false,
      hasSorting: true
    },
    ...commonRowsConfig
  ],
  column: {
    hasDelete: false,
    hasSelectAll: true
  },
  body: {}
};

export const reportTableConfigForNC1: ITableConfig = {
  rows: [
    { code: '№', name: '№', hasFilter: false, isFiltered: false },
    {
      code: 'date',
      name: 'date',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false
    },
    {
      code: 'created',
      name: 'created',
      hasFilter: false,
      isFiltered: false,
      hasSorting: true,
      hasInputFilter: false
    },
    ...commonRowsConfig
  ],
  column: {
    hasDelete: false,
    hasSelectAll: false
  },
  body: {}
};

export const reportTableConfigForNC2: ITableConfig = {
  rows: [
    { code: '№', name: '№', hasFilter: false, isFiltered: false },
    {
      code: 'date',
      name: 'date',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false
    },
    {
      code: 'created',
      name: 'created',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false,
      hasSorting: true
    },
    {
      code: 'updated',
      name: 'updated',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false,
      hasSorting: true
    },
    {
      code: 'total',
      name: 'total',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false,
      hasSorting: true
    },
    ...commonRowsConfig
  ],
  column: {
    hasDelete: false,
    hasSelectAll: false
  },
  body: {}
};

const getDatesPeriod = ({ from, to }: IDatesPeriod) => {
  return from !== to ? `${from} - ${to}` : `${from}`;
};

const isCurrItemSummaryData = (
  index: number,
  arr: ReportNCData,
  condition?: boolean
) => condition && index === arr.length - 1;

export const reportTableMapForManager = (
  {
    id,
    name,
    surname,
    role,
    created,
    updated,
    total,
    inReview,
    waiting,
    declined,
    totalErrors
  }: IReportTableMapForManager,
  index: number
): ITableRow => ({
  id,
  cells: [
    {
      data: index + 1
    },
    {
      data: `${name} ${surname}`
    },
    {
      data: role
        .map((item: string) =>
          item === NC1 || item === NC2 ? item.toUpperCase() : item
        )
        .join(', ')
    },
    {
      data: created
    },
    {
      data: updated
    },
    {
      data: total
    },
    {
      data: inReview
    },
    {
      data: waiting
    },
    {
      data: declined
    },
    {
      data: totalErrors
    }
  ]
});

export const reportTableMapForNC1 = (mapSummaryData?: boolean) => (
  reportTableMapData: IReportTableMapForNC1,
  index: number,
  arr: IReportTableMapForNC1[]
): ITableRow => {
  const {
    date,
    created,
    inReview,
    waiting,
    declined,
    totalErrors
  } = reportTableMapData;

  return {
    id: index + 1,
    cells: [
      {
        data: isCurrItemSummaryData(index, arr, mapSummaryData)
          ? 'Overall'
          : index + 1
      },
      {
        data: isCurrItemSummaryData(index, arr, mapSummaryData)
          ? getDatesPeriod(reportTableMapData.period || ({} as IDatesPeriod))
          : date
      },
      {
        data: created
      },
      {
        data: inReview
      },
      {
        data: waiting
      },
      {
        data: declined
      },
      {
        data: totalErrors
      }
    ]
  };
};

export const reportTableMapForNC2 = (mapSummaryData?: boolean) => (
  reportTableMapData: IReportTableMapForNC2,
  index: number,
  arr: IReportTableMapForNC2[]
): ITableRow => {
  const {
    date,
    created,
    updated,
    total,
    inReview,
    waiting,
    declined,
    totalErrors
  } = reportTableMapData;

  return {
    id: index + 1,
    cells: [
      {
        data: isCurrItemSummaryData(index, arr, mapSummaryData)
          ? 'Overall'
          : index + 1
      },
      {
        data: isCurrItemSummaryData(index, arr, mapSummaryData)
          ? getDatesPeriod(reportTableMapData.period || ({} as IDatesPeriod))
          : date
      },
      {
        data: created
      },
      {
        data: updated
      },
      {
        data: total
      },
      {
        data: inReview
      },
      {
        data: waiting
      },
      {
        data: declined
      },
      {
        data: totalErrors
      }
    ]
  };
};

export const REPORT_SORTING_FIELDS_CONFIG: IReportSortingFieldId = {
  created: 'created',
  updated: 'updated',
  total: 'total'
  // TODO add other fields after Draft-page implementation
};
