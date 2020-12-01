import React, { FC } from 'react';
import { Add, Close } from '@material-ui/icons';
import { SocialIcon } from 'src/components/common/SocialIcon';
import { CommonIcon } from 'src/components/common/CommonIcon';
import { IContactColleagueList } from 'src/interfaces/IContactColleague';
import { multiStyle } from 'src/styles/CustomMultiInput.style';

export const ContactColleagueList: FC<IContactColleagueList> = ({
  items,
  onEditHandler,
  onRemoveHandler
}) => {
  const styles = multiStyle();

  const editHandler = (index: number) => (
    event: React.MouseEvent<HTMLElement | SVGElement>
  ) => {
    onEditHandler(index, event.currentTarget);
  };

  const removeHandler = (index: number) => () => {
    onRemoveHandler(index);
  };

  return (
    <ul className={styles.list}>
      {items.map((colleague, index) => (
        <li className={styles.listEl} key={colleague.link}>
          <span>
            {colleague.link ? (
              <a
                href={colleague.link}
                className={styles.listLink}
                target='_blank'
                rel='noreferrer'
              >
                <SocialIcon socialName='linkedin' />
              </a>
            ) : (
              <CommonIcon IconComponent={Add} onClick={editHandler(index)} />
            )}
          </span>
          <span>{colleague.full_name}</span>
          <span className={styles.lastInList}>
            <CommonIcon
              IconComponent={Close}
              className={styles.IconFormControl}
              onClick={removeHandler(index)}
            />
          </span>
        </li>
      ))}
    </ul>
  );
};
