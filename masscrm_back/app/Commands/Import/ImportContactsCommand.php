<?php declare(strict_types=1);

namespace App\Commands\Import;

use App\Models\User\User;
use Illuminate\Http\UploadedFile;

/**
 * Class ImportContactsCommand
 * @package  App\Commands\Filter
 */
class ImportContactsCommand
{
    protected UploadedFile $file;
    protected User $user;

    public function __construct(
        UploadedFile $file,
        User $user
    ) {
        $this->file = $file;
        $this->user = $user;
    }

    public function getFile(): UploadedFile
    {
        return $this->file;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
