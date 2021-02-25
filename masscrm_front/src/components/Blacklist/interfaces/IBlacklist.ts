export interface IPropsAddForm {
  changeLines?: (value: number) => void;
  tall?: boolean;
}

export interface IPropsTablePanel {
  showTable?: boolean;
  blacklistPage: boolean;
  changeShowTable: () => void;
}

export interface IPropsBlacklistTable {
  showCount: number;
  blacklistPage: boolean;
}

export interface IInitialAdd {
  emails: string;
}

export interface IShowCountItem {
  title: string;
  value: number;
}

export interface IResetFilter {
  [index: string]: () => void;
  blacklist: () => void;
  user: () => void;
  date: () => void;
}

export interface IMapRequest {
  [index: string]: (value: string, date: object, limit?: number) => void;
  blacklist: (value: string, date: object, limit?: number) => void;
  user: (value: string, date: object, limit?: number) => void;
}
