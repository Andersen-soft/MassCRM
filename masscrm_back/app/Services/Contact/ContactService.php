<?php

namespace App\Services\Contact;

use App\Exceptions\Custom\NotFoundException;
use App\Models\ActivityLog\ActivityLogContact;
use App\Commands\Contact\DestroyContactsCommand;
use App\Commands\Contact\GetContactListCommand;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Repositories\Company\CompanyRepository;
use App\Models\Contact\ContactSale;
use App\Repositories\Contact\ContactRepository;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Commands\Contact\UpdateContactCommand;

class ContactService
{
    private const AMOUNT_EXPECTED_DAILY_PLAN = 30;

    private BaseContactService $baseContactService;

    public function __construct(BaseContactService $baseContactService)
    {
        $this->baseContactService = $baseContactService;
    }

    public function getCounterDailyPlanUser(User $user): array
    {
        return [
            'count' => $this->baseContactService->contactRepository->getCounterDailyPlanUser($user->id),
            'expected' => self::AMOUNT_EXPECTED_DAILY_PLAN
        ];
    }

    public function getListPreviousCompanies(int $id): array
    {
        $companies = [];

        $items = $this->baseContactService->activityLogContactService->fetchLogsContact(
            $id,
            'company_id',
            'Contact'
        );

        /** @var ActivityLogContact $item */
        foreach ($items as $key => $item) {
            if (empty($item->log_info)) {
                continue;
            }
            $company = $this->baseContactService->companyRepository->getCompanyById($item->log_info['company_id']);
            if ($company) {
                $companies[] = [
                    'company_name' => $company->name,
                    'company_id' => $item->log_info['company_id'],
                    'position' => $item->log_info['position'],
                    'updated_at' => Carbon::parse($item->log_info['updated_at'])->format(Contact::DATE_FORMAT)
                ];
            }
        }

        return $companies;
    }

    public function deleteContacts(DestroyContactsCommand $command): void
    {
        if (!$command->getUser()->hasRole(User::USER_ROLE_MANAGER)) {
            $this->deleteContact($command->getContactsId(), $command->getUser()->id);

            return;
        }

        if(empty($command->getSearch())){
            Contact::destroy($command->getContactsId());
        }else {
            $formSearchParams = $this->formSearchParams($command->getSearch());
            $this->deleteContactListBySearchParams($formSearchParams, $command->getLimit(), $command->getUser());
        }

        return;
    }

    public function getContactListBySearchParams(GetContactListCommand $command): LengthAwarePaginator
    {
        $formedSearchParams = $this->formSearchParams($command->getSearch());

        return $this->baseContactService->contactRepository->getContactList(
            $formedSearchParams,
            $command->getSort(),
            $command->getLimit(),
            !$command->getUser()->hasRole(User::USER_ROLE_MANAGER) ? $command->getUser() : null
        );
    }

    private function formSearchParams(array $searchParams): array
    {
        $searchArr = $searchParams;
        $tmp = $searchArr;
        $search = [];
        unset($tmp[Company::COMPANY_FIELD]);
        unset($tmp[ContactSale::SALE]);

        if (!empty($tmp)) {
            $search[Contact::CONTACT] = $tmp;
        }

        if (isset($searchArr[Company::COMPANY_FIELD])) {
            $search[Company::COMPANY_FIELD] = $searchArr[Company::COMPANY_FIELD];
        }

        if (isset($searchArr[ContactSale::SALE])) {
            $search[ContactSale::SALE] = $searchArr[ContactSale::SALE];
        }

        return $search;
    }

    private function deleteContactListBySearchParams(array $search, int $limit, User $user): void
    {
        if(!empty($search)){
            $listOfContacts = $this->baseContactService->contactRepository->getContactList(
                $search,
                [],
                $limit,
                $user
            );

            $this->deleteContact(array_column($listOfContacts->items(),'id'), $user->id);
        }
    }

    private function deleteContact(array $contactsIds, $userId): void
    {
        Contact::query()
            ->whereIntegerInRaw('id', $contactsIds)
            ->where('user_id' , '=', $userId)
            ->delete();
    }

    public function updateContact(UpdateContactCommand $command): Contact
    {
        $contact = $this->baseContactService->contactRepository->getContactById($command->getContactId());
        if (!$contact) {
            throw new NotFoundException('Contact value(' . $command->getContactId() . ') not found');
        }

        $contact->user()->associate($command->getUser());

        if ($command->getCompanyId()) {
            $company = $this->baseContactService->companyRepository->getCompanyById($command->getCompanyId());
            if (!$company) {
                throw new NotFoundException('Company value(' . $command->getCompanyId() . ') not found');
            }

            $contact->company()->associate($company);
        }

        $this->baseContactService->contactEmailService->updateEmails(
            $contact,
            $command->getEmails(),
            $command->isRequiresValidation()
        );

        $this->baseContactService->contactPhoneService->updatePhones($contact, $command->getPhones());
        $this->baseContactService->contactNotesService->updateNotes($contact, $command->getNotes());
        $this->baseContactService->contactSocialNetworkService->updateSocialNetworks(
            $contact,
            $command->getSocialNetworks()
        );

        if ($command->getOrigin() !== null) {
            $contact->origin = implode(';', $command->getOrigin());
        }

        $contact->update($command->getContactFields());
        $contact->setUpdatedAt(Carbon::now());
        $contact->save();

        return $contact;
    }
}
