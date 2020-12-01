<?php

declare(strict_types=1);

namespace App\Commands\AttachmentFile\Company\Handlers;

use App\Commands\AttachmentFile\Company\CheckExistAttachmentFileCompanyCommand;
use App\Repositories\AttachmentFile\AttachmentFileCompanyRepository;
use App\Models\AttachmentFile\CompanyAttachment;
use App\Exceptions\Custom\NotFoundException;
use App\Models\Company\Company;

class CheckExistAttachmentFileCompanyHandler
{
    private AttachmentFileCompanyRepository $attachmentFileCompanyRepository;

    public function __construct(AttachmentFileCompanyRepository $attachmentFileCompanyRepository)
    {
        $this->attachmentFileCompanyRepository = $attachmentFileCompanyRepository;
    }

    public function handle(CheckExistAttachmentFileCompanyCommand $command): ?CompanyAttachment
    {
        $company = Company::query()->find($command->getCompanyId());
        if (!$company instanceof Company) {
            throw new NotFoundException('Company value(' . $command->getCompanyId() . ') not found');
        }

        return $this->attachmentFileCompanyRepository->checkExistAttachedFileCompanyId(
            $command->getCompanyId(),
            $command->getName()
        );
    }
}
