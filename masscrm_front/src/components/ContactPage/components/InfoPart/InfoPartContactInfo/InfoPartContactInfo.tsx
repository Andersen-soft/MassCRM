import React, { FC, useCallback, useMemo } from 'react';
import { styleNames } from 'src/services';
import { IContactResult, IEMail, IPhone } from 'src/interfaces';
import { GENDER_MAP } from 'src/utils/map';
import {
  ShowMoreInformation,
  CustomSwitch,
  LinkedinField
} from 'src/components/common';
import { socialNetworks } from 'src/data/socialNetworks';

import { getFullName } from 'src/utils/contact';
import style from './InfoPartContactInfo.scss';

const sn = styleNames(style);

type IShowMoreItems = (IPhone | IEMail | string)[];

export const InfoPartContactInfo: FC<{ contactData: IContactResult }> = ({
  contactData: {
    responsible,
    phones,
    emails,
    origin,
    linkedin,
    first_name,
    last_name,
    full_name,
    gender,
    birthday,
    location,
    skype,
    confidence,
    comment,
    social_networks
  }
}) => {
  const genderName = gender ? GENDER_MAP[gender] : '';

  const infoItem = useCallback(
    (label, value, fun?) => (
      <div className={sn('wrapperForDataPair')}>
        <span className={sn('spanLeft')}>{label && `${label}:`}</span>
        <span className={sn('spanRight')}>{fun ? fun() : value}</span>
      </div>
    ),
    [
      responsible,
      phones,
      emails,
      origin,
      linkedin,
      full_name,
      first_name,
      last_name,
      gender,
      birthday,
      location,
      skype,
      confidence,
      comment,
      social_networks
    ]
  );

  const socialItem = useCallback(({ link }) => {
    let socialName = '';
    socialNetworks.forEach((item: string) => {
      if (link.includes(item)) socialName = item;
    });

    return <LinkedinField link={link} linkType={socialName} />;
  }, []);

  const socialField = useCallback(() => social_networks?.map(socialItem), [
    socialItem,
    social_networks
  ]);

  const showMoreBtn = useCallback(
    (list: Array<{ id?: number; value?: string }>) =>
      infoItem('', false, () => (
        <ShowMoreInformation>
          {list?.map(
            ({ id, value }, index) =>
              index > 0 && (
                <div className={sn('list')} key={id || value}>
                  {value}
                </div>
              )
          )}
        </ShowMoreInformation>
      )),
    []
  );

  const showMoreItems = (items: IShowMoreItems | undefined, func: any) =>
    items && items?.length > 1 && showMoreBtn(items.map(func));

  const contactDataMap = [
    {
      title: 'Responsible',
      value: responsible
    },
    {
      title: 'Phone',
      value: phones[0]?.phone,
      showMore: showMoreItems(phones, ({ id, phone }: IPhone) => ({
        id,
        value: phone
      }))
    },
    {
      title: 'Full Name',
      value: getFullName({
        firstName: first_name,
        lastName: last_name,
        fullName: full_name
      })
    },
    {
      title: 'Skype',
      value: skype && <LinkedinField link={skype} linkType='skype' />
    },
    {
      title: 'Gender',
      value: genderName
    },
    {
      title: 'Email',
      value: emails[0]?.email,
      showMore: showMoreItems(emails, ({ id, email }: IEMail) => ({
        id,
        value: email
      }))
    },
    {
      title: 'Date of Birth',
      value: birthday
    },
    {
      title: 'Requires validation',
      value: <CustomSwitch disabled value={emails[0]?.verification || false} />
    },
    {
      title: 'Country',
      value: location?.country
    },
    {
      title: 'Confidence',
      value: confidence
    },
    {
      title: 'Region',
      value: location?.region
    },
    {
      title: 'Origin',
      value: origin?.[0] || '',
      showMore: showMoreItems(origin, (value: string) => ({ value }))
    },
    {
      title: 'City',
      value: location?.city
    },

    {
      title: 'LinkedIn',
      value: <LinkedinField link={linkedin} linkType='linkedin' />
    },

    {
      title: 'Other social networks',
      element: socialField
    }
  ];

  const mainInformation = useMemo(
    () =>
      contactDataMap.map(({ title, value, element, showMore }) => (
        <div className={sn('item')} key={title}>
          {infoItem(title, value, element)}
          {showMore}
        </div>
      )),
    [contactDataMap]
  );

  return (
    <div className={sn('wrapper')}>
      <div className={sn('column')}>{mainInformation}</div>
      <div className={`${sn('column')} ${sn('column_small')}`}>
        {infoItem('Comment', comment)}
      </div>
    </div>
  );
};
