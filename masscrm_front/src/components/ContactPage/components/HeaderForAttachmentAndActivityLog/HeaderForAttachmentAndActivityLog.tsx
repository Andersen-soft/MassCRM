import React, { FC } from 'react';
import style from '../../ContactPage.scss';
import { styleNames } from '../../../../services';

interface Props {
  label: string;
  buttonElement: JSX.Element;
}

export const HeaderForAttachmentAndActivityLog: FC<Props> = ({
  label,
  buttonElement: ButtonElement
}) => {
  const sn = styleNames(style);
  return (
    <div>
      <span className={sn('attachmentTitle')}>{label}</span>
      {ButtonElement}
    </div>
  );
};
