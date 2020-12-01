import React, { FC, useCallback, useMemo } from 'react';
import { styleNames } from 'src/services';
import { IContactResult, INote } from 'src/interfaces';
import style from '../InfoPart.scss';
import { InfoPartItem } from '..';

const sn = styleNames(style);

export const InfoPartMails: FC<{ contactData: IContactResult }> = ({
  contactData: { mails, note }
}) => {
  const itemsList = useCallback(
    (values: Array<INote>, title) =>
      values.map(({ id, message }) => (
        <InfoPartItem title={title} key={id} value={message} />
      )) || <InfoPartItem title={title} />,
    []
  );

  const columnsList = useMemo(
    () => [
      { data: mails || [], title: 'Mails' },
      { data: note || [], title: 'My notes' }
    ],
    [mails, note]
  );

  const content = useMemo(
    () =>
      columnsList.map(({ data, title }) => (
        <div className={sn('column')}>{itemsList(data, title)}</div>
      )),
    [columnsList]
  );

  return <div className={sn('wrapper')}>{content}</div>;
};
