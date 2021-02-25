<?php declare(strict_types=1);

namespace App\Observers\Contact;

use App\Models\ActivityLog\ActivityLogContact;
use App\Models\Contact\ContactSocialNetworks;
use App\Services\ActivityLog\ActivityLog;

class ContactSocialNetworksObserver
{
    use ActivityLog;

    private $activeLogClass = ActivityLogContact::class;

    private const FIELD_LINK = 'link';
    private static array $updateFieldLog = [self::FIELD_LINK];

    public function created(ContactSocialNetworks $contactSocialNetworks): void
    {
        $this->createEvent($contactSocialNetworks, self::FIELD_LINK);
    }

    public function updated(ContactSocialNetworks $contactSocialNetworks): void
    {
        $this->updateEvent($contactSocialNetworks);
    }

    public function deleted(ContactSocialNetworks $contactSocialNetworks): void
    {
        $this->deleteEvent($contactSocialNetworks, self::FIELD_LINK);
    }
}
