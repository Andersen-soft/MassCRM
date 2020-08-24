<?php

namespace App\Commands\AttachmentFile\Contact\Handlers;

use App\Commands\AttachmentFile\Contact\SaveAttachedFileContactCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Models\AttachmentFile\ContactAttachment;
use App\Models\Contact\Contact;
use App\Repositories\AttachmentFile\AttachmentFileContactRepository;
use App\Services\AttachmentFile\AwsFileService;
use Carbon\Carbon;

class SaveAttachedFileContactHandler
{
    private const PATH = 'contacts';
    private AwsFileService $awsFileService;
    private AttachmentFileContactRepository $attachFileContactRepository;

    public function __construct(
        AwsFileService $awsFileService,
        AttachmentFileContactRepository $attachFileContactRepository
    ) {
        $this->awsFileService = $awsFileService;
        $this->attachFileContactRepository = $attachFileContactRepository;
    }

    public function handle(SaveAttachedFileContactCommand $command): ContactAttachment
    {
        $contact = Contact::find($command->getContactId());
        $fileName = $command->getFile()->getClientOriginalName();
        if (!$contact instanceof Contact) {
            throw new NotFoundException('Contact value(' . $command->getContactId() . ') not found');
        }

        $file = $this->attachFileContactRepository->checkExistAttachedFileContactId(
            $command->getContactId(),
            $fileName
        );

        $pathFile = implode('/',[config('app.env'), self::PATH, $command->getContactId(), $fileName]);

        $url = $this->awsFileService->store($pathFile, $command->getFile());
        if (!$file) {
            $file = new ContactAttachment();
        }

        $file->setFileName($fileName)
            ->setContactId($command->getContactId())
            ->setUrl($url)
            ->setUpdatedAt(Carbon::now())
            ->setUserId($command->getUser()->getId());

        $file->save();

        return $file;
    }
}
