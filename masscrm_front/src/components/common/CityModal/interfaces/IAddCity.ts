import { ICity } from '../../../../interfaces';

export interface IFormItem {
  [key: string]: string | number | ICity[] | undefined;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  countryId: string | number;
  regionCode: string;
  regionId: string | number;
  cities?: ICity[];
}

export interface IAddCityFomValues {
  location: IFormItem[];
}
