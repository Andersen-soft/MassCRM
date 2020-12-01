<?php declare(strict_types=1);

namespace App\Services\Contact;

use App\Exceptions\Validation\ValidationRequestException;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactEmails;
use App\Services\Blacklist\BlacklistService;
use App\Services\TransferCollection\TransferCollectionContactService;
use App\Repositories\Contact\ContactEmailsRepository;

class ContactEmailService
{
    private BlacklistService $blacklistService;
    private TransferCollectionContactService $transferCollectionContactService;

    public function __construct(
        BlacklistService $blacklistService,
        TransferCollectionContactService $transferCollectionContactService
    ) {
        $this->blacklistService = $blacklistService;
        $this->transferCollectionContactService = $transferCollectionContactService;
    }

    public function updateEmails(Contact $contact, array $emails, bool $requiresValidation = false): void
    {
        if (empty($emails)) {
            return;
        }

        $flagInBlacklist = false;
        $contact->contactEmails()->delete();
        foreach ($emails as $key => $email) {
            $contact->contactEmails()->create([
                'email' => $email,
                'verification' => !$key ? $requiresValidation : false
            ]);

            if ($this->blacklistService->checkEmailInBlackList($email)) {
                $flagInBlacklist = true;
            }
        }

        $contact->in_blacklist = $flagInBlacklist;
        $contact->email_collection = $this->transferCollectionContactService->getEmails($contact);
        $contact->save();
    }

    public function addEmails(Contact $contact, array $emails, bool $verification): void
    {
        $flagInBlacklist = false;
        foreach ($emails as $key => $email) {
            $contact->contactEmails()->create([
                'email' => $email,
                'verification' => !$key ? $verification : false
            ]);

            if ($this->blacklistService->checkEmailInBlackList($email)) {
                $flagInBlacklist = true;
            }
        }

        $contact->in_blacklist = $flagInBlacklist;
        $contact->save();
    }
}
