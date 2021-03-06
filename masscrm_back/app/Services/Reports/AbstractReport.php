<?php declare(strict_types=1);

namespace App\Services\Reports;

use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactColleagues;
use App\Models\Contact\ContactEmails;
use App\Models\Contact\ContactNotes;
use App\Models\Contact\ContactSale;
use App\Models\Industry;
use Illuminate\Support\Facades\Lang;

abstract class AbstractReport implements SearchType
{
    private const WHEN_COLLEAGUE_DOES_NOT_EXIST = 'No data about colleague';
    protected const HEADERS = 'headers';
    protected const PATH_METHODS = 'pathMethods';
    protected const FILTERS = 'filters';


    public const EXPORT_FIELDS = [
        'jobs' => ['Position 1', 'Position 2', 'Position 3'],
        'jobs_skills' => ['JobsSkills 1', 'JobsSkills 2', 'JobsSkills 3'],
        'jobs_urls' => ['Link to pos1', 'Link to pos2', 'Link to pos3'],
    ];

    protected function getContactSequences(Contact $contact): array
    {
        $listSequences = [];
        $listSequencesStatus = [];

        foreach ($contact->sequence_collection as $sequence) {
            $listSequences[] = $sequence['sequence'];
            $listSequencesStatus[] = $sequence['status'];
        }

        return [
            'sequence' => $listSequences,
            'status' => $listSequencesStatus,
        ];
    }

    protected function getContactOtherSocialNetwork(Contact $contact): array
    {
        $listNetworks = [];

        foreach ($contact->social_network_collection as $network) {
            $listNetworks[] = $network['link'];
        }

        return [
            'social_networks' => $listNetworks
        ];
    }

    protected function getContactPhones(Contact $contact): array
    {
        $phones = [];

        foreach ($contact->phone_collection as $phone) {
            $phones[] = $phone['phone'];
        }

        return [
            'phones' => $phones
        ];
    }

    protected function getContactColleagues(Contact $contact): array
    {
        $colleagues = [];
        $colleaguesLink = [];

        /** @var ContactColleagues $colleague */
        foreach ($contact->contactColleagues as $colleague) {
            $colleagues[] = $colleague->getFullName();
            if ($colleague->getContactIdRelation()) {
                $colleaguesLink[] = $colleague->contractRelation->getLinkedin();
            } else {
                $colleaguesLink[] = $colleague->getLink();
            }
        }

        return [
            'colleagues' => $colleagues,
            'colleagues_link' => $colleaguesLink
        ];
    }

    protected function getContactEmails(Contact $contact): array
    {
        $emails = [];
        $requiresValidationEmails = [];

        /** @var ContactEmails $email */
        foreach ($contact->email_collection as $email) {
            $emails[] = $email['email'];
            $requiresValidationEmails[] = $email['verification'] ?
                Lang::get('report.yes') :
                Lang::get('report.no');
        }

        return [
            'requires_validation' => $requiresValidationEmails,
            'emails' => $emails
        ];
    }

    protected function getInBlacklist(Contact $contact): array
    {
        return [
            'in_blacklist' => $contact->in_blacklist ? Lang::get('report.yes') : Lang::get('report.no')
        ];
    }

    protected function getColleagueFirst(Contact $contact): array
    {
        return [
            'colleague_first' =>
                ($contact->colleague_first ?: $contact->colleague_second) ?? self::WHEN_COLLEAGUE_DOES_NOT_EXIST
        ];
    }

    protected function getContactSales(Contact $contact): array
    {
        $salesLink = [];
        $salesStatus = [];
        $salesIs1cProject = [];
        $salesSources = [];
        $salesCreated = [];

        /** @var ContactSale $sale */
        foreach ($contact->sale_collection as $sale) {
            $salesIs1cProject[] = $sale['project_c1'] ? Lang::get('report.yes') : Lang::get('report.no');
            $salesLink[] = $sale['link'];
            if (!empty($sale['status'])) {
                $salesStatus[] = $sale['status'];
            }
            if (!empty($sale['source'])) {
                $salesSources[] = $sale['source'];
            }

            $salesCreated[] = $sale['create_at'];
        }

        return [
            'sale_link' => $salesLink,
            'sale_status' => $salesStatus,
            'sale_project_c1' => $salesIs1cProject,
            'source' => $salesSources,
            'sale_created' => $salesCreated,
        ];
    }

