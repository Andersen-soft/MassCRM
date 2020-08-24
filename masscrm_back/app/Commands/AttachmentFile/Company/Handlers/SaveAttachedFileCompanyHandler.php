<?php

namespace App\Commands\AttachmentFile\Company\Handlers;

use App\Commands\AttachmentFile\Company\SaveAttachedFileCompanyCommand;
use App\Repositories\AttachmentFile\AttachmentFileCompanyRepository;
use App\Services\AttachmentFile\AwsFileService;
use App\Models\AttachmentFile\CompanyAttachment;
use App\Exceptions\Custom\NotFoundException;
use App\Models\Company\Company;
use Carbon\Carbon;

class SaveAttachedFileCompanyHandler
{
    private const PATH = 'companies';
    private AwsFileService $awsFileService;
    private AttachmentFileCompanyRepository $attachFileCompanyRepository;

    public function __construct(
        AwsFileService $awsFileService,
        AttachmentFileCompanyRepository $attachFileCompanyRepository
    ) {
        $this->awsFileService = $awsFileService;
        $this->attachFileCompanyRepository = $attachFileCompanyRepository;
    }

    public function handle(SaveAttachedFileCompanyCommand $command): CompanyAttachment
    {
        $company = Company::find($command->getCompanyId());
        $fileName = $command->getFile()->getClientOriginalName();
        if (!$company instanceof Company) {
            throw new NotFoundException('Company value(' . $command->getCompanyId() . ') not found');
        }

        $file = $this->attachFileCompanyRepository->checkExistAttachedFileCompanyId(
            $command->getCompanyId(),
            $fileName
        );

        $pathFile = implode('/',[config('app.env'), self::PATH, $command->getCompanyId(), $fileName]);

        $url = $this->awsFileService->store($pathFile, $command->getFile());
        if (!$file) {
            $file = new CompanyAttachment();
        }

        $file->setFileName($fileName)
            ->setCompanyId($command->getCompanyId())
            ->setUrl($url)
            ->setUpdatedAt(Carbon::now())
            ->setUserId($command->getUser()->getId());

        $file->save();

        return $file;
    }
}
