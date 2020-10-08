import React, { useMemo, useState } from 'react';
import { styleNames } from 'src/services';
import { CommonButton } from '../../../common/CommonButton';
import style from './InfoPart.scss';
import { InfoPartContactInfo } from './InfoPartContactInfo';
import { InfoPartSale } from './InfoPartSale';
import { InfoPartCareer } from './InfoPartCareer';
import { InfoPartCampaigns } from './InfoPartCampaigns';
import { InfoPartMails } from './InfoPartMails';

const sn = styleNames(style);
export const InfoPart = () => {
  const [isActiveTab, setToActiveTab] = useState<string>('contactInfo');

  const buttonData = [
    { type: 'contactInfo', label: 'Contact Info' },
    { type: 'career', label: 'Career' },
    { type: 'sale', label: 'Sale' },
    { type: 'campaigns', label: 'Campaigns' },
    { type: 'mails', label: 'Mails' }
  ];

  const infoPartBody = useMemo(() => {
    switch (isActiveTab) {
      case 'career':
        return <InfoPartCareer />;
      case 'sale':
        return <InfoPartSale />;
      case 'campaigns':
        return <InfoPartCampaigns />;
      case 'mails':
        return <InfoPartMails />;
      default:
        return <InfoPartContactInfo />;
    }
  }, [isActiveTab]);

  const clickHandler = (type: string) => {
    setToActiveTab(type);
  };

  return (
    <div className={sn('bodyWrapper')}>
      <div className={sn('headerWrapper')}>
        <div className={sn('menuWrapper')}>
          {buttonData.map(item => (
            <button
              key={item.type}
              type='button'
              className={item.type === isActiveTab ? sn('active') : sn('')}
              onClick={() => clickHandler(item.type)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={sn('buttonWrapper')}>
          <CommonButton text='Edit page' />
          <CommonButton text='Delete page' />
        </div>
      </div>
      {infoPartBody}
    </div>
  );
};