    protected function getContactMails(Contact $contact): array
    {
        $messages = [];

        foreach ($contact->mail_collection as $mail) {
            $messages[] = $mail['message'];
        }

        return [
            'mails' => $messages
        ];
    }

    protected function getContactNotes(Contact $contact): array
    {
        $notes = [];

        /** @var ContactNotes $note */
        foreach ($contact->note_collection as $note) {
            $notes[] = $note['message'];
        }

        return [
            'my_notes' => $notes
        ];
    }

    protected function getCompanyIndustries(Contact $contact): array
    {
        $industries = [];
        if ($contact->company) {

            /** @var Industry $industry */
            foreach ($contact->company->industries_collection as $industry) {
                $industries[] = $industry['name'];
            }
        }

        return [
            'company_industries' => $industries
        ];
    }

    protected function getCompanyVacancies(Contact $contact): array
    {
        $data = [
            'jobs' => [],
            'jobs_skills' => [],
            'jobs_urls' => [],
        ];

        if ($contact->company) {

            $vacancies =
                $contact->company->filtered_vacancies_collection ??
                $contact->company->vacancies()->orderByDesc('id')->limit(3)->get();

            foreach ($vacancies as $vacancy) {
                $data['jobs'][] = $vacancy['vacancy'];
                $data['jobs_skills'][] = $vacancy['skills'];
                $data['jobs_urls'][] = $vacancy['link'];
            }
        }

        return $data;
    }

    protected function checkVacancyStatus(Contact $contact, $status = null): Contact
    {
        if ($contact->company && isset($status)) {
            $vacanciesCollection = [];

            $vacancies =
                $contact->company->filtered_vacancies_collection ??
                $contact->company->vacancies()->orderByDesc('id')->limit(3)->get();

            foreach ($vacancies as $vacancy) {
                if ($vacancy['active'] === (bool)$status) {
                    $vacanciesCollection[] = $vacancy;
                }
            }

            $contact->company->filtered_vacancies_collection = $vacanciesCollection;
            return $contact;
        }

        return $contact;
    }

    protected function getRelationCompanies(Contact $contact): array
    {
        $relationCompanies = [];
        if ($contact->company) {

            /** @var Company $relation */
            foreach ($contact->company->companySubsidiary as $relation) {
                $relationCompanies[] = $relation->name;
            }

            if ($contact->company->isSubsidiary()) {
                return [
                    'company_holding' => $relationCompanies
                ];
            }
        }

        return [
            'company_subsidiary' => $relationCompanies
        ];
    }

    protected function getCompanySize(Contact $contact): array
    {
        $size = [];
        if ($contact->company) {
            if ($contact->company->min_employees) {
                $size[] = $contact->company->min_employees;
            }

            if ($contact->company->max_employees) {
                $size[] = $contact->company->max_employees;
            }
        }

        return [
            'company_size' => implode(' - ', $size)
        ];
    }

