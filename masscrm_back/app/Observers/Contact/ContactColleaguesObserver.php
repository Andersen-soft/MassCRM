<?php declare(strict_types=1);

namespace App\Observers\Contact;

use App\Models\ActivityLog\ActivityLogContact;
use App\Models\Contact\ContactColleagues;
use App\Services\ActivityLog\ActivityLog;

class ContactColleaguesObserver
{
    use ActivityLog;

    private $activeLogClass = ActivityLogContact::class;

    private const FIELD_LINK = 'link';
    private static array $updateFieldLog = [self::FIELD_LINK];

    public function created(ContactColleagues $contactColleagues): void
    {
        $this->createEvent($contactColleagues, self::FIELD_LINK);
    }

    public function updated(ContactColleagues $contactColleagues): void
    {
        $this->updateEvent($contactColleagues);
    }

    public function deleting(ContactColleagues $contactColleagues): void
    {
        $this->deleteEvent($contactColleagues, self::FIELD_LINK);
    }
}
