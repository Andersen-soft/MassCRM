import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesListByRegion, getRegionListByCountry } from 'src/actions';
import { getRegion } from 'src/selectors';
import { IRegion } from 'src/interfaces';
import { SearchInput } from 'src/components/common/SearchInput';

export const RegionInput: FC<{
  className: string;
  value: string;
  countryCode: string;
  onChange: Function;
}> = ({ className, value, countryCode, onChange }) => {
  const dispatch = useDispatch();
  const regions = useSelector(getRegion);
  const regionItems = regions.map(({ name }) => name);

  const onChangeRegion = useCallback(
    (val: string) => {
      const codeOfRegion = regions?.find(({ name }: IRegion) => name === val)
        ?.code;
      onChange({ region: val, regionCode: codeOfRegion, city: '' });
      codeOfRegion?.length && dispatch(getCitiesListByRegion(codeOfRegion));
    },
    [regions]
  );

  useEffect(() => {
    countryCode && dispatch(getRegionListByCountry(countryCode));
  }, [countryCode]);

  return (
    <div className={className}>
      <SearchInput
        name='region'
        value={value}
        placeholder='Region'
        items={regionItems}
        onChange={onChangeRegion}
        disabled={!countryCode}
      />
    </div>
  );
};
