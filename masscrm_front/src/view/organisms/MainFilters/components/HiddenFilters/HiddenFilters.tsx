import React, { FC, useMemo, useState } from 'react';
import { ArrowDropUpRounded, ArrowDropDownRounded } from '@material-ui/icons';
import { TableInputFilter } from 'src/view/organisms';
import { FiltersStateType, IConfigItem } from 'src/interfaces';
import { IChangeFilterArgs } from './interfaces';
import { useStyles } from './HiddenFilters.styles';

interface IProps {
  filtersConfig: IConfigItem[];
  handleChangeFilter: (arg: IChangeFilterArgs) => void;
  autocompleteValues: (name: string) => string[];
  filtersState: FiltersStateType;
  handleChangeInput: (value: string, name: string) => void;
}

export const HiddenFilters: FC<IProps> = ({
  filtersConfig,
  handleChangeFilter,
  autocompleteValues,
  filtersState,
  handleChangeInput
}) => {
  const styles = useStyles();

  const [show, setShow] = useState(false);

  const handleClickDropButton = () => setShow(prev => !prev);

  const dropButton = useMemo(
    () => (
      <button
        id='dropButton'
        className={styles.dropButton}
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
    <div className={styles.dropWrapper}>
      <div className={styles.hiddenFilterWrapper}>
        {show &&
          filtersConfig.map(
            ({ name, code, placeholder, mainFilter, multiSelect, isHidden }) =>
              isHidden && (
                <TableInputFilter
                  key={name}
                  className={`${styles.normalInput} ${styles.input}`}
                  mainFilter={mainFilter}
                  multiSelect={multiSelect}
                  value={filtersState[code]}
                  placeholder={placeholder}
                  name={name}
                  code={code}
                  changeFilter={handleChangeFilter}
                  changeInput={handleChangeInput}
                  items={autocompleteValues(code)}
                />
              )
          )}
      </div>
      {dropButton}
    </div>
  );
};
