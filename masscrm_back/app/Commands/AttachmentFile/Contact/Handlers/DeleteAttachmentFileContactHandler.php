<?php

namespace App\Commands\AttachmentFile\Contact\Handlers;

use App\Exceptions\Custom\NotFoundException;
use App\Models\AttachmentFile\ContactAttachment;
use App\Services\AttachmentFile\AwsFileService;
use App\Commands\AttachmentFile\Contact\DeleteAttachmentFileContactCommand;

class DeleteAttachmentFileContactHandler
{
    private const PATH = 'contacts';
    private AwsFileService $awsFileService;

    public function __construct(AwsFileService $awsFileService)
    {
        $this->awsFileService = $awsFileService;
    }

    public function handle(DeleteAttachmentFileContactCommand $command): void
    {
        $contactAttachment = ContactAttachment::find($command->getId());
        if (!$contactAttachment instanceof ContactAttachment) {
            throw new NotFoundException('Contact attachment value(' . $command->getId() . ') not found');
        }

        $pathFile = implode('/', [
            config('app.env'),
            self::PATH,
            $contactAttachment->getContactId(),
            $contactAttachment->getFileName()
        ]);

        $this->awsFileService->delete($pathFile);
        ContactAttachment::destroy($command->getId());
    }
}
