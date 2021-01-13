import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesListByRegion, getRegionListByCountry } from 'src/actions';
import { getRegion } from 'src/selectors';
import { IRegion } from 'src/interfaces';
import { SearchInput } from 'src/components/common/SearchInput';
import { findSubstr } from 'src/utils/string';

export const RegionInput: FC<{
  className: string;
  value: string;
  countryCode: string;
  onChange: Function;
}> = ({ className, value, countryCode, onChange }) => {
  const dispatch = useDispatch();
  const regions = useSelector(getRegion);
  const [matchedRegions, setMatchedRegions] = useState<IRegion[]>(regions);
  const regionItems = matchedRegions.map(({ name }) => name);

  const onChangeHandler = useCallback(
    (val: string) => {
      const trimmedValue = val && val.trim();

      const foundedRegions = trimmedValue
        ? regions.filter(({ name }: IRegion) => findSubstr(name, trimmedValue))
        : regions;

      setMatchedRegions(foundedRegions);
    },
    [regions]
  );

  const onSelectHandler = useCallback(
    (val: string) => {
      const trimmedValue = val && val.trim();

      const codeOfRegion =
        trimmedValue &&
        regions?.find(({ name }: IRegion) => findSubstr(name, trimmedValue))
          ?.code;

      onChange({
        region: val ? val.trim() : '',
        regionCode: trimmedValue ? codeOfRegion : 0,
        city: ''
      });
      codeOfRegion?.length && dispatch(getCitiesListByRegion(codeOfRegion));
    },
    [regions]
  );

  useEffect(() => {
    countryCode && dispatch(getRegionListByCountry(countryCode));
  }, [countryCode]);

  useEffect(() => {
    setMatchedRegions(regions);
  }, [regions]);

  return (
    <div className={className}>
      <SearchInput
        name='region'
        value={value}
        placeholder='Region'
        items={regionItems}
        onChange={onChangeHandler}
        onSelect={onSelectHandler}
        disabled={!countryCode}
      />
    </div>
  );
};
