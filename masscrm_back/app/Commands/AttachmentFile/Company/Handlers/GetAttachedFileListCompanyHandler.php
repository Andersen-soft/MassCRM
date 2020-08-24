<?php

namespace App\Commands\AttachmentFile\Company\Handlers;

use App\Commands\AttachmentFile\Company\GetAttachedFileListCompanyCommand;
use App\Repositories\AttachmentFile\AttachmentFileCompanyRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GetAttachedFileListCompanyHandler
{
    private AttachmentFileCompanyRepository $attachmentFileCompanyRepository;

    public function __construct(AttachmentFileCompanyRepository $attachmentFileCompanyRepository)
    {
        $this->attachmentFileCompanyRepository = $attachmentFileCompanyRepository;
    }

    public function handle(GetAttachedFileListCompanyCommand $command): LengthAwarePaginator
    {
        return $this->attachmentFileCompanyRepository->getAttachedFiles(
            $command->getCompanyId(),
            $command->getLimit()
        );
    }
}
