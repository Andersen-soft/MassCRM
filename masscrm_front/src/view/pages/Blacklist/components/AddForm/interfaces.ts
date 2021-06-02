export interface IInitialAdd {
  emails: string;
}

export interface IMapRequest {
  [index: string]: (value: string, date: object, limit?: number) => void;
  blacklist: (value: string, date: object, limit?: number) => void;
  user: (value: string, date: object, limit?: number) => void;
}
