import React, { FC, MouseEvent } from 'react';
import { Close, Edit } from '@material-ui/icons';
import { ContactsJobs } from 'src/interfaces';
import { CommonIcon } from 'src/view/atoms';
import { BLANK, NO_REFERRER } from 'src/constants';
import { useStyles } from './Row.styles';

interface IProps {
  arrayPosition: 'first' | 'last';
  jobs: ContactsJobs;
  indexCorrection: number;
  onEditHandler: (index: number, event: EventTarget) => void;
  onRemoveHandler: (index: number) => void;
}

export const Row: FC<IProps> = ({
  jobs,
  indexCorrection,
  onEditHandler,
  onRemoveHandler
}) => {
  const styles = useStyles();

  const removeHandler = (index: number) => () => {
    onRemoveHandler(index);
  };

  const editHandler = (index: number) => ({ currentTarget }: MouseEvent) => {
    onEditHandler(index, currentTarget);
  };

  return (
    <ul className={styles.jobList}>
      {jobs.map(({ link, job, skills }, index) => (
        <li className={styles.jobListEl} key={index}>
          <span>
            <a
              href={link}
              className={styles.jobListLink}
              target={BLANK}
              rel={NO_REFERRER}
            >
              {job}
            </a>
          </span>
          <span> - {skills}</span>
          <span>
            <CommonIcon
              IconComponent={Close}
              className={styles.jobListIcon}
              onClick={removeHandler(index)}
            />
          </span>
          <span>
            <CommonIcon
              IconComponent={Edit}
              className={styles.jobListIcon}
              onClick={editHandler(index + indexCorrection)}
            />
          </span>
        </li>
      ))}
    </ul>
  );
};
