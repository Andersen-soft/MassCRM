import React, { FC } from 'react';
import { styleNames } from 'src/services';
import { ContactPopup } from '.';
import style from './ContactCell.scss';
import { IContactCell } from './interfaces';

const sn = styleNames(style);

export const ContactTD: FC<IContactCell> = ({ value = [], type }) => {
  const hrefLink = type === 'emails' ? `mailto:` : 'tel:';

  const linkItem = (item: string) => (
    <a href={`${hrefLink}${item}`} className={sn('list-td_link')} key={item}>
      {item}
    </a>
  );

  return (
    <div className={sn('list-td')}>
      {value?.length > 0 ? linkItem(value[0]) : ''}
      {value?.length > 1 ? (
        <ContactPopup value={value} linkItemMap={linkItem} />
      ) : (
        ''
      )}
    </div>
  );
};
