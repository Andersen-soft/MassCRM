<?php

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
    protected function getContactSequences(Contact $contact): array
    {
        $listSequences = [];
        $listSequencesStatus = [];

        /** @var ContactCampaigns $sequence */
        foreach ($contact->sequences as $sequence) {
            if ($sequence->status->isActive()) {
                $listSequences[] = $sequence->getSequence();
                $listSequencesStatus[] = $sequence->status->getName();
            }
        }

        return [
            'sequence' => $listSequences,
            'status' => $listSequencesStatus,
        ];
    }

    protected function getContactOtherSocialNetwork(Contact $contact): array
    {
        $listNetworks = [];

        /** @var ContactSocialNetworks $network */
        foreach ($contact->contactSocialNetworks as $network) {
            if ($network->isActive()) {
                $listNetworks[] = $network->getLink();
            }
        }

        return [
            'social_networks' => $listNetworks
        ];
    }

    protected function getContactPhones(Contact $contact): array
    {
        $phones = [];

        /** @var ContactPhones $phone */
        foreach ($contact->contactPhones as $phone) {
            if ($phone->isActive()) {
                $phones[] = $phone->getPhone();
            }
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
        foreach ($contact->contactEmails as $email) {
            if ($email->isActive()) {
                $emails[] = $email->getEmail();
                $requiresValidationEmails[] = $email->isVerification() ?
                    Lang::get('report.yes') :
                    Lang::get('report.no');
            }
        }

        return [
            'requires_validation' => $requiresValidationEmails,
            'emails' => $emails
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
        foreach ($contact->sales as $sale) {
            $salesIs1cProject[] = $sale->isProjectC1() ? Lang::get('report.yes') : Lang::get('report.no');
            $salesLink[] = $sale->getLink();
            if ($sale->status) {
                $salesStatus[] = $sale->status->getName();
            }
            if ($sale->source) {
                $salesSources[] = $sale->source->getName();
            }

            $salesCreated[] = $sale->getCreatedAtDate();
        }

        return [
            'sale_link' => $salesLink,
            'sale_status' => $salesStatus,
            'sale_project_c1' => $salesIs1cProject,
            'source' => $salesSources,
            'sale_сreated' => $salesCreated,
        ];
    }

    protected function getContactMails(Contact $contact): array
    {
        $messages = [];

        /** @var ContactMails $mail */
        foreach ($contact->mails as $mail) {
            $messages[] = $mail->getMessage();
        }

        return [
            'mails' => $messages
        ];
    }

    protected function getContactNotes(Contact $contact): array
    {
        $notes = [];

        /** @var ContactNotes $note */
        foreach ($contact->notes as $note) {
            $notes[] = $note->getMessage();
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
            foreach ($contact->company->industries as $industry) {
                $industries[] = $industry->getName();
            }
        }

        return [
            'industries' => $industries
        ];
    }

    protected function getCompanyVacancies(Contact $contact): array
    {
        $jobs = [];
        $jobsSkills = [];
        if ($contact->company) {

            /** @var CompanyVacancy $vacancy */
            foreach ($contact->company->vacancies as $vacancy) {
                $jobs[] = $vacancy->getVacancy();
                $jobsSkills[] = $vacancy->getSkills();
            }
        }

        return [
            'jobs' => $jobs,
            'jobs_skills' => $jobsSkills
        ];
    }

    protected function getRelationCompanies(Contact $contact): array
    {
        $relationCompanies = [];
        if ($contact->company) {

            /** @var Company $relation */
            foreach ($contact->company->companySubsidiary as $relation) {
                $relationCompanies[] = $relation->getName();
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
            if ($contact->company->getMinEmployees()) {
                $size[] = $contact->company->getMinEmployees();
            }

            if ($contact->company->getMaxEmployees()) {
                $size[] = $contact->company->getMaxEmployees();
            }
        }

        return [
            'company_size' => implode(' - ', $size)
        ];
    }

    public function getListHeaders(array $listHeaders): array
    {
        $listNameHeaders = [];
        $pathMethod = [];
        if (empty($listHeaders)) {
            foreach (SearchType::LIST_FIELDS as $key => $item) {
                $listNameHeaders[] = $item['name'];
                $pathMethod[$key] = $item['path'];
            }
        } else {
            foreach ($listHeaders as $name) {
                if (array_key_exists($name, SearchType::LIST_FIELDS)) {
                    $listNameHeaders[] = SearchType::LIST_FIELDS[$name]['name'];
                    $pathMethod[$name] = SearchType::LIST_FIELDS[$name]['path'];
                }
            }
        }

        return [
            'headers' => $listNameHeaders,
            'pathMethods' => $pathMethod,
        ];
    }

    private function fetchContactElement(Contact $contact, array $paths)
    {
        $method = $paths[1];
        if (method_exists($contact, $method)) {
            return $contact->$method();
        }

        return null;
    }

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
