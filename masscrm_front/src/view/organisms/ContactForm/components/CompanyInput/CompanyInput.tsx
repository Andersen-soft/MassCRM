import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCompanySizeFilter } from 'src/store/slices';
import { ICompany, ICompanySize } from 'src/interfaces';
import { ContactCompany } from 'src/view/organisms';

interface IProps {
  className: string;
  value: string;
  onChange: Function;
  error?: string;
  errorMessage?: string;
  autoFocus?: string;
}

export const CompanyInput: FC<IProps> = ({
  className,
  value,
  onChange,
  error,
  errorMessage,
  autoFocus
}) => {
  const companySizeFilter = useSelector(getCompanySizeFilter);

  const onChangeCompany = useCallback(
    (company?: ICompany) => {
      if (company) {
        const {
          id,
          website,
          linkedin,
          sto_full_name,
          industries: companyIndustry,
          type
        } = company;

        return onChange({
          company_id: id,
          company: company.name || '',
          companyWebSite: website || '',
          companyLinkedIn: linkedin || '',
          CTO: sto_full_name || '',
          company_type: type || '',
          company_subsidiary: company?.subsidiary?.[0]?.id || '',
          company_holding: company?.holding?.[0]?.id || '',
          company_founded: company?.founded || '',
          vacancies: company?.vacancies || [],
          industry:
            companyIndustry?.map(({ name }: { name: string }) => name) || [],
          industries: companyIndustry?.map(
            ({ id: idIndustry }: { id: number }) => idIndustry
          ),
          companySize:
            companySizeFilter?.find(
              ({ max }: ICompanySize) => max === company?.max_employees
            )?.name || ''
        });
      }
      return onChange({ company: '' });
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
