import React, { ChangeEvent, FC, useMemo } from 'react';
import { Slider, Typography } from '@material-ui/core';
import { sliderStyle } from './SliderRange.style';
import { ISliderRange } from './interfaces';

export const SliderRange: FC<ISliderRange> = ({
  min,
  max,
  value,
  onChange,
  name,
  disabled
}) => {
  const style = sliderStyle();
  const handleChange = (
    event: ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    onChange(newValue as number);
  };
  const marks = [
    {
      value: min,
      label: `${min}`
    },
    {
      value: max,
      label: `${max}`
    }
  ];

  const styleLabel = useMemo(() => style.sliderLabel, []);

  const styleSlider = useMemo(() => style.slider, []);

  return (
    <>
      <Typography gutterBottom classes={{ root: styleLabel }}>
        {name}
      </Typography>
      <Slider
        disabled={disabled}
        classes={{ root: styleSlider }}
        value={value}
        min={min}
        name={name.toLowerCase()}
        marks={marks}
        max={max}
        onChange={handleChange}
        valueLabelDisplay='auto'
        aria-labelledby='continuous-slider'
      />
    </>
  );
};
