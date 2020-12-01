import React, { FC, useMemo } from 'react';
import { styleNames } from 'src/services';
import { ContactPopup } from '.';
import style from '../cell.scss';
import { ShowAllTD } from '..';
import { IContactCell } from './interfaces';

const sn = styleNames(style);

export const ContactTD: FC<IContactCell> = ({ value = [], type }) => {
  const hrefLink = useMemo(() => {
    switch (type) {
      case 'phones':
        return 'tel:';
      default:
        return null;
    }
  }, [type]);

  const linkItem = (item: string) =>
    hrefLink && (
      <a href={`${hrefLink}${item}`} className={sn('list-td_link')} key={item}>
        {item}
      </a>
    );

  return type === 'note' ? (
    <ShowAllTD value={value} />
  ) : (
    <div className={sn('list-td')}>
      {value?.length > 0 && hrefLink ? linkItem(value[0]) : value[0]}
      {value?.length > 1 ? (
        <ContactPopup
          value={value}
          linkItemMap={linkItem}
          isLink={!!hrefLink}
        />
      ) : (
        ''
      )}
    </div>
  );
};
