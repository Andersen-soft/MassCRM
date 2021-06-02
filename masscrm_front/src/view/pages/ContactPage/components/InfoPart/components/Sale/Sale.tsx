import React, { FC, useCallback, useMemo } from 'react';
import { ISale } from 'src/interfaces';
import { Done } from '@material-ui/icons';
import { CommonIcon } from 'src/view/atoms';
import { infoPartStyles } from 'src/styles';
import { Item } from '..';
import { titlesMap } from './constants';

interface IProps {
  sales: ISale[];
}

export const Sale: FC<IProps> = ({ sales }) => {
  const infoPartClasses = infoPartStyles();

  const saleRowItem = useCallback(
    (key, title, value?) => (
      <Item
        title={title}
        key={key}
        value={
          typeof value === 'boolean' ? (
            <CommonIcon IconComponent={Done} style={{ color: '#46C662' }} />
          ) : (
            value
          )
        }
      />
    ),
    []
  );

  const saleColumnItem = useCallback((item: ISale) => {
    const keys = Object.keys(item);

    return (
      <div className={infoPartClasses.column}>
        {keys.map(key => saleRowItem(key, titlesMap[key], item[key]))}
      </div>
    );
  }, []);

  const saleColumn = useMemo(
    () =>
      sales.length ? (
        sales.map(saleColumnItem)
      ) : (
        <div className={infoPartClasses.column}>
          {Object.values(titlesMap).map(item => saleRowItem(item, item))}
        </div>
      ),
    [sales]
  );

  return <div className={infoPartClasses.wrapper}>{saleColumn}</div>;
};
