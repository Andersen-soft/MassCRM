<?php

namespace App\Commands\AttachmentFile\Company;

use App\Models\User\User;
use Illuminate\Http\UploadedFile;

class SaveAttachedFileCompanyCommand
{
    protected User $user;
    protected UploadedFile $file;
    protected int $companyId;

    public function __construct(User $user, UploadedFile $file, int $companyId)
    {
        $this->user = $user;
        $this->file = $file;
        $this->companyId = $companyId;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function getFile(): UploadedFile
    {
        return $this->file;
    }

    public function getCompanyId(): int
    {
        return $this->companyId;
    }
}
