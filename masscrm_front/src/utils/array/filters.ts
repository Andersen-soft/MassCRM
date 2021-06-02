export const getStringifiedItemsWithoutChosenOne = (
  item: number,
  itemsToSearchIn?: number[]
) => itemsToSearchIn?.filter(contact => contact !== item).join(',') || '';

export const getStringifiedItemsWithoutChosenOnes = (
  itemsToFilter: number[],
  itemsToSearchIn?: number[]
) =>
  itemsToFilter
    ?.filter(contact => !itemsToSearchIn?.includes(contact))
    .join(',') || '';

type ContainsAllElemsArg = (string | number)[];

export const containsAllElems = (
  arr1: ContainsAllElemsArg,
  arr2: ContainsAllElemsArg
) => arr2.every(arr2Item => arr1.includes(arr2Item));
