import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Slider } from '@material-ui/core';
import { useStyles } from './NumericRangeFilter.styles';

interface IProps {
  changeFilter: (value: {
    code: string;
    item: number[];
    isCheckbox?: boolean;
  }) => void;
  code: string;
}

const SliderFilter = useStyles(Slider);

export const NumericRangeFilter: FC<IProps> = ({ changeFilter, code }) => {
  const [sliderValue, setSliderValue] = useState([0, 100]);

  const handleChange = useCallback(
    (_: ChangeEvent<{}>, newValue: number | number[]) => {
      setSliderValue(newValue as number[]);
    },
    [sliderValue]
  );
  const handlePushValue = useCallback(() => {
    changeFilter({ code, item: sliderValue });
  }, [sliderValue]);

  return (
    <SliderFilter
      valueLabelDisplay='auto'
      onChange={handleChange}
      onChangeCommitted={handlePushValue}
      value={sliderValue}
    />
  );
};
