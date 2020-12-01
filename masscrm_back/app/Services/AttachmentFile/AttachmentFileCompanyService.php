<?php declare(strict_types=1);

declare(strict_types=1);

namespace App\Services\AttachmentFile;

use App\Commands\AttachmentFile\Company\DeleteAttachmentFileCompanyCommand;
use App\Commands\AttachmentFile\Company\SaveAttachedFileCompanyCommand;
use App\Exceptions\Custom\NotFoundException;
use App\Models\AttachmentFile\CompanyAttachment;
use App\Models\User\User;
use App\Repositories\AttachmentFile\AttachmentFileCompanyRepository;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class AttachmentFileCompanyService
{
    private const PATH = 'companies';
    private AttachmentFileCompanyRepository $attachmentFileCompanyRepository;
    private AwsFileService $awsFileService;

    public function __construct(
        AttachmentFileCompanyRepository $attachmentFileCompanyRepository,
        AwsFileService $awsFileService
    ) {
        $this->attachmentFileCompanyRepository = $attachmentFileCompanyRepository;
        $this->awsFileService = $awsFileService;
    }

    public function getAttachedFilesCompany(int $companyId): Builder
    {
        return $this->attachmentFileCompanyRepository->getAttachedFilesCompany($companyId);
    }

    public function getAttachmentFile(int $companyId, string $name): ?CompanyAttachment
    {
        return $this->attachmentFileCompanyRepository->getAttachedFileCompanyId($companyId, $name);
    }

    public function deleteAttachFile(int $id): void
    {
        $companyAttachment = $this->attachmentFileCompanyRepository->getAttachFileById($id);
        if (!$companyAttachment instanceof CompanyAttachment) {
            throw new NotFoundException('Company attachment value(' . $id . ') not found');
        }

        $pathFile = implode('/', [
            config('app.env'),
            self::PATH,
            $companyAttachment->getCompanyId(),
            $companyAttachment->getFileName()
        ]);

        $this->awsFileService->delete($pathFile);
        CompanyAttachment::destroy($id);
    }

    public function saveAttachFile(SaveAttachedFileCompanyCommand $command): CompanyAttachment
    {
        $fileName = $command->getFile()->getClientOriginalName();
        $file = $this->attachmentFileCompanyRepository->getAttachedFileCompanyId(
            $command->getCompanyId(),
            $fileName
        );

        $pathFile = implode('/', [config('app.env'), self::PATH, $command->getCompanyId(), $fileName]);

        $url = $this->awsFileService->store($pathFile, $command->getFile());
        if (!$file) {
            $file = new CompanyAttachment();
        }

        $file->file_name = $fileName;
        $file->url = $url;
        $file->company_id = $command->getCompanyId();
        $file->user_id = $command->getUser()->getId();
        $file->touch();
        $file->save();

        return $file;
    }
}
