<?php declare(strict_types=1);

namespace App\Services\Reports;

use App\Models\Company\Company;
use App\Models\Company\CompanyVacancy;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactCampaigns;
use App\Models\Contact\ContactColleagues;
use App\Models\Contact\ContactEmails;
use App\Models\Contact\ContactMails;
use App\Models\Contact\ContactNotes;
use App\Models\Contact\ContactPhones;
use App\Models\Contact\ContactSale;
use App\Models\Contact\ContactSocialNetworks;
use App\Models\Industry;
use Illuminate\Support\Facades\Lang;

abstract class AbstractReport implements SearchType
{
    private const WHEN_COLLEAGUE_DOES_NOT_EXIST = 'No data about colleague';
    protected const HEADERS = 'headers';
    protected const PATH_METHODS = 'pathMethods';

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
                ($contact->colleague_first ? $contact->colleague_first : $contact->colleague_second) ?? self::WHEN_COLLEAGUE_DOES_NOT_EXIST
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
        $jobs = [];
        $jobsSkills = [];
        $jobsLink = [];
        if ($contact->company) {

            /** @var CompanyVacancy $vacancy */
            foreach ($contact->company->vacancies_collection as $vacancy) {
                $jobs[] = $vacancy['job'];
                $jobsSkills[] = $vacancy['skills'];
                $jobsLink[] = $vacancy['link'];
            }
        }

        return [
            'jobs' => $jobs,
            'jobs_skills' => $jobsSkills,
            'jobs_urls' => $jobsLink
        ];
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

    public function getListHeaders(array $listHeaders): array
    {
        if (empty($listHeaders)) {
            return $this->getAllListHeaders();
        }

        return $this->getCertainListHeaders($listHeaders);
    }

    private function getAllListHeaders(): array
    {
        $lists = [];

        foreach (SearchType::LIST_FIELDS as $key => $item) {
            if (!empty($item['name'])) {
                $lists[self::HEADERS][] = $item['name'];
                $lists[self::PATH_METHODS][$key] = $item['path'];
            }
        }

        return $lists;
    }

    private function getCertainListHeaders(array $listHeaders): array
    {
        $lists = [];

        foreach ($listHeaders as $name) {
            if (array_key_exists($name, SearchType::LIST_FIELDS) &&
                !empty(SearchType::LIST_FIELDS[$name]['name'])
            ) {
                $lists[self::HEADERS][] = SearchType::LIST_FIELDS[$name]['name'];
                $lists[self::PATH_METHODS][$name] = SearchType::LIST_FIELDS[$name]['path'];
            }
        }

        $lists[self::HEADERS][] = SearchType::LIST_FIELDS['colleague_first']['name'];
        $lists[self::PATH_METHODS]['colleague_first'] = SearchType::LIST_FIELDS['colleague_first']['path'];

        return $lists;
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

    public function generateReport(Contact $contact, ?array $pathMethods): array
    {
        if (!$pathMethods) {
            return [];
        }

        $payload = [];
        foreach ($pathMethods as $key => $path) {
            if (array_key_exists($key, $payload)) {
                continue;
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
}
