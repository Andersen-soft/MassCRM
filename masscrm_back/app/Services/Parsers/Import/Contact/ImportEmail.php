<?php

namespace App\Services\Parsers\Import\Contact;

use App\Exceptions\Import\ImportFileException;
use App\Models\Contact\Contact;
use App\Repositories\Contact\ContactEmailsRepository;
use App\Services\Blacklist\BlacklistService;
use Illuminate\Support\Facades\Lang;

class ImportEmail
{
    private ContactEmailsRepository $contactEmailsRepository;
    private BlacklistService $blacklistService;

    public function __construct(ContactEmailsRepository $contactEmailsRepository, BlacklistService $blacklistService)
    {
        $this->contactEmailsRepository = $contactEmailsRepository;
        $this->blacklistService = $blacklistService;
    }

    public function merge(Contact $contact, array $row): void
    {
        if (empty($row['contactEmail'])) {
            return;
        }

        $this->mergeEmails($contact, $row['contactEmail']);
    }

    public function replace(Contact $contact, array $row): void
    {
        if (empty($row['contactEmail'])) {
            return;
        }

        $flagReplace = false;
        if (strtolower($contact->getOriginal('linkedin')) !== strtolower($contact->linkedin)
            && !empty($contact->linkedin)
        ) {
            $flagReplace = true;
        }


        if ($flagReplace) {
            $contact->contactEmails()->delete();
            $contact->in_blacklist = false;
            $contact->save();
            $this->create($contact, $row);

            return;
        }

        $this->mergeEmails($contact, $row['contactEmail']);
    }

    private function mergeEmails(Contact $contact, array $emails): void
    {
        $contactEmails = $contact->contactEmails()->pluck('email')->toArray();

        foreach ($emails['email']  as $key => $item) {
            if (!$this->contactEmailsRepository->checkUniquenessContactNoEmailImport($contact, $item)) {
                if ($this->contactEmailsRepository->checkUniquenessNoEmailImport($item)) {
                    throw new ImportFileException([
                        Lang::get('validationModel.contactEmail.email_duplicate', ['value' => $item])
                    ]);
                }

                $contact->contactEmails()->create([
                    'email' => $item,
                    'verification' => !$key && empty($contactEmails) ? $this->getRequiresValidation($emails) : false
                ]);

                if ($this->blacklistService->checkEmailInBlackList($item)) {
                    $contact->in_blacklist = true;
                    $contact->save();
                }
            }
        }

        if (empty($contact->contactEmails()->count('*'))) {
            throw new ImportFileException([
                Lang::get('This contact does not have email at all')
            ]);
        }
    }

    private function getRequiresValidation(array $emails): bool
    {
        if (empty($emails['requires_validation'][0])) {
            return false;
        }


        if (strtolower($emails['requires_validation'][0]) === 'no') {
            return false;
        }

        return true;
    }

    public function create(Contact $contact, array $row): void
    {
        if (empty($row['contactEmail'])) {
            return;
        }

        foreach ($row['contactEmail']['email'] as $key => $item) {
            if ($this->contactEmailsRepository->checkUniquenessNoEmailImport($item)) {
                throw new ImportFileException([
                    Lang::get('validationModel.contactEmail.email_duplicate', ['value' => $item])
                ]);
            }

            $contact->contactEmails()->create([
                'email' => $item,
                'verification' => !$key ? $this->getRequiresValidation($row['contactEmail']) : false
            ]);

            if ($this->blacklistService->checkEmailInBlackList($item)) {
                $contact->in_blacklist = true;
                $contact->save();
            }
        }
    }
}
