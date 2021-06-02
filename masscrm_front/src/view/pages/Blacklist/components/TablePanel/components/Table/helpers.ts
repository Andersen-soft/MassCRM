import { IBlacklistItem } from 'src/interfaces';
import { IMapRequest } from './interfaces';

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
