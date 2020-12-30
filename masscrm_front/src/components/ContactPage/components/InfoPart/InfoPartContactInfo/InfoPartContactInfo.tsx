import React, { FC, useCallback, useMemo } from 'react';
import { styleNames } from 'src/services';
import { IContactResult } from 'src/interfaces';
import { GENDER_MAP } from 'src/utils/map';
import { SocialIcon, ShowMoreInformation } from 'src/components/common';
import { socialNetworks } from 'src/data/socialNetworks';
import style from './InfoPartContactInfo.scss';

const sn = styleNames(style);

export const InfoPartContactInfo: FC<{ contactData: IContactResult }> = ({
  contactData
}) => {
  const {
    responsible,
    phones,
    emails,
    origin,
    linkedin,
    full_name,
    gender,
    birthday,
    location,
    skype,
    confidence,
    comment,
    social_networks
  } = contactData;

  const genderName = gender ? GENDER_MAP[gender] : '';

  const infoItem = useCallback(
    (label, value, fun?) => (
      <div className={sn('wrapperForDataPair')}>
        <span className={sn('spanLeft')}>{label && `${label}:`}</span>
        <span className={sn('spanRight')}>{fun ? fun() : value}</span>
      </div>
    ),
    [contactData]
  );

  const linkField = useCallback(
    (type: string, link?: string) => (
      <SocialIcon socialName={type} link={link} />
    ),
    [linkedin, skype, social_networks]
  );

  const socialItem = useCallback(({ link }) => {
    let socialName = '';
    socialNetworks.forEach((item: string) => {
      if (link.indexOf(item) >= 0) socialName = item;
    });

    return linkField(socialName, link);
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

  const showMorePhones = useMemo(
    () =>
      phones?.length > 1 &&
      showMoreBtn(phones.map(({ id, phone }) => ({ id, value: phone }))),
    [phones]
  );

  const showMoreEmails = useMemo(
    () =>
      emails?.length > 1 &&
      showMoreBtn(emails.map(({ id, email }) => ({ id, value: email }))),
    [emails]
  );

  const showMoreOrigins = useMemo(
    () =>
      origin &&
      origin?.length > 1 &&
      showMoreBtn(origin.map(value => ({ value }))),
    [origin]
  );

  const contactDataMap = [
    {
      title: 'Responsible',
      value: responsible
    },
    {
      title: 'Phone',
      value: phones[0]?.phone,
      showMore: showMorePhones
    },
    {
      title: 'Full Name',
      value: full_name
    },
    {
      title: 'Skype',
      value: skype && linkField('skype', skype)
    },
    {
      title: 'Gender',
      value: genderName
    },
    {
      title: 'Email',
      value: emails[0]?.email,
      showMore: showMoreEmails
    },
    {
      title: 'Date of Birth',
      value: birthday
    },
    {
      title: 'Confidence',
      value: confidence
    },
    {
      title: 'Country',
      value: location?.country
    },
    {
      title: 'Origin',
      value: origin?.length ? origin[0] : '',
      showMore: showMoreOrigins
    },
    {
      title: 'Region',
      value: location?.region
    },
    {
      title: 'LinkedIn',
      value: linkField('linkedin', linkedin)
    },
    {
      title: 'City',
      value: location?.city
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
