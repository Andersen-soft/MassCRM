import React, { ChangeEvent, FC, useMemo } from 'react';
import { Slider, Typography } from '@material-ui/core';
import { useStyles } from './SliderRange.styles';

interface IProps {
  name: string;
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
  disabled?: boolean;
}

export const SliderRange: FC<IProps> = ({
  min,
  max,
  value,
  onChange,
  name,
  disabled
}) => {
  const styles = useStyles();

  const handleChange = (_: ChangeEvent<{}>, newValue: number | number[]) => {
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

  const styleLabel = useMemo(() => styles.sliderLabel, []);

  const styleSlider = useMemo(() => styles.slider, []);

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
