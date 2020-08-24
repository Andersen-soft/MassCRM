import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { SearchInput } from 'src/components/common/SearchInput';
import style from '../../Contact.scss';

const sn = styleNames(style);

export const AddContactSearch: FC = () => {
  return (
    <div className={sn('data-search')}>
      <span className={sn('data-title')}>Today&apos;s contact</span>
      <SearchInput
        width='230px'
        placeholder='Search'
        items={[]}
        onChange={() => false}
      />
    </div>
  );
};
