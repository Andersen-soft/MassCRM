import React from 'react';
import { EditRounded as EditRoundedIcon } from '@material-ui/icons';
import { IContactResult } from 'src/interfaces';

export const createErrorsObject = (title: string[], data: IContactResult[]) => {
  return data.map(
    ({ id, full_name, first_name, last_name, ...rest }, index) => ({
      title: title[index],
      link: `/contact?${new URLSearchParams({ id })}`,
      name: full_name || `${first_name} ${last_name}`,
      ...rest
    })
  );
};

export const getErrorsList = (
  str: string,
  errorsList: { [x: string]: string[] }
) =>
  Object.values(errorsList).reduce((acc: string[], cur: string[]) => {
    return cur.toString().includes(str) ? [...acc, cur.toString()] : acc;
  }, []);

export const mapErrorsList = (errors: { [x: string]: string[] }) =>
  Object.values(errors).reduce((acc, cur) => [...acc, ...cur], []);

export const SnackErrorBarData = (data: string[]) => {
  return data.map(item => <div key={item}>{item}</div>);
};

export const DoubleClickError = (stringErrors?: string) => {
  const parseError = stringErrors && JSON.parse(stringErrors);
  const noStandardError =
    parseError.gender?.toString() || parseError.emails?.toString();

  return (
    <>
      {noStandardError ? (
        <span>{noStandardError}</span>
      ) : (
        <div>
          <span>Please, hit icon </span>
          <EditRoundedIcon />
          <span>and add all required fields</span>
        </div>
      )}
    </>
  );
};
