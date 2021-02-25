<?php declare(strict_types=1);

namespace App\Observers\AttachmentFile;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Models\ActivityLog\ActivityLogContact;
use App\Models\AttachmentFile\ContactAttachment;
use App\Services\ActivityLog\ActivityLog;

class ContactAttachmentObserver
{
    use ActivityLog;

    private $activeLogClass = ActivityLogContact::class;

    private const FIELD_FILE_NAME = 'file_name';

    public function created(ContactAttachment $contactAttachment): void
    {
        $this->createEvent($contactAttachment, self::FIELD_FILE_NAME);
    }

    public function updated(ContactAttachment $contactAttachment): void
    {
        ($this->createLog(
            $contactAttachment,
            AbstractActivityLog::UPDATE_ATTACHMENT_FILE_EVENT,
            self::FIELD_FILE_NAME,
            $contactAttachment->getFileName(),
            $contactAttachment->getOriginal(self::FIELD_FILE_NAME)
        ))->save();
    }

    public function deleting(ContactAttachment $contactAttachment): void
    {
        $this->deleteEvent($contactAttachment, self::FIELD_FILE_NAME);
    }
}
