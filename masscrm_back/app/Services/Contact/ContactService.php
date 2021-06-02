<?php

declare(strict_types=1);

namespace App\Services\Contact;

use App\Commands\Contact\ChangeResponseContactsCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Exceptions\Permission\PermissionException;
use App\Exceptions\Validation\ValidationRequestException;
use App\Models\ActivityLog\ActivityLogContact;
use App\Commands\Contact\DestroyContactsCommand;
use App\Commands\Contact\GetContactListCommand;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactSale;
use App\Models\User\User;
use Carbon\Carbon;
use App\Commands\Contact\UpdateContactCommand;
use App\Commands\Contact\CreateContactCommand;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Lang;

class ContactService
{
    private const AMOUNT_EXPECTED_DAILY_PLAN = 30;

    private const PREVIOUS_COMPANY_WITH_POSITION = [
        [
            'model_field' => self::COMPANY_ID,
            'model_name' => 'Contact'
        ],
        [
            'model_field' => 'position',
            'model_name' => 'Contact'
        ]
    ];

    private BaseContactService $baseContactService;

    private const COMPANY_ID = 'company_id';

    private Contact $contact;

    public function __construct(BaseContactService $baseContactService, User $user, Contact $contact)
    {
        $this->baseContactService = $baseContactService;
        $this->user = $user;
        $this->contact = $contact;
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
            self::PREVIOUS_COMPANY_WITH_POSITION
        );

        /** @var ActivityLogContact $item */
        foreach ($items as $key => $item) {
            if (empty($item->data_old) || $item->model_field !== self::COMPANY_ID || !$item->log_info) {
                continue;
            }

            if (($oldCompany = json_decode($item->data_old)) && empty($oldCompany->id)) {
                continue;
            }

            $company = $this->baseContactService->companyRepository->getCompanyById((int) $oldCompany->id);
            $positionChangeLog = $items
                ->where('created_at', $item->created_at)
                ->where('model_field', '=', 'position')
                ->first();

            if (!$company || (!$positionChangeLog && !isset($item->log_info['position']))) {
                continue;
            }

            $position = $positionChangeLog ? $positionChangeLog->data_old : $item->log_info['position'];
            $companies[] = [
                'company_name' => $company->name,
                self::COMPANY_ID => $company->id,
                'position' => $position,
                'updated_at' => Carbon::parse($item->log_info['updated_at'])->format(Contact::DATE_FORMAT)
            ];
        }

