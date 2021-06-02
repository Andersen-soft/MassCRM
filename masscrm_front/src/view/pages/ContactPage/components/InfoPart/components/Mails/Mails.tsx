import React, { FC, useCallback, useMemo } from 'react';
import { IContactResult, INote } from 'src/interfaces';
import { infoPartStyles } from 'src/styles';
import { Item } from '..';

interface IProps {
  contactData: IContactResult;
}

export const Mails: FC<IProps> = ({ contactData: { mails, note } }) => {
  const infoPartClasses = infoPartStyles();

  const itemsList = useCallback(
    (values: INote[], title) =>
      values.length ? (
        values.map(({ id, message }) => (
          <Item title={title} key={id} value={message} />
        ))
      ) : (
        <Item title={title} key={title} />
      ),
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
    () => (
      <div className={infoPartClasses.column}>
        {columnsList.map(({ data, title }) => itemsList(data, title))}
      </div>
    ),
    [columnsList]
  );

  return <div className={infoPartClasses.wrapper}>{content}</div>;
};
