import React from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { styleNames } from 'src/services';
import { CommonIcon } from '../CommonIcon';
import style from './PopUp.scss';
import { IErrorsItem } from '../ContactForm/interfaces';

export interface IErrorContactPopup {
  errorsData: string[];
  handleClose: () => void;
}

const sn = styleNames(style);

export const ErrorContactPopup = ({
  errorsData,
  handleClose
}: IErrorContactPopup) => {
  const parseData = errorsData.map(item => JSON.parse(item)).flat();

  return (
    <div className={sn('wrapper')}>
      <CommonIcon
        className={sn('close')}
        IconComponent={CloseRoundedIcon}
        onClick={handleClose}
      />
      {parseData.map(
        ({ title, link, name, responsible, created_at }: IErrorsItem) => (
          <div key={link} className={sn('item')}>
            <p className={sn('item__title')}>{title}</p>
            <div className={sn('item__info')}>
              <div>
                <a
                  href={link}
                  target='_blank'
                  rel='noreferrer'
                  className={sn('name')}
                >
                  {name}
                </a>
              </div>
              <div>
                <span className={sn('created')}>created:&nbsp;</span>
                <span className={sn('date')}>{created_at}</span>
              </div>
              <div>
                <span className={sn('responsible')}>responsible:&nbsp;</span>
                <span className={sn('responsiblePerson')}>{responsible}</span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
