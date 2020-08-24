<?php

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
            ->setUserId($companyAttachment->getUserId())
            ->setActivityType(ActivityLogCompany::STORE_ATTACHMENT_FILE_EVENT)
            ->setCompanyId($companyAttachment->getCompanyId())
            ->setModelName((new ReflectionClass($companyAttachment))->getShortName())
            ->setModelField(self::FIELD_FILE_NAME)
            ->setDataNew($companyAttachment->getFileName())
            ->setLogInfo($companyAttachment->toJson())
            ->save();
    }

    public function updated(CompanyAttachment $companyAttachment): void
    {
        (new ActivityLogCompany())
            ->setUserId($companyAttachment->getUserId())
            ->setActivityType(ActivityLogCompany::UPDATE_ATTACHMENT_FILE_EVENT)
            ->setCompanyId($companyAttachment->getCompanyId())
            ->setModelName((new ReflectionClass($companyAttachment))->getShortName())
            ->setModelField(self::FIELD_FILE_NAME)
            ->setDataOld($companyAttachment->getOriginal(self::FIELD_FILE_NAME))
            ->setDataNew($companyAttachment->getFileName())
            ->setLogInfo($companyAttachment->toJson())
            ->save();
    }

    public function deleted(CompanyAttachment $companyAttachment): void
    {
        (new ActivityLogCompany())
            ->setUserId($companyAttachment->getUserId())
            ->setActivityType(ActivityLogCompany::DELETE_ATTACHMENT_FILE_EVENT)
            ->setCompanyId($companyAttachment->getCompanyId())
            ->setModelName((new ReflectionClass($companyAttachment))->getShortName())
            ->setModelField(self::FIELD_FILE_NAME)
            ->setDataOld( $companyAttachment->getOriginal(self::FIELD_FILE_NAME))
            ->setLogInfo($companyAttachment->toJson())
            ->save();
    }
}