        return $companies;
    }

    public function deleteContacts(DestroyContactsCommand $command): bool
    {
        if (empty($command->getSearch())) {
            $idsToDelete = Contact::query()->whereIn('id', $command->getContactsId())
                ->when($command->getUser()->hasRole(User::USER_ROLE_NC2), function ($query) use ($command) {
                    return $query->where('responsible_id', $command->getUser()->id);
                })
                ->pluck('id');

            $destroyResult = Contact::destroy($idsToDelete);
        } else {
            $formSearchParams = $this->formSearchParams($command->getSearch());
            $destroyResult = $this->deleteContactListBySearchParams(
                $formSearchParams,
                $command->getUser(),
                $command->getExceptIds()
            );
        }

        return (bool)$destroyResult;
    }

    public function getContactListBySearchParams(GetContactListCommand $command): Builder
    {
        $formedSearchParams = $this->formSearchParams($command->getSearch());

        return $this->baseContactService->contactRepository->getContactList(
            $formedSearchParams,
            $command->getUser(),
            [],
            $command->getSort(),
        );
    }

    private function formSearchParams(array $searchParams): array
    {
        $searchArr = $searchParams;
        $tmp = $searchArr;
        $search = [];
        unset(
            $tmp[Company::COMPANY_FIELD],
            $tmp[ContactSale::SALE]
        );

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

    private function deleteContactListBySearchParams(array $search, User $user = null, $exceptIds = []): bool
    {
        if (!empty($search)) {
            $listOfContacts = $this->baseContactService->contactRepository->getContactList(
                $search,
                $user,
                $exceptIds
            );

            if ($user->hasRole(User::USER_ROLE_NC2)) {
                $listOfContacts = $listOfContacts->where('responsible_id', $user->id);
            }
            $this->baseContactService->contactRepository->deleteContact($listOfContacts);

            return true;
        }

        return false;
    }

    private function updateResponsibleBySearchParams(array $search, int $responsibleId, User $user): void
    {
        if (!empty($search) && !empty($responsibleId)) {
            $listOfContacts = $this->baseContactService->contactRepository->getContactList(
                $search,
                $user
            );

            $this->baseContactService->contactRepository
                ->changeResponsibleByBuilder(
                    $listOfContacts,
                    $responsibleId
                );
        }
    }

    public function changeResponsible(ChangeResponseContactsCommand $command): void
    {
        if (empty($command->getSearch())) {
            $this->baseContactService->contactRepository->changeResponsibleById(
                $command->getContactsId(),
                $command->getResponsibleId()
            );

        } else {
            $formSearchParams = $this->formSearchParams($command->getSearch());
            $this->updateResponsibleBySearchParams(
                $formSearchParams,
                $command->getResponsibleId(),
                $command->getUser()
            );
        }

        return;
    }

    public function updateContact(UpdateContactCommand $command): Contact
    {
        $contact = $this->baseContactService->contactRepository->getContactById($command->getContactId());
        if (!$contact) {
            throw new NotFoundException('Contact value(' . $command->getContactId() . ') not found');
        }

        $this->checkUserCanModifyContact($contact, $command->getUser());

        // Check if NC can update someone's contact
        if ($contact->user != $command->getUser() &&
            $command->getUser()->hasRole(User::USER_ROLE_NC2) &&
            $contact->user->hasRole(User::USER_ROLE_NC2) &&
            optional(optional($contact->company)->vacancies())->exists()) {
            throw new PermissionException('Permission denied');
        }

        $this->contact->updateContact(
            $contact,
            $command->getContactFields(),
            $command->getUser(),
            $command->getOrigin()
        );

        if ($command->getCompanyId()) {
            $company = $this->baseContactService->companyRepository->getCompanyById($command->getCompanyId());
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

        return $contact;
    }

    public function addContact(CreateContactCommand $command): Contact
    {
        $contact = $this->contact->createContact(
            $command->getContactFields(),
            $command->getUser(),
            $command->getOrigin()
        );

        if ($command->getCompanyId()) {
            $company = $this->baseContactService->companyRepository->getCompanyById($command->getCompanyId());
            $contact->company()->associate($company);
        }

        $this->baseContactService->contactSocialNetworkService->addSocialNetworks(
            $contact,
            $command->getSocialNetworks()
        );

        $this->baseContactService->contactEmailService->addEmails(
            $contact,
            $command->getEmails(),
            $command->isRequiresValidation()
        );

        $this->baseContactService->contactPhoneService->addPhones($contact, $command->getPhones());
        $this->baseContactService->transferCollectionContactService->updateCollectionContact($contact);

        return $contact;
    }

    public function getContact(int $contactId): Contact
    {
        $contact = Contact::query()->find($contactId);
        if ($contact instanceof Contact) {
            $contact->loadMissing('company');
            return $contact;
        }

        throw new NotFoundException('Contact value(' . $contactId . ') not found');
    }

    private function checkUserCanModifyContact(Contact $contact, User $user): void
    {
        if ($user->hasRole(User::USER_ROLE_NC2) && $contact->getResponsible() !== $user->getId()) {
            throw new ValidationRequestException([Lang::get('exception.user_can_not_modify_contact')]);
        }
    }

    public function getContactsByCompanyId(int $contactId)
    {
        return Contact::query()->where('company_id', '=', $contactId);
    }
}
