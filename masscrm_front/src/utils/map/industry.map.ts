import { IIndustry } from 'src/interfaces';

export const findIndustryIDByName = (
  industriesNames: string[],
  industries: IIndustry[]
) => {
  return industries.reduce((result: number[], { name, id }: IIndustry) => {
    if (industriesNames.includes(name)) return [...result, id];
    return result;
  }, []);
};

export const getNamesOfIndustry = (items: IIndustry[]) => {
  return items.map(({ name }) => name);
};

export const joinNamesOfIndusrty = (items: IIndustry[]) => {
  return getNamesOfIndustry(items).join(',');
};
