import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { styleNames } from '../../../../../services';
import style from './InfoPartCampaign.scss';
import { getOneContactRequest } from '../../../../../actions';
import { IStoreState } from '../../../../../interfaces';

export const InfoPartCampaigns = () => {
  const sn = styleNames(style);
  const dispatch = useDispatch();
  const oneContactData = useSelector(
    (state: IStoreState) => state.oneContact.data
  );
  const location = useLocation();
  const contactId = Number(new URLSearchParams(location.search).get('id'));

  useEffect(() => {
    dispatch(getOneContactRequest(contactId));
  }, []);

  return (
    <div className={sn('wrapper')}>
      <div className={sn('column')}>
        <div>
          <span className={sn('spanLeft')}>ID:</span>
          <span className={sn('spanRight')}>{oneContactData.id}</span>
        </div>
        <div>
          <span className={sn('spanLeft')}>Added to mailing:</span>
          <span className={sn('spanRight')}>
            {oneContactData.added_to_mailing}
          </span>
        </div>
        <div>
          <span className={sn('spanLeft')}>Last touch:</span>
          <span className={sn('spanRight')}>{oneContactData.last_touch}</span>
        </div>
        <div>
          <span className={sn('spanLeft')}>Sequences:</span>
          <span className={sn('spanRight')}>some text</span>
        </div>
        <div>
          <span className={sn('spanLeft')}>Status:</span>
          <span className={sn('spanRight')}>some text</span>
        </div>
        <div>
          <span className={sn('spanLeft')}>Opens:</span>
          <span className={sn('spanRight')}>{oneContactData.opens}</span>
        </div>
        <div>
          <span className={sn('spanLeft')}>View:</span>
          <span className={sn('spanRight')}>{oneContactData.views}</span>
        </div>
        <div>
          <span className={sn('spanLeft')}>Deliveries:</span>
          <span className={sn('spanRight')}>{oneContactData.deliveries}</span>
        </div>
      </div>
      <div className={sn('column')}>
        <div>
          <span className={sn('spanLeft')}>Replies:</span>
          <span className={sn('spanRight')}>{oneContactData.replies}</span>
        </div>
        <div>
          <span className={sn('spanLeft')}>Bounces:</span>
          <span className={sn('spanRight')}>{oneContactData.bounces}</span>
        </div>
      </div>
      <div className={sn('column')} />
    </div>
  );
};
