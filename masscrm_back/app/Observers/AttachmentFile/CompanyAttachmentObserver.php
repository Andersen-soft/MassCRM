<?php declare(strict_types=1);

namespace App\Observers\AttachmentFile;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\AttachmentFile\CompanyAttachment;
use ReflectionClass;

class CompanyAttachmentObserver
{
    private const FIELD_FILE_NAME = 'file_name';

    public function created(CompanyAttachment $companyAttachment): void
    {
        (new ActivityLogCompany())
            ->setCompanyId($companyAttachment->getCompanyId())
            ->setUserId($companyAttachment->getUserId())
            ->setActivityType(ActivityLogCompany::STORE_ATTACHMENT_FILE_EVENT)
            ->setModelName((new ReflectionClass($companyAttachment))->getShortName())
            ->setModelField(self::FIELD_FILE_NAME)
            ->setDataNew($companyAttachment->getFileName())
            ->setLogInfo($companyAttachment->getRawOriginal())
            ->save();
    }

    public function updated(CompanyAttachment $companyAttachment): void
    {
        (new ActivityLogCompany())
            ->setCompanyId($companyAttachment->getCompanyId())
            ->setUserId($companyAttachment->getUserId())
            ->setActivityType(ActivityLogCompany::UPDATE_ATTACHMENT_FILE_EVENT)
            ->setModelName((new ReflectionClass($companyAttachment))->getShortName())
            ->setModelField(self::FIELD_FILE_NAME)
            ->setDataOld($companyAttachment->getOriginal(self::FIELD_FILE_NAME))
            ->setDataNew($companyAttachment->getFileName())
            ->setLogInfo($companyAttachment->getRawOriginal())
            ->save();
    }

    public function deleted(CompanyAttachment $companyAttachment): void
    {
        (new ActivityLogCompany())
            ->setCompanyId($companyAttachment->getCompanyId())
            ->setUserId($companyAttachment->getUserId())
            ->setActivityType(ActivityLogCompany::DELETE_ATTACHMENT_FILE_EVENT)
            ->setModelName((new ReflectionClass($companyAttachment))->getShortName())
            ->setModelField(self::FIELD_FILE_NAME)
            ->setDataOld($companyAttachment->getOriginal(self::FIELD_FILE_NAME))
            ->setLogInfo($companyAttachment->getRawOriginal())
            ->save();
    }
}
