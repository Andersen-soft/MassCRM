import React, { FC } from 'react';
import { CommonButton, CommonInput } from 'src/view/atoms';
import { DateRange } from 'src/view/molecules';
import { useStyles } from './Filters.styles';

export const Filters: FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      {/* TODO replace by real methods on the stage of implementing functionality */}
      <form className={styles.form} onSubmit={() => {}}>
        <div className={styles.formFilters}>
          <div className={styles.formFilter}>
            <DateRange
              code='date'
              name='date'
              // TODO replace by real methods on the stage of implementing functionality
              onChange={() => {}}
              placeholder='Date'
              singular
              styleProp='fullWidth'
            />
          </div>
          <div className={styles.formFilter}>
            <CommonInput onChangeValue={() => {}} />
          </div>
        </div>
        <div className={styles.formControls}>
          {/* TODO replace by real methods on the stage of implementing functionality */}
          <CommonButton
            text='Clear all'
            color='white'
            type='reset'
            onClickHandler={() => {}}
          />
          {/* TODO replace by real methods on the stage of implementing functionality */}
          <CommonButton
            text='Filter'
            color='yellow'
            onClickHandler={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default Filters;
