import React, { FC, useCallback } from 'react';
import {
  IMultiFilterState,
  FiltersTypes,
  FiltersParamsItemType,
  FiltersStateType,
  IConfigItem
} from 'src/interfaces';
import { useDispatch } from 'react-redux';
import { setMultiFilterValues } from 'src/actions';
import { initialFiltersState } from 'src/reducers/tableFilters.reducer';
import { InputFilter, CommonButton } from 'src/components/common';
import { mainFilterStyle } from './MainFilter.style';
import { mainFiltersConfig } from '../../../ContactTable/configs/mainFilters.config';
import { HiddenFilters } from './HiddenFilters';

interface IMainFiltersProps {
  autocompleteValues: (name: string) => string[];
  onChangeFilter?: Function;
  filtersState: FiltersStateType;
  multiFiltersState: IMultiFilterState;
  handleChangeInput: (value: string, name: string) => void;
  resetFilter: (resetObject: FiltersTypes) => void;
  isFullTable?: boolean;
  rowsForJob?: boolean;
}

export const MainFilters: FC<IMainFiltersProps> = ({
  autocompleteValues,
  onChangeFilter,
  filtersState,
  multiFiltersState,
  handleChangeInput,
  resetFilter,
  isFullTable,
  rowsForJob
}) => {
  const style = mainFilterStyle();
  const dispatch = useDispatch();
  const filtersConfig = mainFiltersConfig(isFullTable, rowsForJob);
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
      <div className={style.inputWrapper}>
        {filtersConfig.map(
          ({
            name,
            placeholder,
            mainFilter,
            multiSelect,
            isMultiFilterState,
            isHidden
          }) =>
            !isHidden && (
              <InputFilter
                key={name}
                className={`${style.normalInput} ${style.input}`}
                mainFilter={mainFilter}
                multiSelect={multiSelect}
                value={
                  isMultiFilterState
                    ? multiFiltersState[name]
                    : filtersState[name]
                }
                placeholder={placeholder}
                name={name}
                changeFilter={handleChangeFilter}
                changeInput={handleChangeInput}
                items={autocompleteValues(name)}
              />
            )
        )}
        <CommonButton
          text='Reset filter'
          onClickHandler={resetFilters}
          className={style.resetButton}
        />
      </div>
      <HiddenFilters
        filtersConfig={filtersConfig}
        handleChangeFilter={handleChangeFilter}
        multiFiltersState={multiFiltersState}
        autocompleteValues={autocompleteValues}
        filtersState={filtersState}
        handleChangeInput={handleChangeInput}
      />
    </div>
  );
};
