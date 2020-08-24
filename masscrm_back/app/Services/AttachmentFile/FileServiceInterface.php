<?php

namespace App\Services\AttachmentFile;

use Illuminate\Http\UploadedFile;

interface FileServiceInterface
{
    public function store(string $path, UploadedFile $file);
    public function delete(string $path);
}
