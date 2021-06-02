import { ICity } from 'src/interfaces';

type Location = string | number;
export interface IFormItem {
  [key: string]: string | number | ICity[] | undefined;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  countryId: Location;
  regionCode: string;
  regionId: Location;
  cities?: ICity[];
}
