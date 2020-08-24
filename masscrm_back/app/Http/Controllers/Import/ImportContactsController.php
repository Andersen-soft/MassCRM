<?php

namespace App\Http\Controllers\Import;

use App\Commands\Import\ImportContactsCommand;
use App\Commands\Import\ImportStartParseCommand;
use App\Http\Controllers\Controller;
use App\Http\Requests\Import\ImportLoadingFileRequest;
use App\Http\Requests\Import\ImportStartParsingRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\Process\ProcessService;

class ImportContactsController extends Controller
{
    /**
     * @OA\Post(
     *      path="/import/upload-file/",
     *      tags={"Import"},
     *      description="Upload file for import contact",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                  required={"file"},
     *                  @OA\Property(property="file", type="file"),
     *             ),
     *         ),
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object",
     *                  @OA\Property(property="file_size", type="string", example="6.2 kb"),
     *                  @OA\Property(property="data", type="object",
     *                      @OA\Property(property="headers", type="array",
     *                          @OA\Items(type="string", example="First Name")
     *                      ),
     *                      @OA\Property(property="rows", type="array",
     *                          @OA\Items(type="array",
     *                              @OA\Items(type="string", example="Bendikt"),
     *                          )
     *                      )
     *                  ),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function uploadFile(ImportLoadingFileRequest $request)
    {
        return $this->response(
            $this->dispatchNow(
                new ImportContactsCommand(
                    $request->file('file'),
                    Auth::user(),
                )
            )
        );
    }

    /**
     * @OA\Post(
     *      path="/import/start-parse/",
     *      tags={"Import"},
     *      description="Configurate and start parsing process",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"fields", "responsible", "is_headers", "duplication_action"},
     *                 @OA\Property(property="fields", type="array",
     *                     @OA\Items(type="string", enum={
     *                          "first_name", "last_name", "email", "company", "phone", "city", "region", "country",
     *                          "c_linkedin", "comp_linkedin", "position", "website", "industry", "comp_size",
     *                          "confidence", "c_comment", "comp_comment", "service_id", "added_to_mailing",
     *                          "sequence", "status", "opens", "views", "deliveries", "replies", "bounces", "skip"
     *                     })
     *                 ),
     *                 @OA\Property(property="origin", type="array",
     *                    @OA\Items(type="string",enum={
     *                        "NC1", "NC2", "Parser", "Purchase", "Legasy", "Reply", "Lemlist"
     *                    })
     *                 ),
     *                 @OA\Property(property="comment", type="string"),
     *                 @OA\Property(property="responsible", type="number"),
     *                 @OA\Property(property="column_separator", type="string", enum={
     *                     "semicolon", "comma", "space", "tab"
     *                 }),
     *                 @OA\Property(property="is_headers", type="boolean", enum={
     *                     1, 0, true, false
     *                 }),
     *                 @OA\Property(property="duplication_action", type="string", enum={
     *                     "replace", "merge", "skip"
     *                 }),
     *                 example={
     *                    "fields": {"first_name", "last_name", "email"},
     *                    "origin": {"Reply", "Lemlist"},
     *                    "comment": "Is good worker",
     *                    "responsible": 3,
     *                    "column_separator": "semicolon",
     *                    "is_headers": 1,
     *                    "duplication_action": "replace"
     *                }
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object"),
     *          )
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function startParse(ImportStartParsingRequest $request)
    {
        return $this->response(
            $this->dispatchNow(
                new ImportStartParseCommand(
                    Auth::user(),
                    $request->get('fields'),
                    $request->get('origin', []),
                    $request->get('responsible'),
                    $request->get('is_headers'),
                    $request->get('duplication_action'),
                    $request->get('column_separator'),
                    $request->get('comment')
                )
            ) ?? []
        );
    }

    /**
     * @OA\GET(
     *     path="/import/status",
     *     tags={"Import"},
     *     description="Fetch there is processes import from user",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *                 @OA\Property(property="payload", type="object",
     *                     required={"count"},
     *                     @OA\Property(property="process", type="boolean", example="true"),
     *                )
     *         )
     *     ),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function getStatus(Request $request, ProcessService $processService): JsonResponse
    {
        return $this->response([
            'process' => $processService->isProcessImport($request->user())
        ]);
    }
}
