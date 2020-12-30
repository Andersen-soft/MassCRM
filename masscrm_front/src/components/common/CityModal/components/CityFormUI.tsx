import React from 'react';
import { connect, FieldArray, Form, getIn } from 'formik';
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import AddIcon from '@material-ui/icons/Add';
import { CommonButton } from '../../CommonButton';
import { addCityStyle } from '../CityModal.style';
import { LocationInput } from './LocationInput';

import { CityInput } from './CityInput';
import { IFormItem } from '../interfaces';

interface IFormikProps {
  values: {
    location: IFormItem[];
  };
  setFieldValue: Function;
  errors: {
    location: IFormItem[];
  };
}

interface ICityFormUI {
  formik: IFormikProps;
  onDelete: Function;
  setFieldValues: Function;
}

export const CityFormUI = connect<ICityFormUI & any>(
  ({
    formik: { values, setFieldValue, errors, touched },
    onDelete,
    setFieldValues,
    handleClose,
    initialValues
  }) => {
    const style = addCityStyle();
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
            <div className={style.inputWrapper}>
              {values.location.map((location: IFormItem, index: number) => {
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
                  <div key={index} className={style.inputsBlock}>
                    <LocationInput
                      required
                      value={location.country}
                      fieldName={`location.${index}.country`}
                      placeholder='Country'
                      onChange={setFieldValues(index, replace)}
                      errorMessage={touchedCountryField && errorCountryField}
                    />
                    <LocationInput
                      fieldName={`location.${index}.region`}
                      value={location.region}
                      locationValue={location}
                      countryCode={location.countryCode}
                      placeholder='Region'
                      onChange={setFieldValues(index, replace)}
                      errorMessage={touchedRegionField && errorRegionField}
                    />
                    <CityInput
                      fieldName={`location.${index}.city`}
                      value={location.city}
                      locationValue={location}
                      regionCode={location.regionCode}
                      onChange={setFieldValues(index, replace)}
                      errorMessage={touchedCityField && errorCityField}
                    />
                    <div className={style.iconsBlock}>
                      <IconButton
                        className={style.iconButton}
                        onClick={handleClearLine(index, replace)}
                      >
                        <CloseRoundedIcon />
                      </IconButton>
                      <IconButton
                        className={style.iconButton}
                        disabled={Boolean(values.location.length < 2)}
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
                className={style.addMore}
                onClick={handleAddLine(push)}
              >
                <span>Add more</span>
                <AddIcon className={style.addIcon} />
              </button>
            </div>
          )}
        />
        <div className={style.buttonBlock}>
          <CommonButton text='Cancel' size='big' onClickHandler={handleClose} />
          <CommonButton type='submit' text='Save' color='yellow' size='big' />
        </div>
      </Form>
    );
  }
);
