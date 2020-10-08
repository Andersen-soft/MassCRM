<?php

namespace App\Http\Transformers\Company;

use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use App\Models\Industry;
use League\Fractal\TransformerAbstract;

class CompanyTransform extends TransformerAbstract
{
    /**
     * @OA\Schema(
     *    schema="Company",
     *    required={
     *        "id", "created_at", "updated_at", "name", "website", "linkedin", "sto_full_name",
     *        "type", "founded", "min_employees", "max_employees"
     *    },
     *    @OA\Property(property="id", type="integer", example=123),
     *    @OA\Property(property="created_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *    @OA\Property(property="updated_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *    @OA\Property(property="name", type="string", example="name"),
     *    @OA\Property(property="website", type="string", example="http://www.walvisnest.nl"),
     *    @OA\Property(property="linkedin", type="string", example="https://www.linkedin.com/company/22891"),
     *    @OA\Property(property="sto_full_name", type="string", example="Angelas"),
     *    @OA\Property(property="type", type="string", example="Subsidiary"),
     *    @OA\Property(property="min_employees", type="integer", example=1),
     *    @OA\Property(property="max_employees", type="integer", example=50),
     *    @OA\Property(property="founded", type="string", format="d.m.Y", example="18.06.2020"),
     *    @OA\Property(property="comment", type="string", example="Is good company"),
     *    @OA\Property(property="industries", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "name"},
     *            @OA\Property(property="name", type="string", example="Machinery"),
     *            @OA\Property(property="id", type="integer", example=123),
     *        ),
     *    ),
     *    @OA\Property(property="vacancies", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "job", "skills", "link"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="job", type="string", example="Install docker"),
     *            @OA\Property(property="skills", type="string", example="Solid"),
     *            @OA\Property(property="link", type="string", example="https://jobs.tut.by"),
     *        ),
     *    ),
     *    @OA\Property(property="subsidiary", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "name"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="name", type="string", example="Name"),
     *        ),
     *    ),
     *    @OA\Property(property="holding", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "name"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="name", type="string", example="Name"),
     *        ),
     *    ),
     * )
     */
    public function transform(Company $company): array
    {
        $companyToArr = [
            'id' => $company->getId(),
            'created_at' => $company->getCreatedAtDateTime(),
            'updated_at' => $company->getUpdatedAtDateTime(),
            'name' => $company->getName(),
            'website' => $company->getWebsite() ?: '',
            'linkedin' => $company->getLinkedin() ?: '',
            'sto_full_name' => $company->getStoFullName() ?: '',
            'type' => $company->getType() ?: '',
            'founded' => $company->getFoundedDate() ?: '',
            'min_employees' => $company->getMinEmployees() ?: 0,
            'max_employees' => $company->getMaxEmployees(),
            'comment' => $company->getComment() ?: '',
        ];
        $this->addIndustries($company, $companyToArr);
        $this->addVacancies($company, $companyToArr);
        $this->addSubsidiaries($company, $companyToArr);

        return $companyToArr;
    }

    protected function addIndustries(Company $company, array &$companyToArr): void
    {
        /** @var Industry $industry */
        foreach ($company->industries as $industry) {
            $companyToArr['industries'][] = [
                'id' => $industry->getId(),
                'name' => $industry->getName()
            ];
        }
    }

    protected function addVacancies(Company $company, array &$companyToArr): void
    {
        /** @var CompanyVacancy $vacancy */
        foreach ($company->vacancies as $vacancy) {
            $companyToArr['vacancies'][] = [
                'id' => $vacancy->getId(),
                'job' => $vacancy->getVacancy(),
                'skills' => $vacancy->getSkills(),
                'link' => $vacancy->getLink()
            ];
        }
    }

    protected function addSubsidiaries(Company $company, array &$companyToArr): void
    {
        $relationCompanies = [];
        /** @var Company $item */
        foreach ($company->companySubsidiary as $item) {
            $relationCompanies[] = [
                'id' => $item->getId(),
                'name' => $item->getName()
            ];
        }

        if (!empty($relationCompanies)) {
            $type = $company->isSubsidiary() ? 'subsidiary' : 'holding';
            $companyToArr[$type] = $relationCompanies;
        }
    }
}
