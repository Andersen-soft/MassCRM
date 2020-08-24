import React from 'react';

import { styleNames } from 'src/services';
import style from './PopUp.scss';

export interface IPopUp {
  name: string;
  linkName: string;
  href: string;
  date: string;
}

const sn = styleNames(style);

export const LinkedInBlock = ({ name, date, linkName, href }: IPopUp) => {
  return (
    <div className={sn('wrapper')}>
      <p className={sn('description')}>
        This LinkedIn profile is already used for another contact
      </p>
      <a href={href} className={sn('name')}>
        {linkName}
      </a>
      <span className={sn('created')}>created:&nbsp;</span>
      <span className={sn('date')}>{date}</span>
      <br />
      <span className={sn('responsible')}>responsible:&nbsp;</span>
      <span className={sn('responsiblePerson')}>{name}</span>
    </div>
  );
};
