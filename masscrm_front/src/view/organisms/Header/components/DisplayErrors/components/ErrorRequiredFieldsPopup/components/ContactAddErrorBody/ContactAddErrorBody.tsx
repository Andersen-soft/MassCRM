import React, { FC } from 'react';
import { NON_FILLED_REQUIRED_FIELDS } from 'src/constants';
import { useStyles } from './ContactAddErrorBody.styles';

interface IProps {
  handleToggleEditContact: () => void;
  errorsData: string[];
}

export const ContactAddErrorBody: FC<IProps> = ({
  handleToggleEditContact,
  errorsData
}) => {
  const styles = useStyles();

  const parseData = errorsData.map(item => JSON.parse(item)).flat();

  return (
    <div className='item'>
      <div className={styles.title}>
        {`${NON_FILLED_REQUIRED_FIELDS} (${parseData.join('/')}).`}
      </div>
      <div className={styles.subtitle}>
        Please use the link to edit the contact:
      </div>
      <button
        type='button'
        className={styles.link}
        onClick={handleToggleEditContact}
      >
        link to the contact
      </button>
    </div>
  );
};
