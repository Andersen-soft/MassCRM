import React, { FC, useCallback, useMemo, useState, MouseEvent } from 'react';
import {
  FormControl,
  Button,
  FormLabel,
  Popover,
  Box
} from '@material-ui/core';
import { Add, ArrowDropDown } from '@material-ui/icons';
import { IContactJobValues, ContactsJobs } from 'src/interfaces';
import { CommonIcon } from 'src/view/atoms';
import { BOTTOM, getPositionConfig, LEFT, TOP } from 'src/constants';
import {
  multiInputStyles,
  jobInputStyles,
  commonInputStyles
} from 'src/styles';
import { Form, Row } from './components';
import { ARRAY_LIMIT } from './constants';

interface IProps {
  vacancies: ContactsJobs;
  onChange: (fieldName: string, value: ContactsJobs) => void;
  errorMessage?: string;
  role?: any;
}

export const ContactJobInput: FC<IProps> = ({
  vacancies,
  onChange,
  errorMessage
}) => {
  const commonInputClasses = commonInputStyles();
  const multiInputClasses = multiInputStyles();
  const jobInputClasses = jobInputStyles();

  const [anchorForm, setAnchorForm] = useState<null | {
    el: HTMLElement;
    index: number;
  }>(null);

  const [anchorList, setAnchorList] = useState<null | HTMLElement>(null);
  const [formData, setFormData] = useState<IContactJobValues | null>(null);
  const [showText, setShowText] = useState('Show more');
  const openList = !!anchorList;

  const formId = anchorForm ? 'form-popover' : undefined;
  const listId = openList ? 'list-popover' : undefined;

  const classControl = useMemo(
    () => ({
      root: `${commonInputClasses.input} ${errorMessage &&
        commonInputClasses.inputError}`
    }),
    [errorMessage]
  );
  const classLabel = useMemo(
    () => ({
      root: `${jobInputClasses.label} ${errorMessage && jobInputClasses.error}`
    }),
    [jobInputClasses, errorMessage]
  );

  const editJob = useCallback(
    (index, target) => {
      setFormData(vacancies[index]);
      setAnchorForm({ el: target, index });
    },
    [setFormData, setAnchorForm, vacancies, anchorForm, formData]
  );

  const removeJob = useCallback(
    (index: number) => {
      const updatedVacancies = vacancies.filter((_, key) => key !== index);

      onChange('vacancies', updatedVacancies);
    },
    [vacancies, onChange]
  );

  const jobList = useCallback(
    arrayPosition => {
      const jobsArray =
        arrayPosition === 'first'
          ? vacancies.slice(0, ARRAY_LIMIT)
          : vacancies.slice(ARRAY_LIMIT);
      const index = arrayPosition === 'first' ? 0 : ARRAY_LIMIT;

      return (
        <Row
          arrayPosition={arrayPosition}
          jobs={jobsArray}
          indexCorrection={index}
          onRemoveHandler={removeJob}
          onEditHandler={editJob}
        />
      );
    },
    [vacancies, removeJob, editJob]
  );

  const openFormPopover = useCallback(
    (event: HTMLElement, index: number) => {
      setAnchorForm({ el: event, index });
    },
    [anchorForm, setAnchorForm]
  );

  const handleFormOpen = useCallback(
    ({ currentTarget }: MouseEvent<HTMLElement>) => {
      openFormPopover(currentTarget, -1);
    },
    [openFormPopover]
  );

  const closeForm = useCallback(() => {
    setAnchorForm(null);
    setFormData(null);
  }, [formData, anchorForm, setAnchorForm, setFormData]);

  const openListPopover = useCallback(
    ({ currentTarget }: MouseEvent<HTMLElement>) => {
      setAnchorList(currentTarget);
      setShowText('Show less');
    },
    [anchorList, showText, setAnchorList, setShowText]
  );

  const closeList = useCallback(() => {
    setAnchorList(null);
    setShowText('Show more');
  }, [anchorList, showText, setAnchorList, setShowText]);

  const handleChange = useCallback(
    (data: IContactJobValues, index: number) => {
      const newVacancies = [...vacancies];

      if (index === -1) {
        newVacancies.push(data);
      }
      if (index >= 0) {
        newVacancies[index] = data;
      }

      onChange('vacancies', newVacancies);
    },
    [vacancies, onChange]
  );

  return (
    <div className={jobInputClasses.wrap}>
      <FormControl variant='outlined' classes={classControl}>
        <FormLabel classes={classLabel}>Job</FormLabel>

        {vacancies?.length ? jobList('first') : null}

        <div className={jobInputClasses.buttonsWrap}>
          {vacancies?.length > ARRAY_LIMIT ? (
            <Button
              aria-describedby={listId}
              className={multiInputClasses.addButton}
              onClick={openListPopover}
            >
              <span>{showText}</span>
              <CommonIcon IconComponent={ArrowDropDown} />
            </Button>
          ) : null}

          <Button
            aria-describedby={formId}
            className={multiInputClasses.addButton}
            onClick={handleFormOpen}
          >
            <span>Add new job</span>
            <CommonIcon IconComponent={Add} />
          </Button>
        </div>

        {anchorForm && (
          <Form
            data={formData}
            anchorForm={anchorForm}
            onChange={handleChange}
            onClose={closeForm}
          />
        )}

        <Popover
          id={listId}
          open={openList}
          className={jobInputClasses.modal}
          anchorEl={anchorList}
          onClose={closeList}
          anchorOrigin={getPositionConfig(BOTTOM, LEFT)}
          transformOrigin={getPositionConfig(TOP, LEFT)}
        >
          <div className={jobInputClasses.modalContent}>
            {vacancies?.length > ARRAY_LIMIT ? jobList('last') : null}
          </div>
        </Popover>
      </FormControl>
      {errorMessage && (
        <Box className={commonInputClasses.error}>{errorMessage}</Box>
      )}
    </div>
  );
};
