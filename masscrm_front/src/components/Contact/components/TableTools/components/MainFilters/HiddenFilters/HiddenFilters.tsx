import React, { FC, useMemo, useState } from 'react';
import { InputFilter } from 'src/components/common';
import {
  FiltersParamsItemType,
  FiltersStateType,
  IMultiFilterState,
  IConfigItem
} from 'src/interfaces';
import { ArrowDropUpRounded, ArrowDropDownRounded } from '@material-ui/icons';
import { mainFilterStyle } from '../MainFilter.style';

interface IChangeFilterArgs {
  name: string;
  item: FiltersParamsItemType;
  isCheckbox?: boolean;
}

interface IHiddenFilterProps {
  filtersConfig: IConfigItem[];
  handleChangeFilter: (arg: IChangeFilterArgs) => void;
  multiFiltersState: IMultiFilterState;
  autocompleteValues: (name: string) => string[];
  filtersState: FiltersStateType;
  handleChangeInput: (value: string, name: string) => void;
}

export const HiddenFilters: FC<IHiddenFilterProps> = ({
  filtersConfig,
  handleChangeFilter,
  multiFiltersState,
  autocompleteValues,
  filtersState,
  handleChangeInput
}) => {
  const style = mainFilterStyle();
  const [show, setShow] = useState(false);

  const handleClickDropButton = () => setShow(prev => !prev);

  const dropButton = useMemo(
    () => (
      <button
        id='dropButton'
        className={style.dropButton}
        onClick={handleClickDropButton}
        type='button'
        data-testid='more_filters_btn'
      >
        <span>{show ? 'Hide filters' : 'More filters'}</span>
        {show ? <ArrowDropUpRounded /> : <ArrowDropDownRounded />}
      </button>
    ),
    [show]
  );

  return (
    <div className={style.dropWrapper}>
      <div className={style.hiddenFilterWrapper}>
        {show &&
          filtersConfig.map(
            ({
              name,
              placeholder,
              mainFilter,
              multiSelect,
              isMultiFilterState,
              isHidden
            }) =>
              isHidden && (
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
      </div>
      {dropButton}
    </div>
  );
};
