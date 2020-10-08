<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\BaseController;
use App\Services\Reports\ReportFileService;
use App\Http\Requests\Report\ReportRequest;
use App\Exceptions\Report\ReportException;
use Illuminate\Http\JsonResponse;

class ReportController extends BaseController
{
    public function __construct()
    {
        $this->middleware('permission:downloadReport', ['only' => ['download']]);
    }

    /**
     * @OA\Post(
     *    path="/contact/reports/download",
     *    tags={"Report"},
     *    security={{"bearerAuth":{}}},
     *    @OA\RequestBody(
     *      required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="typeFile", type="string", description="Type file"),
     *                 @OA\Property(property="limit", type="integer", description="Limit record"),
     *                 @OA\Property(property="listField", type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 @OA\Property(property="sort", type="object",
     *                    @OA\Property(property="fieldName", type="company_size"),
     *                    @OA\Property(property="typeSort", type="ASC"),
     *                 ),
     *                 @OA\Property(property="search", type="object",
     *                     @OA\Property(property="responsible"),
     *                     @OA\Property(property="created", type="object",
     *                         @OA\Property(property="min", type="date", format="Y-m-d"),
     *                         @OA\Property(property="max", type="date", format="Y-m-d"),
     *                     ),
     *                     @OA\Property(property="updated", type="object",
     *                         @OA\Property(property="min", type="date", format="Y-m-d"),
     *                         @OA\Property(property="max", type="date", format="Y-m-d"),
     *                     ),
     *                     @OA\Property(property="first_name", type="string"),
     *                     @OA\Property(property="last_name", type="string"),
     *                     @OA\Property(property="full_name", type="string"),
     *                     @OA\Property(property="gender", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(
     *                         property="birthday",
     *                         type="object",
     *                         @OA\Property(property="min", type="date", format="m-d"),
     *                         @OA\Property(property="max", type="date", format="m-d"),
     *                     ),
     *                     @OA\Property(property="country", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="city", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="region", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="location", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="position", type="string"),
     *                     @OA\Property(property="linkedin", type="string"),
     *                     @OA\Property(property="social_networks", type="string"),
     *                     @OA\Property(property="phones", type="string"),
     *                     @OA\Property(property="skype", type="string"),
     *                     @OA\Property(property="emails", type="string"),
     *                     @OA\Property(property="origin", type="array",
     *                         @OA\Items( type="string")
     *                     ),
     *                     @OA\Property(property="requires_validation", type="array",
     *                         @OA\Items(type="boolean")
     *                     ),
     *                     @OA\Property(property="colleagues", type="string"),
     *                     @OA\Property(property="colleagues_link", type="string"),
     *                     @OA\Property(property="mailing_tool", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="service_id", type="integer"),
     *                     @OA\Property(property="added_to_mailing", type="object",
     *                         @OA\Property(property="min", type="date", format="Y-m-d"),
     *                         @OA\Property(property="max", type="date", format="Y-m-d"),
     *                     ),
     *                     @OA\Property(property="confidence", type="object",
     *                         @OA\Property(property="min", type="integer"),
     *                         @OA\Property(property="max", type="integer"),
     *                     ),
     *                     @OA\Property(property="last_touch", type="object",
     *                         @OA\Property(property="min", type="date", format="Y-m-d"),
     *                         @OA\Property(property="max", type="date", format="Y-m-d"),
     *                     ),
     *                     @OA\Property(property="sequence", type="string"),
     *                     @OA\Property(property="status", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="opens", type="object",
     *                         @OA\Property(property="min", type="integer"),
     *                         @OA\Property(property="max", type="integer"),
     *                     ),
     *                     @OA\Property(property="views", type="object",
     *                         @OA\Property(property="min", type="integer"),
     *                         @OA\Property(property="max", type="integer"),
     *                     ),
     *                     @OA\Property(property="deliveries", type="object",
     *                         @OA\Property(property="min", type="integer"),
     *                         @OA\Property(property="max", type="integer"),
     *                     ),
     *                     @OA\Property(property="replies", type="object",
     *                         @OA\Property(property="min", type="integer"),
     *                         @OA\Property(property="max", type="integer"),
     *                     ),
     *                     @OA\Property(property="bounces", type="integer"),
     *                     @OA\Property(property="mails", type="string"),
     *                     @OA\Property(property="my_notes", type="string"),
     *                     @OA\Property(property="sale_created", type="object",
     *                         @OA\Property(property="min", type="date", format="Y-m-d"),
     *                         @OA\Property(property="max", type="date", format="Y-m-d"),
     *                     ),
     *                     @OA\Property(property="source", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="sale_link", type="string"),
     *                     @OA\Property(property="sale_status", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="sale_project_c1", type="array",
     *                         @OA\Items(type="boolean")
     *                     ),
     *                     @OA\Property(property="company", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="company_website", type="string"),
     *                     @OA\Property(property="company_linkedin", type="string"),
     *                     @OA\Property(property="company_cto", type="string"),
     *                     @OA\Property(property="company_industries", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="company_size", type="object",
     *                         @OA\Property(property="min", type="integer"),
     *                         @OA\Property(property="max", type="integer"),
     *                     ),
     *                     @OA\Property(property="company_type", type="array",
     *                         @OA\Items(type="string", enum={"Subsidiary", "Holding"})
     *                     ),
     *                     @OA\Property(property="company_subsidiary", type="string"),
     *                     @OA\Property(property="company_holding", type="string"),
     *                     @OA\Property(property="company_founded", type="object",
     *                         @OA\Property(property="min", type="date", format="Y-m-d"),
     *                         @OA\Property(property="max", type="date", format="Y-m-d"),
     *                     ),
     *                     @OA\Property(property="jobs", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="jobs_skills", type="array",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="comment", type="string")
     *                 ),
     *                 example={
     *                    "typeFile": "csv",
     *                    "limit": 200,
     *                    "listField": {
     *                      "responsible", "created", "updated", "first_name", "last_name", "full_name", "gender",
     *                      "birthday", "country", "city", "region", "location", "position", "linkedin",
     *                      "social_networks", "phones", "skype", "emails", "origin", "requires_validation",
     *                      "colleagues", "colleagues_link", "mailing_tool", "id", "added_to_mailing", "confidence",
     *                      "last_touch", "sequence", "status", "opens", "views", "deliveries", "replies", "bounces",
     *                      "mails", "my_notes", "sale_created", "source", "sale_link", "sale_status",
     *                      "sale_project_c1","company", "company_website", "company_linkedin", "company_cto",
     *                      "company_industries", "company_size", "company_type","company_subsidiary",
     *                      "company_holding", "company_founded", "jobs", "jobs_skills", "comment"
     *                    },
     *                    "sort": {
     *                        "fieldName": "company_size",
     *                        "typeSort": "ASC"
     *                    },
     *                    "search": {
     *                        "responsible": {"Katsiaryna", "Igor", "Irina"},
     *                        "created": {"min": "2014-02-25","max": "2020-06-25"},
     *                        "updated": {"min": "2020-02-25", "max": "2020-06-25" },
     *                        "first_name": "Annemarie",
     *                        "last_name": "Keizer",
     *                        "full_name": "Tenders",
     *                        "gender": {"female","Male"},
     *                        "birthday": {"min": "02-30", "max": "06-25"},
     *                        "country": {"russia","spain"},
     *                        "city": {"Minsk", "London"},
     *                        "region": {"East of England", "East Midlands"},
     *                        "location": {"Reply", "Paris"},
     *                        "position": "Product Owner",
     *                        "linkedin": "https://www.linkedin.com/in/andreaspantelis",
     *                        "social_networks": "https://www.linkedin.com/company/22891",
     *                        "phones": "8014716023",
     *                        "skype": "napoleon02121804",
     *                        "emails": "robert.naess@nordea.com",
     *                        "origin": {"Kiev", "Paris"},
     *                        "requires_validation": {true, false},
     *                        "colleagues": "Christopher",
     *                        "colleagues_link": "https://www.linkedin.com/in/brigitte-buntinx-b2a12313",
     *                        "mailing_tool": {"Reply", "Google"},
     *                        "service_id": 2588525,
     *                        "added_to_mailing": {"min": "2020-02-25", "max": "2020-06-25"},
     *                        "confidence": {"min": 25, "max": 50},
     *                        "last_touch": {"min": "2020-02-25", "max": "2020-06-25"},
     *                        "sequence": "sequence",
     *                        "status": {"Active", "Finished"},
     *                        "opens": {"min": 25, "max": 50},
     *                        "views": {"min": 25,"max": 50},
     *                        "deliveries": {"min": 25, "max": 50},
     *                        "replies": {"min": 25,"max": 50},
     *                        "bounces": 500,
     *                        "mails": "webers@handwick.com",
     *                        "my_notes": "myNotes test text",
     *                        "sale_created": {"min": "2020-02-25","max": "2020-06-25"},
     *                        "source": {"Testing", "Stoped"},
     *                        "sale_link": "http://www.oocllogistics.com",
     *                        "sale_status": {"Testing","Stoped"},
     *                        "sale_project_c1":{true,false},
     *                        "company": {"Rodenstock"},
     *                        "company_website": "http://www.walvisnest.nl",
     *                        "company_linkedin": "https://www.linkedin.com/company/28619843",
     *                        "company_cto": "Angelas",
     *                        "company_industries": {"Machinery", "Plastics"},
     *                        "company_size": {"min": 25, "max": 500},
     *                        "company_type": {"Subsidiary", "Holding"},
     *                        "company_subsidiary": "Rodenstock",
     *                        "company_holding": "Eurowings",
     *                        "company_founded": {"min": "2016-05-30", "max": "2020-06-25"},
     *                        "jobs": {"Program Testing", "Install docker"},
     *                        "jobs_skills": {"Angular", "Solid"},
     *                        "comment": "create new application"
     *                    },
     *                }
     *             )
     *         )
     *     ),
     *    @OA\Response(
     *        response="200",
     *        description="Generate file report"
     *    ),
     *    @OA\Response(
     *        response="400",
     *        description="Error: Bad Request",
     *        @OA\JsonContent(
     *            @OA\Property(property="success", type="boolean", example=false),
     *            @OA\Property(property="payload", type="object",
     *                @OA\Property(property="errors", type="object"),
     *            )
     *        )
     *    )
     * )
     * @throws ReportException
     */
    public function download(ReportRequest $request, ReportFileService $reportFileService) : JsonResponse
    {
        $reportFileService->initExport(
            $request->post('listField', []),
            $request->post('search', []),
            $request->post('sort', []),
            $request->post('typeFile', 'csv'),
            $request->user(),
            $request->post('isInWork', false),
        );

        return $this->success([]);
    }
}
