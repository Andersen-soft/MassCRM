import React, { FC, useCallback, useMemo } from 'react';
import { IContactResult, IEMail, IPhone } from 'src/interfaces';
import { CustomSwitch } from 'src/view/atoms';
import { ShowMoreInformation } from 'src/view/organisms';
import { socialNetworks } from 'src/constants';
import { getFullName, GENDER_MAP } from 'src/utils';
import { LinkedinField } from 'src/view/molecules';
import { ShowMoreItems } from './interfaces';
import { useStyles } from './ContactInfo.styles';

interface IProps {
  contactData: IContactResult;
}

export const ContactInfo: FC<IProps> = ({
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

  const styles = useStyles();

  const infoItem = useCallback(
    (label, value, fun?) => (
      <div className={styles.wrapperForDataPair}>
        <span className={styles.spanLeft}>{label && `${label}:`}</span>
        <span className={styles.spanRight}>{fun ? fun() : value}</span>
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
    (list: { id?: number; value?: string }[]) =>
      infoItem('', false, () => (
        <ShowMoreInformation>
          {list?.map(
            ({ id, value }, index) =>
              index && (
                <div className={styles.list} key={id || value}>
                  {value}
                </div>
              )
          )}
        </ShowMoreInformation>
      )),
    []
  );

  const showMoreItems = (func: any, items?: ShowMoreItems) =>
    items && items?.length > 1 && showMoreBtn(items.map(func));

  const contactDataMap = [
    {
      title: 'Responsible',
      value: responsible
    },
    {
      title: 'Phone',
      value: phones[0]?.phone,
      showMore: showMoreItems(
        ({ id, phone }: IPhone) => ({
          id,
          value: phone
        }),
        phones
      )
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
      showMore: showMoreItems(
        ({ id, email }: IEMail) => ({
          id,
          value: email
        }),
        emails
      )
    },
    {
      title: 'Date of Birth',
      value: birthday
    },
    {
      title: 'Requires validation',
      value: (
        <CustomSwitch
          disabled
          value={emails.length ? emails[0].verification : false}
        />
      )
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
      showMore: showMoreItems((value: string) => ({ value }), origin)
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
        <div className={styles.item} key={title}>
          {infoItem(title, value, element)}
          {showMore}
        </div>
      )),
    [contactDataMap]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>{mainInformation}</div>
      <div className={`${styles.column} ${styles.columnSmall}`}>
        {infoItem('Comment', comment)}
      </div>
    </div>
  );
};
