import React, { FC, useContext, useState } from 'react';
import { Formik } from 'formik';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { CloseRounded as CloseRoundedIcon } from '@material-ui/icons';
import { addCitySchema } from 'src/utils';
import { addNewCity } from 'src/store/slices';
import { Open, IFormItem, ICity } from 'src/interfaces';
import { ErrorsEmitterContext } from 'src/contexts';
import { CommonIcon } from 'src/view/atoms';
import { cityModalStyles } from 'src/styles';
import { FormUI } from './components';
import { FORM_INITIAL_VALUES } from './constants';
import { IFormValues } from './interfaces';

interface IProps {
  handleClose: () => void;
  open: Open;
  autoFocus?: string;
  onSubmitSuccess?: Function;
}

export const CityModal: FC<IProps> = ({ handleClose, open }) => {
  const cityModalClasses = cityModalStyles();

  const [cities, setCities] = useState<ICity[]>([]);

  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const handleSubmit = async ({ location }: IFormValues) => {
    const locationArray = location.map(({ city, regionId, countryId }) => ({
      city,
      region: +regionId,
      country: +countryId
    }));
    await addNewCity(locationArray, errorsEventEmitter);
    handleClose();
  };

  const onDelete = (
    val: IFormItem[],
    idItem: number,
    setVal: Function
  ) => () => {
    const withoutDeleteItem = val.filter((_, index) => index !== idItem);

    return setVal('location', withoutDeleteItem);
  };

  const setFieldValues = (index: number, changeItemFunction: Function) => (
    value: IFormItem
  ) => {
    setCities(state =>
      value.cities ? [...new Set([...state, ...value.cities])] : [...state]
    );
    return changeItemFunction(index, { ...value });
  };

  return (
    <Dialog
      className={cityModalClasses.dialog}
      onClose={handleClose}
      maxWidth='lg'
      open={!!open}
    >
      <CommonIcon
        className={cityModalClasses.closeIcon}
        IconComponent={CloseRoundedIcon}
        onClick={handleClose}
      />
      <DialogTitle>
        <span>Add City</span>
      </DialogTitle>
      <DialogContent className={cityModalClasses.contentWrapper}>
        <Formik
          initialValues={FORM_INITIAL_VALUES}
          validationSchema={addCitySchema(cities)}
          onSubmit={handleSubmit}
          validateOnChange
        >
          {({ values, setFieldValue, errors, touched, ...formikProps }) => {
            return (
              <FormUI
                formik={{
                  errors,
                  touched,
                  setFieldValue,
                  ...formikProps
                }}
                initialValues={FORM_INITIAL_VALUES}
                onDelete={onDelete}
                setFieldValues={setFieldValues}
                handleClose={handleClose}
              />
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
