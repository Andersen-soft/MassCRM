<?php

namespace App\Repositories\AttachmentFile;

use App\Models\AttachmentFile\ContactAttachment;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AttachmentFileContactRepository
{
    public function checkExistAttachedFileContactId(int $contactId, string $nameFile): ?ContactAttachment
    {
        return ContactAttachment::query()->where(['contact_id' => $contactId, 'file_name' => $nameFile])->first();
    }

    public function getAttachedFiles(int $contactId, int $limit): LengthAwarePaginator
    {
        $query = ContactAttachment::query()->where('contact_id', '=', $contactId);

        return $query->paginate($limit);
    }
}
