<?php declare(strict_types=1);

namespace App\Commands\AttachmentFile\Contact;

use App\Models\User\User;
use Illuminate\Http\UploadedFile;

class SaveAttachedFileContactCommand
{
    protected User $user;
    protected UploadedFile $file;
    protected int $contactId;

    public function __construct(User $user, UploadedFile $file, int $contactId)
    {
        $this->user = $user;
        $this->file = $file;
        $this->contactId = $contactId;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function getFile(): UploadedFile
    {
        return $this->file;
    }

    public function getContactId(): int
    {
        return $this->contactId;
    }
}
