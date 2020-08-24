import React, { FC } from 'react';
import { PermIdentity } from '@material-ui/icons';
import { styleNames } from 'src/services';
import { getContactsLength, getUserRoles, getShowContact } from 'src/selectors';
import { LabelIconGroup } from 'src/components/common';
import { useSelector } from 'react-redux';
import style from '../../Contact.scss';

const sn = styleNames(style);

export const TablePanel: FC = () => {
  const dataLength = useSelector(getContactsLength);
  const user = useSelector(getUserRoles);
  const showContact = useSelector(getShowContact);

  return (
    <div className={sn('panel')}>
      <div className={sn('panel_item')}>
        <div className={sn('panel_title')}>
          {user?.nc1 ? 'My contacts' : 'All contacts'}
        </div>
      </div>
      {Boolean(dataLength) && (
        <div className={sn('panel_item')}>
          <LabelIconGroup
            label='Total'
            count={dataLength}
            icon={PermIdentity}
            isActive
          />
          <LabelIconGroup
            label='Show'
            count={showContact}
            icon={PermIdentity}
            isActive
          />
        </div>
      )}
    </div>
  );
};
