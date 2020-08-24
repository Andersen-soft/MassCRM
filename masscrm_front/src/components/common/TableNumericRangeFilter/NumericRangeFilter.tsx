import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { INumericRangeFilterProps } from './interfaces';
import { SliderFilter } from './NumericRangeFilter.style';

export const NumericRangeFilter: FC<INumericRangeFilterProps> = ({
  changeFilter,
  name
}) => {
  const [sliderValue, setSliderValue] = useState([0, 100]);

  const handleChange = useCallback(
    (event: ChangeEvent<{}>, newValue: number | number[]) => {
      setSliderValue(newValue as number[]);
    },
    [sliderValue]
  );
  const handlePushValue = useCallback(() => {
    changeFilter({ name, item: sliderValue });
  }, [sliderValue]);

  return (
    <>
      <SliderFilter
        valueLabelDisplay='auto'
        onChange={handleChange}
        onChangeCommitted={handlePushValue}
        value={sliderValue}
      />
    </>
  );
};
