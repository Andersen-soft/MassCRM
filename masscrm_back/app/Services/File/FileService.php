<?php

declare(strict_types=1);

namespace App\Services\File;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FileService
{
    public function download(string $file): BinaryFileResponse
    {
        ob_end_clean();

        header('Access-Control-Allow-Origin: *');
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename=' . basename($file));
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: ' . filesize($file));

        readfile($file);
        exit();
    }
}

