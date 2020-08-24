<?php

namespace App\Commands\AttachmentFile\Company\Handlers;

use App\Commands\AttachmentFile\Company\DeleteAttachmentFileCompanyCommand;
use App\Models\AttachmentFile\CompanyAttachment;
use App\Services\AttachmentFile\AwsFileService;
use App\Exceptions\Custom\NotFoundException;

class DeleteAttachmentFileCompanyHandler
{
    private const PATH = 'companies';
    private AwsFileService $awsFileService;

    public function __construct(AwsFileService $awsFileService)
    {
        $this->awsFileService = $awsFileService;
    }

    public function handle(DeleteAttachmentFileCompanyCommand $command): void
    {
        $companyAttachment = CompanyAttachment::find($command->getId());
        if (!$companyAttachment instanceof CompanyAttachment) {
            throw new NotFoundException('Company attachment value(' . $command->getId() . ') not found');
        }

        $pathFile = implode('/', [
            config('app.env'),
            self::PATH,
            $companyAttachment->getCompanyId(),
            $companyAttachment->getFileName()
        ]);

        $this->awsFileService->delete($pathFile);
        CompanyAttachment::destroy($command->getId());
    }
}
