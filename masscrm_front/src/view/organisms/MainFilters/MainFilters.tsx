import React, { FC, useCallback } from 'react';
import { FiltersParamsItemType, FiltersStateType } from 'src/interfaces';
import { useDispatch } from 'react-redux';
import { setMultiFilterValues } from 'src/store/slices';
import { TableInputFilter } from 'src/view/organisms';
import { CommonButton } from 'src/view/atoms';
import { mainFiltersConfig } from './configs';
import { HiddenFilters } from './components';
import { useStyles } from './MainFilter.styles';

interface IProps {
  autocompleteValues: (name: string) => string[];
  onChangeFilter?: Function;
  initialFilters: FiltersStateType;
  handleChangeInput: (value: string, name: string) => void;
  resetAllFilters: () => void;
  isFullTable?: boolean;
  rowsForJob?: boolean;
}

export const MainFilters: FC<IProps> = ({
  autocompleteValues,
  onChangeFilter,
  initialFilters,
  handleChangeInput,
  resetAllFilters,
  isFullTable,
  rowsForJob
}) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const filtersConfig = mainFiltersConfig(isFullTable, rowsForJob);

  const handleChangeFilter = useCallback(
    (filterParams: {
      code: string;
      item: FiltersParamsItemType;
      isCheckbox?: boolean;
    }) => {
      if (Object.keys(initialFilters).includes(filterParams.code)) {
        dispatch(
          setMultiFilterValues({
            [filterParams.code]: filterParams.item as string[]
          })
        );
      }
      return onChangeFilter ? onChangeFilter(filterParams) : [];
    },
    [initialFilters, handleChangeInput]
  );

  const resetFilters = useCallback(() => {
    resetAllFilters();
  }, []);
  return (
    <div className={styles.filterWrapper}>
      <span className={styles.title}>Filter by</span>
      <div className={styles.inputWrapper}>
        {filtersConfig.map(
          ({
            name,
            code,
            placeholder,
            mainFilter,
            multiSelect,
            isHidden
          }: any) =>
            !isHidden && (
              <TableInputFilter
                key={name}
                className={`${styles.normalInput} ${styles.input}`}
                mainFilter={mainFilter}
                multiSelect={multiSelect}
                value={initialFilters[code]}
                placeholder={placeholder}
                name={name}
                code={code}
                changeFilter={handleChangeFilter}
                changeInput={handleChangeInput}
                items={autocompleteValues(code)}
              />
            )
        )}
        <div data-testid='reset_filter_btn'>
          <CommonButton
            text='Reset filter'
            onClickHandler={resetFilters}
            className={styles.resetButton}
          />
        </div>
      </div>
      <HiddenFilters
        filtersConfig={filtersConfig}
        handleChangeFilter={handleChangeFilter}
        autocompleteValues={autocompleteValues}
        filtersState={initialFilters}
        handleChangeInput={handleChangeInput}
      />
    </div>
  );
};
