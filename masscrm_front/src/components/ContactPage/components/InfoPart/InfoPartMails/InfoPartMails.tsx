import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import style from './InfoPartMails.scss';
import { styleNames } from '../../../../../services';
import { IStoreState } from '../../../../../interfaces';
import { getOneContactRequest } from '../../../../../actions';

export const InfoPartMails = () => {
  const sn = styleNames(style);
  const dispatch = useDispatch();
  const oneContactDataMails = useSelector(
    (state: IStoreState) => state.oneContact.data.mails
  );
  const oneContactDataNotes = useSelector(
    (state: IStoreState) => state.oneContact.data.note
  );
  const location = useLocation();
  const contactId = Number(new URLSearchParams(location.search).get('id'));

  useEffect(() => {
    dispatch(getOneContactRequest(contactId));
  }, []);

  const mailDataCallback = (
    mailArray: Array<{ id: number; message: string }>
  ) => {
    if (mailArray.length > 0) {
      return mailArray.map(element => (
        <div key={element.id.toString()}>
          <span className={sn('spanLeft')}>Mails:</span>
          <span className={sn('spanRight')}>{element.message}</span>
        </div>
      ));
    }
    return (
      <div>
        <span className={sn('spanLeft')}>Mails:</span>
        <span className={sn('spanRight')} />
      </div>
    );
  };

  const noteDataCallback = (
    noteArray: Array<{ id: number; message: string }>
  ) => {
    if (noteArray.length > 0) {
      return noteArray.map(element => (
        <div key={element.id.toString()}>
          <span className={sn('spanLeft')}>My notes:</span>
          <span className={sn('spanRight')}>{element.message}</span>
        </div>
      ));
    }
    return (
      <div>
        <span className={sn('spanLeft')}>note:</span>
        <span className={sn('spanRight')} />
      </div>
    );
  };

  return (
    <div className={sn('column')}>
      {mailDataCallback(oneContactDataMails)}
      {noteDataCallback(oneContactDataNotes)}
    </div>
  );
};
