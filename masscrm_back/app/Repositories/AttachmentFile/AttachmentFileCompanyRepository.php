<?php

namespace App\Repositories\AttachmentFile;

use App\Models\AttachmentFile\CompanyAttachment;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

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
}
