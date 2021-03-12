import PermIdentity from 'assets/svg/perm_identity.svg';
import HourGlass from 'assets/svg/hourglass.svg';
import Sum from 'assets/svg/sum.svg';
import Cross from 'assets/svg/cross.svg';
import {
  IReportTableMapForManager,
  IReportTableMapForNC2,
  IReportTableMapForNC1
} from 'src/interfaces';
import {
  ITableConfig,
  ITableRow
} from 'src/components/common/Table/interfaces';

const commonRowsConfig = [
  {
    name: 'duplicates',
    hasFilter: false,
    isFiltered: false,
    hasInputFilter: false
  },
  {
    name: 'in review',
    hasFilter: false,
    isFiltered: false,
    hasInputFilter: false,
    IconComponent: PermIdentity
  },
  {
    name: 'waiting',
    hasFilter: false,
    isFiltered: false,
    hasInputFilter: false,
    IconComponent: HourGlass
  },
  {
    name: 'declined',
    hasFilter: false,
    isFiltered: false,
    hasInputFilter: false,
    IconComponent: Cross
  },
  {
    name: 'total errors',
    hasFilter: false,
    isFiltered: false,
    hasInputFilter: false,
    IconComponent: Sum
  }
];

const commonColumnConfig = {
  hasDelete: false,
  hasSelectAll: true
};

export const reportTableConfigForManager: ITableConfig = {
  rows: [
    { name: '№', hasFilter: false, isFiltered: false },
    {
      name: 'employee',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'role',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'created',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false
    },
    {
      name: 'updated',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false
    },
    {
      name: 'total',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false
    },
    ...commonRowsConfig
  ],
  column: { ...commonColumnConfig },
  body: {}
};

export const reportTableConfigForNC1: ITableConfig = {
  rows: [
    { name: '№', hasFilter: false, isFiltered: false },
    {
      name: 'date',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false
    },
    {
      name: 'created',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false
    },
    ...commonRowsConfig
  ],
  column: { ...commonColumnConfig },
  body: {}
};

export const reportTableConfigForNC2: ITableConfig = {
  rows: [
    { name: '№', hasFilter: false, isFiltered: false },
    {
      name: 'date',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false
    },
    {
      name: 'created',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false
    },
    {
      name: 'updated',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false
    },
    {
      name: 'total',
      hasFilter: false,
      isFiltered: false,
      hasInputFilter: false
    },
    ...commonRowsConfig
  ],
  column: { ...commonColumnConfig },
  body: {}
};

export const reportTableMapForManager = (
  {
    id,
    employee,
    role,
    created,
    updated,
    total,
    duplicates,
    inReview,
    waiting,
    declined,
    totalErrors
  }: IReportTableMapForManager,
  index: number
): ITableRow => ({
  id: id as number,
  cells: [
    {
      data: index + 1
    },
    {
      data: employee
    },
    {
      data: role
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
      data: duplicates
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

export const reportTableMapForNC1 = (
  {
    id,
    date,
    created,
    duplicates,
    inReview,
    waiting,
    declined,
    totalErrors
  }: IReportTableMapForNC1,
  index: number
): ITableRow => ({
  id: id as number,
  cells: [
    {
      data: index + 1
    },
    {
      data: date
    },
    {
      data: created
    },
    {
      data: duplicates
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

export const reportTableMapForNC2 = (
  {
    id,
    date,
    created,
    updated,
    total,
    duplicates,
    inReview,
    waiting,
    declined,
    totalErrors
  }: IReportTableMapForNC2,
  index: number
): ITableRow => ({
  id: id as number,
  cells: [
    {
      data: index + 1
    },
    {
      data: date
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
      data: duplicates
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
