import React, { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchInput } from 'src/view/organisms';
import { getCompanySizeFilter } from 'src/store/slices';
import { ICompanySize } from 'src/interfaces';

interface IProps {
  className: string;
  value: string;
  onChange: Function;
}

export const CompanySizeInput: FC<IProps> = ({
  className,
  value,
  onChange
}) => {
  const companySizeFilter = useSelector(getCompanySizeFilter);

  const initialValues = companySizeFilter.map(({ name }) => name);

  const [sizeItems, setSizeItems] = useState(initialValues);

  const onChangeSize = useCallback(
    val => {
      const autocomplite = val.length
        ? initialValues.filter(item => item.includes(val))
        : initialValues;
      const item =
        companySizeFilter?.find(({ name }: ICompanySize) =>
          name.includes(val)
        ) ?? ({} as ICompanySize);
      setSizeItems(autocomplite);
      onChange({ min_employees: item?.min, max_employees: item?.max });
    },
    [onChange, value]
  );

  return (
    <div className={className}>
      <SearchInput
        name='companySize'
        value={value}
        placeholder='Company size'
        items={sizeItems}
        onChange={onChangeSize}
      />
    </div>
  );
};
