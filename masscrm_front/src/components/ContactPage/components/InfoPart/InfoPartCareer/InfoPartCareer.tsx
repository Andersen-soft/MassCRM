import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import style from './InfoPartCareer.scss';
import { styleNames } from '../../../../../services';
import { IStoreState } from '../../../../../interfaces';
import { getOneContactRequest } from '../../../../../actions';
import { CommonIcon } from '../../../../common/CommonIcon';

export const InfoPartCareer = () => {
  const sn = styleNames(style);
  const dispatch = useDispatch();
  const { company, position } = useSelector(
    (state: IStoreState) => state.oneContact.data
  );

  const buildInfoItem = (item: any, label: string) => {
    return {
      ...item,
      label,
      icon: Edit
    };
  };

  const info = useMemo(
    () => [
      buildInfoItem(company, 'Company'),
      buildInfoItem(position, 'Position')
    ],
    [company, position]
  );

  const location = useLocation();
  const contactId = Number(new URLSearchParams(location.search).get('id'));

  useEffect(() => {
    dispatch(getOneContactRequest(contactId));
  }, []);

  return (
    <>
      <div className={sn('section')}>
        <div className={sn('subHeader')}>
          <div className={sn('startLine')} />
          <span className={sn('subTitle')}> Current company</span>
        </div>

        <div className={sn('wrapper')}>
          <div className={sn('column')}>
            <div>
              <span className={sn('spanLeft')}>Date of change:</span>
              <span className={sn('spanRight')}>01.01.2020</span>
            </div>
            {info.map(({ name, label, icon }) => (
              <div className={sn('rowWithIcon')} key={name}>
                <span className={sn('rowWithIonLeftPart')}>{label}:</span>
                <span className={sn('rowWithIconRightPart')}>
                  <span className={sn('rowWithIconRightPartText')}>{name}</span>
                  <CommonIcon IconComponent={icon} />
                </span>
              </div>
            ))}
          </div>
          <div className={sn('column')}>
            <div>
              <span className={sn('spanLeft')} />
              <span className={sn('spanRight')} />
            </div>
          </div>
          <div className={sn('column')}>
            <div>
              <span className={sn('spanLeft')} />
              <span className={sn('spanRight')} />
            </div>
          </div>
        </div>
      </div>

      <div className={sn('divide')} />

      <div className={sn('section')}>
        <div className={sn('subHeader')}>
          <span className={sn('subTitle')}> previous company</span>
        </div>
        <div className={sn('wrapper')}>
          <div className={sn('column')}>
            <div>
              <span className={sn('spanLeft')}>Date of change:</span>
              <span className={sn('spanRight')}>01.01.2020</span>
            </div>
            <div>
              <span className={sn('spanLeft')}>Company:</span>
              <span className={sn('spanRight')}>01.01.2020</span>
            </div>
            <div>
              <span className={sn('spanLeft')}>Position:</span>
              <span className={sn('spanRight')}>01.01.2020</span>
            </div>
          </div>
          <div className={sn('column')}>
            <div>
              <span className={sn('spanLeft')} />
              <span className={sn('spanRight')} />
            </div>
          </div>
          <div className={sn('column')}>
            <div>
              <span className={sn('spanLeft')} />
              <span className={sn('spanRight')} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
