import { createProperty } from '../object';

const filterDivider = '~';
const filterPairDivider = '--';
const arrayRecognizer = '__';
const arrayValueDivider = '_';
const objectValueDivider = '..';

export const objectSerialize = (obj: any, uglifier: any) =>
  Object.keys(obj)
    .map(item => `${item}${objectValueDivider}${uglifier(obj[item])}`)
    .join(filterPairDivider);

export const urlUglify = (item: any): string => {
  const type = Object.prototype.toString
    .call(item)
    .split(' ')[1]
    .slice(0, -1);
  const valueTypesUglify: { [index: string]: () => string } = {
    Array: () => `${arrayRecognizer}${item.join(arrayValueDivider)}`,
    Object: () => `${objectSerialize(item, urlUglify)}`,
    String: () => item
  };
  return valueTypesUglify[type]();
};

export const urlSerialize = (obj: any) =>
  Object.keys(obj)
    .map(item => `${item}${filterPairDivider}${urlUglify(obj[item])}`)
    .join(filterDivider);

const splitFilterPairs = (str: any) =>
  str.split(filterDivider).map((pair: string) => pair.split(filterPairDivider));

export const urlDeserialize = (str: any) =>
  splitFilterPairs(str).reduce((acc: any, cur: any) => {
    const key = cur[0];
    const value = cur.slice(1);
    const type = {
      [createProperty(
        'current',
        value.length === 1 && value[0].startsWith(arrayRecognizer)
      )]: 'Array',
      [createProperty(
        'current',
        value[0].split(objectValueDivider).length > 1
      )]: 'Object',
      default: 'String'
    };
    const valueTypesBeautify: { [index: string]: string | object } = {
      Array: value[0].slice(2).split('_'),
      Object: Object.assign(
        (acc[key] = {}),
        Object.fromEntries(
          value.map((x: string) => x.split(objectValueDivider))
        )
      ),
      String: value[0]
    };

    acc[key] = valueTypesBeautify[type.current || type.default];

    return acc;
  }, {});
