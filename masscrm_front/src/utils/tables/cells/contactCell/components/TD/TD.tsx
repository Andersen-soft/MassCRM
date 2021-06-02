import React, { FC, useMemo } from 'react';
import { ShowAllTD } from 'src/view/organisms';
import { IContactCell } from 'src/interfaces';
import { Popup } from './components';
import { useStyles } from './TD.styles';

export const TD: FC<IContactCell> = ({ value = [], type }) => {
  const styles = useStyles();

  const hrefLink = useMemo(() => (type === 'phones' ? 'tel' : null), [type]);

  const linkItem = (item: string) =>
    hrefLink && (
      <a href={`${hrefLink}${item}`} className={styles.listTDLink} key={item}>
        {item}
      </a>
    );

  return type === 'note' ? (
    <ShowAllTD value={value} />
  ) : (
    <div>
      {value?.length && hrefLink ? linkItem(value[0]) : value[0]}
      {value?.length > 1 ? (
        <Popup value={value} linkItemMap={linkItem} isLink={!!hrefLink} />
      ) : (
        ''
      )}
    </div>
  );
};
