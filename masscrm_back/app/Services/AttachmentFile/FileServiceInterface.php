<?php declare(strict_types=1);

namespace App\Services\AttachmentFile;

use Illuminate\Http\UploadedFile;

interface FileServiceInterface
{
    /**
     * @param string $path
     * @param UploadedFile $file
     * @return mixed
     */
    public function store(string $path, UploadedFile $file);

    /**
     * @param string $path
     * @return mixed
     */
    public function delete(string $path);
}
