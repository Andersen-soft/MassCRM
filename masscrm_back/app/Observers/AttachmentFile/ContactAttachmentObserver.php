<?php

namespace App\Observers\AttachmentFile;

use App\Models\AttachmentFile\ContactAttachment;
use App\Models\ActivityLog\ActivityLogContact;
use ReflectionClass;

class ContactAttachmentObserver
{
    private const FIELD_FILE_NAME = 'file_name';

    public function created(ContactAttachment $contactAttachment): void
    {
        (new ActivityLogContact())
            ->setUserId($contactAttachment->getUserId())
            ->setActivityType(ActivityLogContact::STORE_ATTACHMENT_FILE_EVENT)
            ->setContactId($contactAttachment->getContactId())
            ->setModelName((new ReflectionClass($contactAttachment))->getShortName())
            ->setModelField(self::FIELD_FILE_NAME)
            ->setDataNew($contactAttachment->getFileName())
            ->setLogInfo($contactAttachment->getRawOriginal())
            ->save();
    }

    public function updated(ContactAttachment $contactAttachment): void
    {
        (new ActivityLogContact())
            ->setUserId($contactAttachment->getUserId())
            ->setActivityType(ActivityLogContact::UPDATE_ATTACHMENT_FILE_EVENT)
            ->setContactId($contactAttachment->getContactId())
            ->setModelName((new ReflectionClass($contactAttachment))->getShortName())
            ->setModelField(self::FIELD_FILE_NAME)
            ->setDataOld($contactAttachment->getOriginal(self::FIELD_FILE_NAME))
            ->setDataNew($contactAttachment->getFileName())
            ->setLogInfo($contactAttachment->getRawOriginal())
            ->save();
    }

    public function deleting(ContactAttachment $contactAttachment): void
    {
        (new ActivityLogContact())
            ->setUserId($contactAttachment->getUserId())
            ->setActivityType(ActivityLogContact::DELETE_ATTACHMENT_FILE_EVENT)
            ->setContactId($contactAttachment->getContactId())
            ->setModelName((new ReflectionClass($contactAttachment))->getShortName())
            ->setModelField(self::FIELD_FILE_NAME)
            ->setDataOld($contactAttachment->getOriginal(self::FIELD_FILE_NAME))
            ->setLogInfo($contactAttachment->getRawOriginal())
            ->save();
    }
}
