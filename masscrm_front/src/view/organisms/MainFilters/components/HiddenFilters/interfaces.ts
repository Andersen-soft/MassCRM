import { FiltersParamsItemType } from 'src/interfaces';

export interface IChangeFilterArgs {
  code: string;
  item: FiltersParamsItemType;
  isCheckbox?: boolean;
}
