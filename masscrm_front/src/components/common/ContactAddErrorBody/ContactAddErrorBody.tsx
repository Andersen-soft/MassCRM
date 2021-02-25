import React, { FC } from 'react';
import { styleNames } from 'src/services';

import style from './ContactAddErrorBody.scss';

const sn = styleNames(style);

interface IContactAddErrorBody {
  handleToggleEditContact: any;
  errorsData: string[];
}

export const ContactAddErrorBody: FC<IContactAddErrorBody> = ({
  handleToggleEditContact,
  errorsData
}) => {
  const parseData = errorsData.map(item => JSON.parse(item)).flat();

  return (
    <div className={sn('item')}>
      <div className={sn('title')}>
        {`There are some required fields that must be filled in (${parseData.join(
          '/'
        )}).`}
      </div>
      <div className={sn('subtitle')}>
        Please use the link to edit the contact:
      </div>
      <button
        type='button'
        className={sn('link')}
        onClick={handleToggleEditContact}
      >
        link to the contact
      </button>
    </div>
  );
};
