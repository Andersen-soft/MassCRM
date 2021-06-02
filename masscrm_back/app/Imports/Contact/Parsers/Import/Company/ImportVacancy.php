<?php declare(strict_types=1);

namespace App\Imports\Contact\Parsers\Import\Company;

use App\Exceptions\Import\ImportFileException;
use App\Helpers\Url;
use App\Imports\Contact\Parsers\Import\Contact\ImportContact;
use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use App\Models\User\User;
use App\Repositories\Company\VacancyRepository;
use App\Repositories\Contact\ContactRepository;
use App\Services\Location\LocationService;

class ImportVacancy
{
    private VacancyRepository $vacancyRepository;
    private LocationService $locationService;
    private ContactRepository $contactRepository;
    private Url $urlHelper;
    private const LOCATION_FIELDS = ['city', 'country', 'region'];

    public function __construct(
        VacancyRepository $vacancyRepository,
        Url $urlHelper,
        LocationService $locationService,
        ContactRepository $contactRepository
    )
    {
        $this->vacancyRepository = $vacancyRepository;
        $this->urlHelper = $urlHelper;
        $this->locationService = $locationService;
        $this->contactRepository = $contactRepository;
    }

    public function merge(Company $company, array $row, User $user): void
    {
        if (empty($row['companyVacancies'])) {
            return;
        }

        $vacancies = $row['companyVacancies'];
        $location = $this->configurationJobLocation($row);

        foreach ($vacancies['vacancy'] as $key => $item) {
            if (!empty($item['job'])) {
                $vacancy = $this->vacancyRepository->getFirstVacancyFromName($company, $item['job'], $location);

                if ($vacancy) {
                    if ($user->hasRole(User::USER_ROLE_NC2)) {
                        $item[CompanyVacancy::FIELD_ACTIVE] = CompanyVacancy::ACTIVE;
                    }
                    $vacancy->setTemporaryResponsible($company->getTemporaryResponsible());
                    $this->updateVacancy($vacancy, $item, $location);
                } else {
                    $this->createVacancy($company, $item, $location);
                }
            }
        }
    }

    public function replace(Company $company, array $row): void
    {
        if (empty($row['companyVacancies'])) {
            return;
        }

        $location = $this->configurationJobLocation($row);
        $vacancies = $row['companyVacancies'];

        foreach ($vacancies['vacancy'] as $key => $item) {
            if (!empty($item['job'])) {
                $vacancy = $this->vacancyRepository->getFirstVacancyFromName($company, $item['job'], $location);
                if (!$vacancy) {
                    $this->createVacancy($company, $item, $location);
                }
            }
        }
    }

    public function create(Company $company, array $row): void
    {
        $this->replace($company, $row);
    }

    private function createVacancy(Company $company, array $job, array $location): void
    {
        $vacancy = new CompanyVacancy();
        $vacancy->vacancy = $job['job'];
        $vacancy->skills = !empty($job['job_skills']) ? $job['job_skills'] : null;
        $vacancy->link = !empty($job['job_urls']) ? $this->urlHelper->getUrlWithSchema($job['job_urls']) : null;

        $vacancy->setTemporaryResponsible($company->getTemporaryResponsible());
        $this->addLocationJobFields($vacancy, $location);

        $company->vacancies()->save($vacancy);
    }

    private function updateVacancy(CompanyVacancy $vacancy, array $vacancies, array $location): void
    {
        if (!$vacancy->skills) {
            $vacancy->skills = !empty($vacancies['job_skills']) ? $vacancies['job_skills'] : null;
        }

        if (!$vacancy->link) {
            $vacancy->link = !empty($vacancies['job_urls']) ?
                $this->urlHelper->getUrlWithSchema($vacancies['job_urls']) :
                null;
        }

        if (isset($vacancies[CompanyVacancy::FIELD_ACTIVE])) {
            $vacancy->{CompanyVacancy::FIELD_ACTIVE} = $vacancies[CompanyVacancy::FIELD_ACTIVE];
        }

        $this->addLocationJobFields($vacancy, $location);

        $vacancy->save();
    }

    private function addLocationJobFields(CompanyVacancy $vacancy, array $location): void
    {
        if (isset($location['job_city'])) {
            $vacancy->job_city = $location['job_city'];
        }

        if (isset($location['job_country'])) {
            $vacancy->job_country = $location['job_country'];
        }

        if (isset($location['job_region'])) {
            $vacancy->job_region = $location['job_region'];
        }
    }

    public function configurationJobLocation(array $row): array
    {
        $contact = $this->contactRepository->getContactByEmail($row['contactEmail']['email'][0]);

        if ($contact) {
            $location = [
                'job_country' => $contact->country,
                'job_region' => $contact->region,
                'job_city' => $contact->city
            ];
        } else {
            $location = $this->configurationJobLocationFromImportRow($row);
        }

        if (empty($location['job_country'])) {
            throw new ImportFileException(['The location is invalid']);
        }

        return $location;
    }

    private function configurationJobLocationFromImportRow(array $row): array
    {
        foreach (self::LOCATION_FIELDS as $field) {
            if (empty($row['contact'][$field])) {
                continue;
            }

            $row['contact'][$field] = $this->mapCountries($row['contact'][$field]);

            $loc = $this->locationService->findLocations($row['contact'][$field], $row);

            if (!$loc) {
                continue;
            }

            if ($country = $loc->getCountry()) {
                $location['job_country'] = $country->name;
            }

            if ($region = $loc->getRegion()) {
                $location['job_region'] = $region->name;
            }

            if ($city = $loc->getCity()) {
                $location['job_city'] = $city->name;
            }

            break;
        }

        return $location;
    }

    private function mapCountries(string $country): string
    {
        foreach (ImportContact::COUNTRY_MAPPING as $originCountry => $countryVariation) {
            if (in_array($country, $countryVariation)) {
                return $originCountry;
            }
        }

        return $country;
    }
}
