import React, { FC, useState } from 'react';
import { styleNames } from 'src/services';
import { CSSTransition } from 'react-transition-group';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { CommonIcon } from '../../../common/CommonIcon';
import { ContactForm } from '.';
import style from './ContactForm.scss';

const sn = styleNames(style);

export const ContactFormSlider: FC = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(prev => !prev);
  };

  return (
    <div className={sn('form')}>
      <button type='button' className={sn('form__header')}>
        <span className={sn('form__title')}> New Contact </span>
        <CommonIcon
          IconComponent={checked ? ExpandLess : ExpandMore}
          isActive={checked}
          onClick={handleChange}
        />
      </button>
      <CSSTransition
        in={checked}
        timeout={400}
        classNames={sn(`list-transition`)}
        unmountOnExit
      >
        <div className={sn(`form__body`)}>
          <ContactForm />
        </div>
      </CSSTransition>
    </div>
  );
};
