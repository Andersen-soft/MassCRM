import React, { FC, useMemo } from 'react';
import { styleNames } from 'src/services';
import { IContactResult } from 'src/interfaces';
import style from '../InfoPart.scss';
import { InfoPartItem } from '..';

const sn = styleNames(style);

const campaignsDataMap: { [key: string]: string } = {
  id: 'ID',
  added_to_mailing: 'Added to mailing',
  last_touch: 'Last touch',
  sequences: 'Sequences',
  status: 'Status',
  opens: 'Opens',
  views: 'View',
  deliveries: 'Deliveries',
  replies: 'Replies',
  bounces: 'Bounces'
};

export const InfoPartCampaigns: FC<{ contactData: IContactResult }> = ({
  contactData
}) => {
  const info = useMemo(
    () =>
      Object.keys(campaignsDataMap).map(item => (
        <div className={sn('column')} key={item}>
          <InfoPartItem
            title={campaignsDataMap[item]}
            key={item}
            value={contactData[item]}
          />
        </div>
      )),
    [contactData]
  );

  return <div className={sn('wrapper')}>{info}</div>;
};
