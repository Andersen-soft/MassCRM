<?php declare(strict_types=1);

namespace App\Observers\AttachmentFile;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\AttachmentFile\CompanyAttachment;
use App\Services\ActivityLog\ActivityLog;

class CompanyAttachmentObserver
{
    use ActivityLog;

    private $activeLogClass = ActivityLogCompany::class;

    private const FIELD_FILE_NAME = 'file_name';

    public function created(CompanyAttachment $companyAttachment): void
    {
        $this->createEvent($companyAttachment, self::FIELD_FILE_NAME);
    }

    public function updated(CompanyAttachment $companyAttachment): void
    {
        ($this->createLog(
            $companyAttachment,
            AbstractActivityLog::UPDATE_ATTACHMENT_FILE_EVENT,
            self::FIELD_FILE_NAME,
            $companyAttachment->getFileName(),
            $companyAttachment->getOriginal(self::FIELD_FILE_NAME)
        ))->save();
    }

    public function deleted(CompanyAttachment $companyAttachment): void
    {
        $this->deleteEvent($companyAttachment, self::FIELD_FILE_NAME);
    }
}
