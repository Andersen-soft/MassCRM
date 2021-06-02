import { MenuItem, Select } from '@material-ui/core';
import React, { FC, useMemo, ChangeEvent } from 'react';
import { IShowCountItem } from 'src/interfaces';
import { useStyles } from './ShowCountSelect.styles';

interface IProps {
  countConfig: { title: string; value: number }[];
  showCount?: number;
  handleChangeShowCount: (
    event: ChangeEvent<{
      value: unknown;
    }>
  ) => void;
}

export const ShowCountSelect: FC<IProps> = ({
  countConfig,
  handleChangeShowCount,
  showCount = ''
}) => {
  const styles = useStyles();

  const selectedItem = useMemo(
    () =>
      countConfig
        .map(({ value }) => value)
        .find(value => (showCount ? value >= showCount : value)),
    [showCount]
  );

  return (
    <Select
      className={styles.countSelect}
      variant='outlined'
      value={selectedItem}
      onChange={handleChangeShowCount}
      displayEmpty={false}
    >
      {countConfig.map(({ title, value }: IShowCountItem) => (
        <MenuItem key={value} value={value}>
          {title}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ShowCountSelect;
