<?php

declare(strict_types=1);

namespace App\Repositories\AttachmentFile;

use App\Models\AttachmentFile\CompanyAttachment;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class AttachmentFileCompanyRepository
{
    public function checkExistAttachedFileCompanyId(int $companyId, string $nameFile): ?CompanyAttachment
    {
        return CompanyAttachment::query()->where(['company_id' => $companyId, 'file_name' => $nameFile])->first();
    }

    public function getAttachedFiles(int $companyId, int $limit): LengthAwarePaginator
    {
        $query = CompanyAttachment::query()->where('company_id', '=', $companyId);

        return $query->paginate($limit);
    }

    public function getAttachedFileCompanyId(int $companyId, string $nameFile): ?CompanyAttachment
    {
        return CompanyAttachment::query()->where(['company_id' => $companyId, 'file_name' => $nameFile])->first();
    }

    public function getAttachedFilesCompany(int $companyId): Builder
    {
        return CompanyAttachment::query()->where('company_id', '=', $companyId);
    }

    public function getAttachFileById(int $id): ?CompanyAttachment
    {
        return CompanyAttachment::query()->find($id);
    }
}
