import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCompanySizeFilter } from 'src/selectors';
import { ICompany, ICompanySize } from 'src/interfaces';
import { ContactCompany } from 'src/components/common/ContactCompany';

export const CompanyInput: FC<{
  className: string;
  value: string;
  onChange: Function;
  error?: string;
  errorMessage?: string;
  autoFocus?: string;
}> = ({ className, value, onChange, error, errorMessage, autoFocus }) => {
  const companySizeFilter = useSelector(getCompanySizeFilter);

  const onChangeCompany = useCallback(
    (company?: ICompany) => {
      if (company) {
        const {
          id,
          website,
          linkedin,
          sto_full_name,
          industries,
          type,
          name,
          subsidiary,
          holding,
          founded,
          vacancies,
          max_employees
        } = company;

        onChange({
          id,
          name: name || '',
          website: website || '',
          linkedin: linkedin || '',
          CTO: sto_full_name || '',
          type: type || '',
          subsidiary: subsidiary?.[0]?.id || '',
          holding: holding?.[0]?.id || '',
          founded: founded || '',
          vacancies: vacancies || '',
          industry:
            industries?.map(
              ({ name: industryName }: { name: string }) => industryName
            ) || [],
          industries:
            industries?.map(
              ({ id: idIndustry }: { id: number }) => idIndustry
            ) || [],
          companySize:
            companySizeFilter?.find(
              ({ max }: ICompanySize) => max === max_employees
            )?.name || ''
        });
      } else {
        onChange({ company: '' });
      }
    },
    [companySizeFilter]
  );

  return (
    <div className={className}>
      <ContactCompany
        error={error}
        value={value}
        onSelect={onChangeCompany}
        name='company'
        placeholder='Company'
        required
        errorMessage={errorMessage}
        autoFocus={autoFocus}
      />
    </div>
  );
};
