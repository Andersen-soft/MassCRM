<?php declare(strict_types=1);

namespace App\Repositories\AttachmentFile;

use App\Models\AttachmentFile\ContactAttachment;
use Illuminate\Database\Eloquent\Builder;

class AttachmentFileContactRepository
{
    public function getAttachedFileContactId(int $contactId, string $nameFile): ?ContactAttachment
    {
        return ContactAttachment::query()->where(['contact_id' => $contactId, 'file_name' => $nameFile])->first();
    }

    public function getAttachedFiles(int $contactId): Builder
    {
        return ContactAttachment::query()->where('contact_id', '=', $contactId);
    }

    public function getAttachFileById(int $id): ?ContactAttachment
    {
        return ContactAttachment::query()->find($id);
    }

    public function checkExistAttachedFileContactId(int $contactId, string $nameFile): ?ContactAttachment
    {
        return ContactAttachment::query()->where(['contact_id' => $contactId, 'file_name' => $nameFile])->first();
    }
}
