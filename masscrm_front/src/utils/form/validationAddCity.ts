import { string, object, array } from 'yup';
import { LOCATION_REG_EXP } from 'src/constants';
import { ICity } from 'src/interfaces';

export const addCitySchema = (cities: ICity[]) =>
  object().shape({
    location: array().of(
      object().shape({
        city: string()
          .lowercase()
          .matches(LOCATION_REG_EXP, 'Invalid format')
          .required('Required field')
          .notOneOf(
            cities.map(({ name }) => name.toLowerCase()),
            'The city is already exist'
          )
          .nullable(),
        region: string()
          .required('Required field')
          .nullable(),
        country: string()
          .required('Required field')
          .nullable()
      })
    )
  });
