<?php

declare(strict_types=1);

namespace App\Services\AttachmentFile;

use App\Commands\AttachmentFile\Contact\DeleteAttachmentFileContactCommand;
use App\Commands\AttachmentFile\Contact\SaveAttachedFileContactCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Models\AttachmentFile\ContactAttachment;
use App\Models\Contact\Contact;
use App\Repositories\AttachmentFile\AttachmentFileContactRepository;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class AttachmentFileContactService
{
    private const PATH = 'contacts';
    private AttachmentFileContactRepository $attachmentFileContactRepository;
    private AwsFileService $awsFileService;

    public function __construct(
        AttachmentFileContactRepository $attachmentFileContactRepository,
        AwsFileService $awsFileService
    ) {
        $this->awsFileService = $awsFileService;
        $this->attachmentFileContactRepository = $attachmentFileContactRepository;
    }

    public function getAttachedFilesContact(int $contactId): Builder
    {
        return $this->attachmentFileContactRepository->getAttachedFiles($contactId);
    }

    public function getAttachmentFile(int $contactId, string $name): ?ContactAttachment
    {
        return $this->attachmentFileContactRepository->getAttachedFileContactId($contactId, $name);
    }

    public function deleteAttachFile(int $id): void
    {
        $contactAttachment = $this->attachmentFileContactRepository->getAttachFileById($id);
        if (!$contactAttachment instanceof ContactAttachment) {
            throw new NotFoundException('Contact attachment value(' . $id . ') not found');
        }

        $pathFile = implode('/', [
            config('app.env'),
            self::PATH,
            $contactAttachment->getContactId(),
            $contactAttachment->getFileName()
        ]);

        $this->awsFileService->delete($pathFile);
        ContactAttachment::destroy($id);
    }

    public function saveAttachFile(SaveAttachedFileContactCommand $command): ContactAttachment
    {
        $fileName = $command->getFile()->getClientOriginalName();
        $file = $this->attachmentFileContactRepository->getAttachedFileContactId(
            $command->getContactId(),
            $fileName
        );

        $pathFile = implode('/', [config('app.env'), self::PATH, $command->getContactId(), $fileName]);

        $url = $this->awsFileService->store($pathFile, $command->getFile());
        if (!$file) {
            $file = new ContactAttachment();
        }

        $file->file_name = $fileName;
        $file->url = $url;
        $file->contact_id = $command->getContactId();
        $file->user_id = $command->getUser()->getId();
        $file->touch();
        $file->save();

        return $file;
    }
}
