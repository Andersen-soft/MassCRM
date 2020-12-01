import React, { FC, useCallback } from 'react';
import {
  IMultiFilterState,
  FiltersTypes,
  FiltersParamsItemType,
  FiltersStateType
} from 'src/interfaces';
import { useDispatch } from 'react-redux';
import { setMultiFilterValues } from 'src/actions';
import { initialFiltersState } from 'src/reducers/tableFilters.reducer';
import { CommonButton } from '../../../../../common/CommonButton';
import { InputFilter } from '../../../../../common/TableInputFilter';
import { mainFilterStyle } from './MainFilter.style';
import { mainFiltersConfig } from '../../../ContactTable/configs/mainFilters.config';

interface IMainFiltersProps {
  autocompleteValues: (name: string) => string[];
  onChangeFilter?: Function;
  filtersState: FiltersStateType;
  multiFiltersState: IMultiFilterState;
  handleChangeInput: (value: string, name: string) => void;
  resetFilter: (resetObject: FiltersTypes) => void;
  isFullTable?: boolean;
}

interface IConfigItem {
  name: string;
  placeholder: string;
  littleInput: boolean;
  mainFilter: boolean;
  multiSelect: boolean;
  isMultiFilterState: boolean;
}

export const MainFilters: FC<IMainFiltersProps> = ({
  autocompleteValues,
  onChangeFilter,
  filtersState,
  multiFiltersState,
  handleChangeInput,
  resetFilter,
  isFullTable
}) => {
  const style = mainFilterStyle();
  const dispatch = useDispatch();
  const filtersConfig = mainFiltersConfig(isFullTable);
  const handleChangeFilter = useCallback(
    (filterParams: {
      name: string;
      item: FiltersParamsItemType;
      isCheckbox?: boolean;
    }) => {
      if (Object.keys(multiFiltersState).includes(filterParams.name)) {
        dispatch(
          setMultiFilterValues({
            [filterParams.name]: filterParams.item as string[]
          })
        );
      }
      return onChangeFilter ? onChangeFilter(filterParams) : [];
    },
    [filtersState, multiFiltersState, handleChangeInput]
  );

  const resetParams = () =>
    filtersConfig.reduce((acc: FiltersTypes, cur: IConfigItem) => {
      acc[cur.name] = initialFiltersState[cur.name];
      return acc;
    }, {});

  const resetFilters = useCallback(() => {
    resetFilter(resetParams());
  }, [filtersState]);

  return (
    <div className={style.filterWrapper}>
      <span className={style.title}>Filter by</span>
      {filtersConfig.map(
        ({
          name,
          placeholder,
          mainFilter,
          multiSelect,
          isMultiFilterState,
          littleInput
        }) => (
          <InputFilter
            key={name}
            className={
              littleInput
                ? `${style.littleInput} ${style.input}`
                : `${style.normalInput} ${style.input}`
            }
            mainFilter={mainFilter}
            multiSelect={multiSelect}
            value={
              isMultiFilterState ? multiFiltersState[name] : filtersState[name]
            }
            placeholder={placeholder}
            name={name}
            changeFilter={handleChangeFilter}
            changeInput={handleChangeInput}
            items={autocompleteValues(name)}
          />
        )
      )}
      <CommonButton text='Reset filter' onClickHandler={resetFilters} />
    </div>
  );
};
