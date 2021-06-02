import React from 'react';
import { connect, FieldArray, Form, getIn } from 'formik';
import { IconButton } from '@material-ui/core';
import {
  CloseRounded as CloseRoundedIcon,
  DeleteRounded as DeleteRoundedIcon,
  Add as AddIcon
} from '@material-ui/icons';
import { CommonButton } from 'src/view/atoms';
import { IFormItem } from 'src/interfaces';
import { cityModalStyles } from 'src/styles';
import { CityInput, LocationInput } from './components';
import { IFormikProps } from './interfaces';

interface IProps {
  formik: IFormikProps;
  onDelete: Function;
  setFieldValues: Function;
}

export const FormUI = connect<IProps & any>(
  ({
    formik: { values, setFieldValue, errors, touched },
    onDelete,
    setFieldValues,
    handleClose,
    initialValues
  }) => {
    const cityModalClasses = cityModalStyles();

    const {
      location: [initialInputValues]
    } = initialValues;

    const handleClearLine = (index: number, onClear: Function) => () =>
      onClear(index, initialInputValues);

    const handleAddLine = (onPush: Function) => () =>
      onPush(initialInputValues);

    const getFieldInfo = (fieldName: string) => [
      getIn(touched, fieldName),
      getIn(errors, fieldName)
    ];

    return (
      <Form>
        <FieldArray
          name='location'
          render={({ replace, push }) => (
            <div className={cityModalClasses.inputWrapper}>
              {values.location.map((location: IFormItem, index: number) => {
                const {
                  region,
                  country,
                  countryCode,
                  city,
                  regionCode
                } = location;

                const [touchedCountryField, errorCountryField] = getFieldInfo(
                  `location.${index}.country`
                );
                const [touchedRegionField, errorRegionField] = getFieldInfo(
                  `location.${index}.region`
                );
                const [touchedCityField, errorCityField] = getFieldInfo(
                  `location.${index}.city`
                );

                return (
                  <div key={index} className={cityModalClasses.inputsBlock}>
                    <LocationInput
                      required
                      value={country}
                      fieldName={`location.${index}.country`}
                      placeholder='Country'
                      onChange={setFieldValues(index, replace)}
                      errorMessage={touchedCountryField && errorCountryField}
                    />
                    <LocationInput
                      fieldName={`location.${index}.region`}
                      value={region}
                      locationValue={location}
                      countryCode={countryCode}
                      placeholder='Region'
                      onChange={setFieldValues(index, replace)}
                      errorMessage={touchedRegionField && errorRegionField}
                    />
                    <CityInput
                      fieldName={`location.${index}.city`}
                      value={city}
                      locationValue={location}
                      regionCode={regionCode}
                      onChange={setFieldValues(index, replace)}
                      errorMessage={touchedCityField && errorCityField}
                    />
                    <div className={cityModalClasses.iconsBlock}>
                      <IconButton
                        className={cityModalClasses.iconButton}
                        onClick={handleClearLine(index, replace)}
                      >
                        <CloseRoundedIcon />
                      </IconButton>
                      <IconButton
                        className={cityModalClasses.iconButton}
                        disabled={!!(values.location.length < 2)}
                        onClick={onDelete(
                          values.location,
                          index,
                          setFieldValue
                        )}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    </div>
                  </div>
                );
              })}
              <button
                type='button'
                className={cityModalClasses.addMore}
                onClick={handleAddLine(push)}
              >
                <span>Add more</span>
                <AddIcon className={cityModalClasses.addIcon} />
              </button>
            </div>
          )}
        />
        <div className={cityModalClasses.buttonBlock}>
          <CommonButton text='Cancel' size='big' onClickHandler={handleClose} />
          <CommonButton type='submit' text='Save' color='yellow' size='big' />
        </div>
      </Form>
    );
  }
);
