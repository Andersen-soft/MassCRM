import {
  ITableConfig,
  ITableRow
} from '../../components/common/Table/interfaces';
import { IBlacklistItem } from '../../interfaces';
import { IMapRequest } from '../../components/Blacklist/interfaces';

export const blacklistTableConfig: ITableConfig = {
  rows: [
    {
      name: 'blacklist',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
      name: 'user',
      hasFilter: true,
      isFiltered: false,
      hasInputFilter: true
    },
    {
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

export const MAP_AUTOCOMPLETE_BLACKLIST: any = {
  blacklist: (acc: any, current: IBlacklistItem) =>
    current.domain ? [...acc.result, current.domain] : [...acc.result],
  user: (acc: any, current: IBlacklistItem) =>
    current.user
      ? [...acc.result, `${current.user.name} ${current.user.surname}`]
      : [...acc.result]
};

export const MAP_REQUEST_BLACKLIST: IMapRequest = {
  blacklist: (value: string, date: object, limit?: number) => {
    return {
      limit,
      search: {
        date,
        domain: value
      }
    };
  },
  user: (value: string, date: object, limit?: number) => {
    return {
      limit,
      search: {
        date,
        user: value
      }
    };
  }
};

export const SORT = {
  field_name: 'date',
  type_sort: 'DESC'
};
