export interface ICountry {
  id?: number;
  code: string;
  name: string;
}

export interface IRegion {
  id?: number;
  code: string;
  name: string;
}

export interface ICity {
  name: string;
}

export interface ILocation {
  [key: string]: string | undefined;
  country?: string;
  region?: string;
  city?: string;
}

export interface ILocations {
  country?: Array<ICountry>;
  region?: Array<IRegion>;
  city?: Array<ICity>;
}
