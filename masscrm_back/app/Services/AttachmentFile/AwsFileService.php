<?php

declare(strict_types=1);

namespace App\Services\AttachmentFile;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use App\Exceptions\AttachmentFile\AttachmentFileException;

class AwsFileService implements FileServiceInterface
{
    public function store(string $path, UploadedFile $file): string
    {
        if (!Storage::cloud()->put($path, file_get_contents($file->getPath().'/'.$file->getFilename()), 'public')) {
            throw new AttachmentFileException('Cannot save file in Aws service');
        }

        return Storage::cloud()->url($path);
    }

    public function delete(string $path): bool
    {
        return Storage::cloud()->delete($path);
    }
}
