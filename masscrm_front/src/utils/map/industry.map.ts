import { IIndustry } from 'src/interfaces';

export const findIndustryIDByName = (
  industriesNames: Array<string>,
  industries: Array<IIndustry>
) => {
  return industries.reduce((result: number[], { name, id }: IIndustry) => {
    if (industriesNames.includes(name)) return [...result, id];
    return result;
  }, []);
};

export const getNamesOfIndustry = (items: Array<IIndustry>) => {
  return items.map(({ name }) => name);
};

export const joinNamesOfIndusrty = (items: Array<IIndustry>) => {
  return getNamesOfIndustry(items).join(',');
};
