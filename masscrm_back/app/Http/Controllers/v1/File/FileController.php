<?php declare(strict_types=1);

namespace App\Http\Controllers\v1\File;

use App\Http\Controllers\BaseController;
use App\Http\Requests\File\FileRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FileController extends BaseController
{
    /**
     * @OA\Get(
     *      path="/file",
     *      tags={"File"},
     *      description="Get file errors from import",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(name="name", in="query", required=true,
     *        @OA\Schema(type="string", example="/var/www/storage")
     *      ),
     *      @OA\Response(
     *        response="200",
     *        description="File errors from import"
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401")
     * )
     */
    public function getFile(FileRequest $request): BinaryFileResponse
    {
        return response()->download($request->get('name'));
    }
}
