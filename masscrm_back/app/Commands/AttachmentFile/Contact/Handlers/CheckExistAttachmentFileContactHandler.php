<?php

declare(strict_types=1);

namespace App\Commands\AttachmentFile\Contact\Handlers;

use App\Exceptions\Custom\NotFoundException;
use App\Models\Contact\Contact;
use App\Repositories\AttachmentFile\AttachmentFileContactRepository;
use App\Commands\AttachmentFile\Contact\CheckExistAttachmentFileContactCommand;
use App\Models\AttachmentFile\ContactAttachment;

class CheckExistAttachmentFileContactHandler
{
    private AttachmentFileContactRepository $attachFileContactRepository;

    public function __construct(AttachmentFileContactRepository $attachFileContactRepository)
    {
        $this->attachFileContactRepository = $attachFileContactRepository;
    }

    public function handle(CheckExistAttachmentFileContactCommand $command): ?ContactAttachment
    {
        $contact = Contact::query()->find($command->getContactId());
        if (!$contact instanceof Contact) {
            throw new NotFoundException('Contact value(' . $command->getContactId() . ') not found');
        }

        return $this->attachFileContactRepository->checkExistAttachedFileContactId(
            $command->getContactId(),
            $command->getName()
        );
    }
}
