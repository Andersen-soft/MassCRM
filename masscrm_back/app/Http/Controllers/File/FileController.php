<?php

namespace App\Http\Controllers\File;

use App\Http\Controllers\BaseController;
use App\Http\Requests\File\FileRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FileController extends BaseController
{
    public function getFile(FileRequest $request): BinaryFileResponse
    {
        return response()->download($request->get('name'));
    }
}