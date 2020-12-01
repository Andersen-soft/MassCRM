import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import { getContact } from 'src/selectors';
import { CommonButton, ContactEdit } from 'src/components/common';
import {
  getCountryList,
  getFiltersData,
  getIndustriesList,
  getOneContactRequest,
  getPreviousCompanies
} from 'src/actions';
import {
  InfoPartCareer,
  InfoPartCampaigns,
  InfoPartSale,
  InfoPartContactInfo,
  InfoPartMails,
  DeleteContact
} from '.';
import style from './InfoPart.scss';

const sn = styleNames(style);

const buttonData = [
  { type: 'contactInfo', label: 'Contact Info' },
  { type: 'career', label: 'Career' },
  { type: 'sale', label: 'Sale' },
  { type: 'campaigns', label: 'Campaigns' },
  { type: 'mails', label: 'Mails' }
];

export const InfoPart: FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  const contactData = useSelector(getContact);
  const [isActiveTab, setToActiveTab] = useState<string>('contactInfo');
  const [open, setOpen] = useState(false);
  const [autoFocus, setAutoFocus] = useState<string>();
  const { company, position, sales = [] } = contactData;

  const handleToggleEditForm = useCallback(
    (focus?: string) => {
      setOpen(val => !val);
      setAutoFocus(focus);
    },
    [setOpen]
  );

  const infoPartBody = useMemo(() => {
    switch (isActiveTab) {
      case 'career':
        return (
          <InfoPartCareer
            id={id}
            company={company}
            position={position}
            handleChange={handleToggleEditForm}
          />
        );
      case 'sale':
        return <InfoPartSale sales={sales} />;
      case 'campaigns':
        return <InfoPartCampaigns contactData={contactData} />;
      case 'mails':
        return <InfoPartMails contactData={contactData} />;
      default:
        return <InfoPartContactInfo contactData={contactData} />;
    }
  }, [contactData, isActiveTab]);

  const clickHandler = useCallback(
    (type: string) => () => {
      setToActiveTab(type);
    },
    [setToActiveTab]
  );

  const tabs = useMemo(
    () =>
      buttonData.map(item => (
        <button
          key={item.type}
          type='button'
          className={item.type === isActiveTab ? sn('active') : sn('')}
          onClick={clickHandler(item.type)}
        >
          {item.label}
        </button>
      )),
    [buttonData, isActiveTab, clickHandler]
  );

  const onSubmitSuccess = useCallback(() => {
    id && dispatch(getOneContactRequest(id));
    dispatch(getPreviousCompanies(id));
  }, [id]);

  useEffect(() => {
    id && dispatch(getOneContactRequest(id));
    dispatch(getIndustriesList());
    dispatch(getCountryList());
    dispatch(getFiltersData());
  }, []);

  return (
    <div className={sn('info-body')}>
      <div className={sn('info-header')}>
        <div className={sn('info-tabs')}>{tabs}</div>
        <div className={sn('info-tools')}>
          <CommonButton
            text='Edit page'
            onClickHandler={handleToggleEditForm}
          />
          <DeleteContact id={id} />
        </div>
      </div>
      <div className={sn('info-content')}>{contactData.id && infoPartBody}</div>
      {open && (
        <ContactEdit
          contact={contactData}
          handleClose={handleToggleEditForm}
          open={open}
          autoFocus={autoFocus}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
    </div>
  );
};
