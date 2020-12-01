import React, { FC, useCallback, useMemo } from 'react';
import { styleNames } from 'src/services';
import { ISale } from 'src/interfaces';
import { Done } from '@material-ui/icons';
import { CommonIcon } from 'src/components/common/CommonIcon';
import { InfoPartItem } from '../InfoPartItem';
import style from '../InfoPart.scss';

const sn = styleNames(style);

const titlesMap: { [key: string]: string } = {
  id: 'Sale ID',
  status: 'Sale Status',
  create_at: 'Sale created',
  project_c1: '1C Project',
  source: 'Source',
  link: 'Sale link'
};

export const InfoPartSale: FC<{ sales: ISale[] }> = ({ sales }) => {
  const saleRowItem = useCallback(
    (key, title, value?) => (
      <InfoPartItem
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
      <div className={sn('column')}>
        {keys.map(key => saleRowItem(key, titlesMap[key], item[key]))}
      </div>
    );
  }, []);

  const saleColumn = useMemo(
    () =>
      sales.length ? (
        sales.map(saleColumnItem)
      ) : (
        <div className={sn('column')}>
          {Object.values(titlesMap).map(item => saleRowItem(item, item))}
        </div>
      ),
    [sales]
  );

  return <div className={sn('wrapper')}>{saleColumn}</div>;
};
