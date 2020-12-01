import { IActivityLog } from 'src/interfaces';
import { ChangeEvent } from 'react';

export interface IChangePageArgs {
  page: number;
  query?: string;
  from?: string;
  to?: string;
}

export interface ISearchParams {
  page: number;
  limit: number;
  query?: string;
  from?: string;
  to?: string;
}

export interface IActivityLogProps {
  activityLog: IActivityLog;
  searchParams: ISearchParams;
  onChangeSearch: (searchWord: string) => void;
  handleDateOfChange: (name: string, value: Date[]) => void;
  onPaginationChange: (
    event: ChangeEvent<unknown>,
    currentPage: number
  ) => void;
  changePageHandler: ({ page, query, from, to }: IChangePageArgs) => void;
}
