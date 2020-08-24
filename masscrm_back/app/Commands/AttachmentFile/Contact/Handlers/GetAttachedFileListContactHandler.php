<?php

namespace App\Commands\AttachmentFile\Contact\Handlers;

use App\Commands\AttachmentFile\Contact\GetAttachedFileListContactCommand;
use App\Repositories\AttachmentFile\AttachmentFileContactRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GetAttachedFileListContactHandler
{
    private AttachmentFileContactRepository $attachFileContactRepository;

    public function __construct(AttachmentFileContactRepository $attachFileContactRepository)
    {
        $this->attachFileContactRepository = $attachFileContactRepository;
    }

    public function handle(GetAttachedFileListContactCommand $command): LengthAwarePaginator
    {
        return $this->attachFileContactRepository->getAttachedFiles(
            $command->getContactId(),
            $command->getLimit()
        );
    }
}
