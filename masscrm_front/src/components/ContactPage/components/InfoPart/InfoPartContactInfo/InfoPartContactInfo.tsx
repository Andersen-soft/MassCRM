import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { styleNames } from '../../../../../services';
import style from './InfoPartContactInfo.scss';
import { getOneContactRequest } from '../../../../../actions';
import { ISocialNetwork, IStoreState } from '../../../../../interfaces';
import LinkedInLogo from './images/linkedin.svg';
import SkypeLogo from './images/skype.svg';
import FacebookLogo from './images/facebook.svg';
import { CommonShowMoreButton } from '../../../../common/CommonShowMoreButton/CommonShowMoreButton';

export const InfoPartContactInfo = () => {
  const sn = styleNames(style);
  const dispatch = useDispatch();
  const oneContactData = useSelector(
    (state: IStoreState) => state.oneContact.data
  );

  const location = useLocation();
  const contactId = Number(new URLSearchParams(location.search).get('id'));
  const toggleMarginBottomPhones =
    oneContactData.phones.length > 1 ? { marginBottom: '6px' } : undefined;
  const toggleMarginBottomEmails =
    oneContactData.emails.length > 1 ? { marginBottom: '6px' } : undefined;
  const toggleMarginBottomOrigins =
    oneContactData.origin.length > 1 ? { marginBottom: '6px' } : undefined;
  const toggleMarginBottomColleagues =
    oneContactData.phones.length > 2 ? { marginBottom: '6px' } : undefined;

  useEffect(() => {
    dispatch(getOneContactRequest(contactId));
  }, []);

  const mapSocialNetworks = (socialNetworks: Array<ISocialNetwork>) => {
    return socialNetworks.map(socialNetwork => {
      if (socialNetwork.link.includes('facebook')) {
        return (
          <span key={socialNetwork.id.toString()} className={sn('spanRight')}>
            <a
              href={socialNetwork.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FacebookLogo className={sn('logo')} />
            </a>
          </span>
        );
      }
      return null;
    });
  };

  const mapColleagues = (colleagues: Array<string>) => {
    if (colleagues.length > 0) {
      return colleagues.slice(0, 2).map(colleague => (
        <span key={colleague} className={sn('spanRight')}>
          {colleague}
          <LinkedInLogo className={sn('logo')} />
        </span>
      ));
    }
    return null;
  };

  return (
    <div className={sn('wrapper')}>
      <div className={sn('column')}>
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>Responsible:</span>
          <span className={sn('spanRight')}>{oneContactData.responsible}</span>
        </div>
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>Full Name:</span>
          <span className={sn('spanRight')}>{oneContactData.fullName}</span>
        </div>
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>Gender:</span>
          <span className={sn('spanRight')}>{oneContactData.gender}</span>
        </div>
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>Date of Birth:</span>
          <span className={sn('spanRight')}>{oneContactData.birthday}</span>
        </div>
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>Country:</span>
          <span className={sn('spanRight')}>
            {oneContactData.location?.country}
          </span>
        </div>
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>City:</span>
          <span className={sn('spanRight')}>
            {oneContactData.location?.city}
          </span>
        </div>
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>Region:</span>
          <span className={sn('spanRight')}>
            {oneContactData.location?.region}
          </span>
        </div>
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>LinkedIn:</span>
          <span className={sn('spanRight')}>
            {oneContactData.linkedIn && (
              <a
                href={oneContactData.linkedIn}
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedInLogo className={sn('logo')} />
              </a>
            )}
          </span>
        </div>
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>Other Social Networks:</span>
          {mapSocialNetworks(oneContactData.social_networks)}
        </div>
      </div>
      <div className={sn('column')}>
        <div
          className={sn('wrapperForDataPair')}
          style={toggleMarginBottomPhones}
        >
          <span className={sn('spanLeft')}>Phone:</span>
          {oneContactData.phones?.length > 0 && (
            <span className={sn('spanRight')}>
              {oneContactData.phones[0].phone}
            </span>
          )}
        </div>
        {oneContactData.phones?.length > 1 && (
          <div className={sn('wrapperForShowMoreButton')}>
            <span className={sn('spanLeft')} />
            <span className={sn('spanRightForButton')}>
              <CommonShowMoreButton
                show='show more'
                color='#78829D'
                fontSize='12px'
              />
            </span>
          </div>
        )}
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>Skype:</span>
          <span className={sn('spanRight')}>
            {oneContactData.skype && <SkypeLogo className={sn('logo')} />}
          </span>
        </div>
        <div
          className={sn('wrapperForDataPair')}
          style={toggleMarginBottomEmails}
        >
          <span className={sn('spanLeft')}>Email:</span>
          {oneContactData.emails.length > 0 && (
            <span className={sn('spanRight')}>
              {oneContactData.emails[0].email}
            </span>
          )}
        </div>
        {oneContactData.emails.length > 1 && (
          <div className={sn('wrapperForShowMoreButton')}>
            <span className={sn('spanLeft')} />
            <span className={sn('spanRightForButton')}>
              <CommonShowMoreButton
                show='show more'
                color='#78829D'
                fontSize='12px'
              />
            </span>
          </div>
        )}
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>Confidence:</span>
          <span className={sn('spanRight')}>{oneContactData.confidence}</span>
        </div>
        <div
          className={sn('wrapperForDataPair')}
          style={toggleMarginBottomOrigins}
        >
          <span className={sn('spanLeft')}>Origin:</span>
          {oneContactData.origin.length > 0 && (
            <span className={sn('spanRight')}>{oneContactData.origin[0]}</span>
          )}
        </div>
        {oneContactData.origin.length > 1 && (
          <div className={sn('wrapperForShowMoreButton')}>
            <span className={sn('spanLeft')} />
            <span className={sn('spanRightForButton')}>
              <CommonShowMoreButton
                show='show more'
                color='#78829D'
                fontSize='12px'
              />
            </span>
          </div>
        )}
        <div
          className={sn('wrapperForDataPair')}
          style={toggleMarginBottomColleagues}
        >
          <span className={sn('spanLeft')}>Colleagues:</span>
          {mapColleagues(oneContactData.colleagues)}
          {oneContactData.colleagues.length > 2 && (
            <div className={sn('wrapperForShowMoreButton')}>
              <span className={sn('spanLeft')} />
              <span className={sn('spanRightForButton')}>
                <CommonShowMoreButton
                  show='show more'
                  color='#78829D'
                  fontSize='12px'
                />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={sn('column')}>
        <div className={sn('wrapperForDataPair')}>
          <span className={sn('spanLeft')}>comment:</span>
          <span className={sn('commentField')}>{oneContactData.comment}</span>
        </div>
      </div>
    </div>
  );
};
