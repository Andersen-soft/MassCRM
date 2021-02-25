import React, { FC } from 'react';
import { CommonButton, CommonInput, DateRange } from 'src/components/common';
import { styleNames } from 'src/services';
import { IMock } from '../..';

import style from './Filters.scss';

interface IUsersInfo {
  usersInfo: IMock[];
}

const sn = styleNames(style);

export const Filters: FC = () => (
  <div className={sn('wrapper')}>
    {/* TODO replace by real methods on the stage of implementing functionality */}
    <form className={sn('form')} onSubmit={() => {}}>
      <div className={sn('form-filters')}>
        <div className={sn('form-filter')}>
          <DateRange
            name='date'
            // TODO replace by real methods on the stage of implementing functionality
            onChange={() => {}}
            placeholder='Date'
            singular
            styleProp='fullWidth'
          />
        </div>
        <div className={sn('form-filter')}>
          <CommonInput onChangeValue={() => {}} />
        </div>
      </div>
      <div className={sn('form-controls')}>
        {/* TODO replace by real methods on the stage of implementing functionality */}
        <CommonButton
          text='Clear all'
          color='white'
          type='reset'
          onClickHandler={() => {}}
        />
        {/* TODO replace by real methods on the stage of implementing functionality */}
        <CommonButton text='Filter' color='yellow' onClickHandler={() => {}} />
      </div>
    </form>
  </div>
);

export default Filters;
