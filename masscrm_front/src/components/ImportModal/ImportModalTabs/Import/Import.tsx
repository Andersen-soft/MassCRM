import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { FieldLabel } from 'src/components/common/FieldLabel';
import { CommonButton } from 'src/components/common';
import { IStoreState } from 'src/interfaces';
import { useStyles } from './Import.styles';

export const Import: FC = () => {
  const classes = useStyles();
  const info = useSelector((state: IStoreState) => state.import.info);

  return (
    <div className={classes.root}>
      <FieldLabel
        label='Added new contacts:'
        className={classes.paddingBottom16}
        labelClassName={classes.labelText}
      >
        <span className={classes.num}>{info.newContacts}</span>
      </FieldLabel>
      <FieldLabel
        label='Added new companies:'
        className={classes.paddingBottom40}
        labelClassName={classes.labelText}
      >
        <span className={classes.num}>{info.newCompanies}</span>
      </FieldLabel>
      <FieldLabel
        label='Processed duplicate contacts:'
        className={classes.paddingBottom16}
        labelClassName={classes.labelText}
      >
        <span className={classes.num}>{info.duplicateContacts}</span>
      </FieldLabel>
      <FieldLabel
        label='Processed duplicate companies:'
        className={classes.paddingBottom40}
        labelClassName={classes.labelText}
      >
        <span className={classes.num}>{info.duplicateCompanies}</span>
      </FieldLabel>
      {info.missedDuplicates ? (
        <FieldLabel
          label='Missed duplicates:'
          className={classes.paddingBottom16}
          labelClassName={classes.labelText}
        >
          <div className={classes.downloadContainer}>
            <span className={`${classes.num} ${classes.paddingRight24}`}>
              {info.missedDuplicates}
            </span>
            <CommonButton text='' color='white'>
              <a
                className={classes.link}
                target='_blank'
                rel='noreferrer'
                href={info.missedDuplicatesLink}
              >
                Download file
              </a>
            </CommonButton>
          </div>
        </FieldLabel>
      ) : null}
      {info.unsProcesDuplicates ? (
        <FieldLabel
          label='Unsuccessfully processed duplicates:'
          className={classes.paddingBottom16}
          labelClassName={classes.labelText}
        >
          <div className={classes.downloadContainer}>
            <span className={`${classes.num} ${classes.paddingRight24}`}>
              {info.unsProcesDuplicates}
            </span>
            <CommonButton text='' color='white'>
              <a
                className={classes.link}
                target='_blank'
                rel='noreferrer'
                href={info.unsProcesDuplicatesLink}
              >
                Download file
              </a>
            </CommonButton>
          </div>
        </FieldLabel>
      ) : null}
    </div>
  );
};