    public function getListHeaders(array $listHeaders, array $search = []): array
    {
        $lists = [
            self::HEADERS => [],
            self::PATH_METHODS => [],
            self::FILTERS => []
        ];

        $rows = !empty($listHeaders) ? $listHeaders : SearchType::LIST_FIELDS;

        foreach ($rows as $key => $item) {

            $fieldName = !is_int($key) ? $key : $item;

            if (array_key_exists($fieldName, SearchType::LIST_FIELDS) &&
                !empty(SearchType::LIST_FIELDS[$fieldName]['name'])
            ) {
                if (array_key_exists($fieldName, self::EXPORT_FIELDS)) {
                    $lists[self::HEADERS] = array_merge($lists[self::HEADERS], self::EXPORT_FIELDS[$fieldName]);
                } else {
                    $lists[self::HEADERS][] = SearchType::LIST_FIELDS[$fieldName]['name'];
                }

                $lists[self::PATH_METHODS][$fieldName] = SearchType::LIST_FIELDS[$fieldName]['path'];

                if (isset(SearchType::LIST_FIELDS[$fieldName]['filter'])) {
                    $lists[self::FILTERS][$fieldName] = $this->getFilters(SearchType::LIST_FIELDS[$fieldName]['filter'], $search);
                }
            }
        }

        // added additional fields if certain fields are selected
        if (!empty($listHeaders)) {
            // colleague_first
            $lists[self::HEADERS][] = SearchType::LIST_FIELDS['colleague_first']['name'];
            $lists[self::PATH_METHODS]['colleague_first'] = SearchType::LIST_FIELDS['colleague_first']['path'];

            // jobs_urls
            $lists[self::HEADERS] = array_merge($lists[self::HEADERS], self::EXPORT_FIELDS['jobs_urls']);
            $lists[self::PATH_METHODS]['jobs_urls'] = SearchType::LIST_FIELDS['jobs_urls']['path'];
            $lists[self::FILTERS]['jobs_urls'] = $this->getFilters(SearchType::LIST_FIELDS['jobs_urls']['filter'], $search);
        }

        return $lists;
    }

    private function getFilters($filter, array $search): array
    {
        $filters = [];

        if (!is_array($filter)) {
            $filters[] = $filter;

            return $filters;
        }

        foreach ($filter as $key => $value) {
            if (is_string($key) && $value && isset($search[$value])) {
                $filters[] = [$key => $search[$value]];
                continue;
            }

            $filters[] = $value;
        }

        return $filters;
    }

    /**
     * @param Contact $contact
     * @param array $paths
     * @return mixed
     */
    private function fetchContactElement(Contact $contact, array $paths)
    {
        $method = $paths[1];
        if (method_exists($contact, $method)) {
            return $contact->$method();
        }

        return null;
    }

    /**
     * @param Contact $contact
     * @param array $paths
     * @return mixed
     */
    private function fetchCompanyElement(Contact $contact, array $paths)
    {
        $method = $paths[1];
        if (!empty($contact->company) && (method_exists($contact->company, $method))) {
            return $contact->company->$method();
        }

        return null;
    }

    public function generateReport(Contact $contact, ?array $pathMethods, ?array $filters): array
    {
        if (!$pathMethods) {
            return [];
        }

        $payload = [];
        foreach ($pathMethods as $key => $path) {
            if (array_key_exists($key, $payload)) {
                continue;
            }

            if (isset($filters[$key])) {
                $contact = $this->getFilteredValue($contact, $filters[$key]);
            }

            $paths = explode('.', $path);
            if (!empty($paths)) {
                switch ($paths[0]) {
                    case 'contacts':
                        $data = $this->fetchContactElement($contact, $paths);
                        $payload[$key] = $data;
                        break;
                    case 'companies':
                        $data = $this->fetchCompanyElement($contact, $paths);
                        $payload[$key] = $data;
                        break;
                    default:
                        $method = $paths[0];
                        if (method_exists($this, $method)) {
                            $payload = array_merge($payload, $this->$method($contact));
                            break;
                        }
                        $payload[$key] = '';
                }
            }
        }

        return $payload;
    }

    protected function getFilteredValue(Contact $contact, $filters): Contact
    {
        if (empty($filters)) {
            return $contact;
        }

        foreach ($filters as $filter) {
            if (is_array($filter)) {
                $filterName = key($filter);
                if (method_exists($this, $filterName)) {
                    $contact = $this->$filterName($contact, $filter[$filterName]);
                }
                continue;
            }

            if (method_exists($this, $filter)) {
                $contact = $this->$filter($contact);
            }
        }

        return $contact;

    }

    protected function combineAdditionalFields(array $report, array $data, string $key): array
    {
        $items = !empty($data[$key]) ? $data[$key] : [];
        array_splice(
            $report,
            array_key_last($report) + 1,
            0,
            array_pad($items, count(self::EXPORT_FIELDS[$key]), null)
        );

        return $report;
    }

}
