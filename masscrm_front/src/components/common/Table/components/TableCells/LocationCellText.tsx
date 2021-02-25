import React, {
  FC,
  useState,
  MouseEvent,
  useEffect,
  useMemo,
  useContext
} from 'react';
import { Popover } from '@material-ui/core';
import { SingleInputForm } from 'src/components/common/SingleInputForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCity,
  getCountries,
  getFilterSettings,
  getRegion
} from 'src/selectors';
import {
  getRegions,
  getAddContactList,
  getCitiesListByRegion,
  getRegionListByCountry,
  updateContact
} from 'src/actions';
import { ILocation } from 'src/interfaces';
import { ErrorEmitterContext } from 'src/context';
import { DoubleClickError } from 'src/utils/errors';

export const LocationCellText: FC<{
  location: ILocation;
  id: number;
  type: string;
  className?: string;
  required?: boolean;
}> = ({ location, id, className, type, required }) => {
  const { errorsEventEmitter } = useContext(ErrorEmitterContext);
  const dispatch = useDispatch();
  const { country, region } = location;
  const isCountry = type === 'country';
  const isCity = type === 'city';
  const countries = useSelector(getCountries);
  const regions = useSelector(getRegion);
  const cities = useSelector(getCity);
  const filter = useSelector(getFilterSettings);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const getNameCallBack = ({ name }: { name: string }) => name;

  const items = useMemo(() => {
    if (!isCountry && !isCity) return regions.map(getNameCallBack);
    if (isCity) return cities.map(getNameCallBack);
    return countries.map(getNameCallBack);
  }, [countries, regions, cities]);

  const getCode = (
    val = '',
    list: Array<{ name: string; code?: string; id?: number }>
  ) => list.filter(({ name }) => name === val)[0]?.code || val;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDoubleClickHandler = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const onChangeValue = () => false;

  const inputProps = { value: location[type], onChangeValue, required };

  const onSubmitHandler = (val?: string) => {
    let newLocation: ILocation = {
      country: val,
      region: '',
      city: ''
    };

    if (!isCountry && !isCity) {
      newLocation = {
        country,
        region: val,
        city: ''
      };
    }

    if (isCity) {
      newLocation = {
        ...location,
        city: val
      };
    }
    updateContact({ location: newLocation }, id)
      .then(() => dispatch(getAddContactList(filter)))
      .catch(errors => {
        errorsEventEmitter.emit('snackBarErrors', {
          errorsArray: [DoubleClickError(errors)]
        });
      });
  };

  const fetchCitiesOrRegions = async () => {
    if (anchorEl) {
      if (isCity) {
        const { data: currRegions } = await getRegions(
          getCode(country, countries)
        );

        dispatch(getCitiesListByRegion(getCode(region, currRegions)));
      } else if (!isCountry)
        dispatch(getRegionListByCountry(getCode(country, countries)));
    }
  };

  useEffect(() => {
    fetchCitiesOrRegions();
  }, [anchorEl]);

  return (
    <>
      <td className={className} onDoubleClick={onDoubleClickHandler}>
        <div>{location[type]}</div>
      </td>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <SingleInputForm
          inputProps={inputProps}
          onSubmit={onSubmitHandler}
          onCancel={handleClose}
          items={items}
          isDoubleClick
        />
      </Popover>
    </>
  );
};
