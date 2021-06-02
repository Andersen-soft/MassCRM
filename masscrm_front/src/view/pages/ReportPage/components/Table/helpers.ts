import { IReportMapRequest } from './interfaces';

// TODO ts
export const MAP_AUTOCOMPLETE_REPORT: any = {
  // TODO ts
  employee: (acc: any, current: any) => [
    ...acc.result,
    `${current.name} ${current.surname}`
  ],
  // TODO ts
  role: (acc: any, current: any) => [...acc.result, current.role]
};

export const MAP_REQUEST_REPORT: IReportMapRequest = {
  employee: (value: string, limit?: number) => ({
    limit,
    search: {
      employee: value
    }
  }),
  role: (value: string, limit?: number) => ({
    limit,
    search: {
      role: value
    }
  })
};
