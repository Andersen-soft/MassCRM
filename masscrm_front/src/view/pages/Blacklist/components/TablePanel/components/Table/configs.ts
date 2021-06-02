import { IBlacklistItem, ITableConfig, ITableRow } from 'src/interfaces';

export const blacklistTableConfig: ITableConfig = {
  rows: [
    {
      code: 'blacklist',
      name: 'blacklist',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      code: 'user',
      name: 'user',
      // TODO refine after backend will be implemented
      // temporarily false due to the absence of corresponding filter on the backend side
      hasFilter: false,
      isFiltered: false,
      // TODO refine after backend will be implemented
      // temporarily false due to the absence of corresponding filter on the backend side
      hasInputFilter: false
    },
    {
      code: 'date',
      name: 'date',
      hasFilter: true,
      isFiltered: false,
      hasDataRangeFilter: true
    }
  ],
  column: {
    hasDelete: true,
    hasSelectAll: true
  },
  body: {}
};

export const blacklistTableMap = ({
  id,
  created_at,
  domain,
  source,
  user
}: IBlacklistItem): ITableRow => ({
  id: id as number,
  cells: [
    {
      data: domain
    },
    {
      data: user?.login || source
    },
    {
      data: created_at
    }
  ]
});
