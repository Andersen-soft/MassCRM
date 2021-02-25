<?php


namespace App\Observers\Contact;

use App\Models\ActivityLog\ActivityLogContact;
use App\Models\Contact\ContactEmails;
use App\Services\ActivityLog\ActivityLog;

class ContactEmailsObserver
{
    use ActivityLog;

    private $activeLogClass = ActivityLogContact::class;

    private const FIELD_EMAIL = 'email';
    private const FIELD_VERIFICATION = 'verification';
    private static array $updateFieldLog = [self::FIELD_EMAIL, self::FIELD_VERIFICATION];

    public function created(ContactEmails $contactEmails): void
    {
        $this->createEvent($contactEmails, self::FIELD_EMAIL);
    }

    public function updated(ContactEmails $contactEmails): void
    {
        $this->updateEvent($contactEmails, self::FIELD_EMAIL);
    }

    public function deleted(ContactEmails $contactEmails): void
    {
        $this->deleteEvent($contactEmails, self::FIELD_EMAIL);
    }
}
