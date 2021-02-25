<?php declare(strict_types=1);

namespace App\Http\Resources\Company;

use App\Http\Resources\Contact\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Company\Company as CompanyModel;

class Company extends JsonResource
{
    private const DATE_TIME_FORMAT = 'd.m.Y H:i';
    private const DATE_FORMAT = 'd.m.Y';

    /**
     * @OA\Schema(
     *    schema="Company",
     *    required={"id", "created_at", "updated_at", "name", "website", "linkedin", "sto_full_name", "type",
     *        "founded", "min_employees", "max_employees"
     *    },
     *    @OA\Property(property="id", type="integer", example=123),
     *    @OA\Property(property="created_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *    @OA\Property(property="updated_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *    @OA\Property(property="name", type="string", example="name"),
     *    @OA\Property(property="website", type="string", example="http://www.walvisnest.nl"),
     *    @OA\Property(property="linkedin", type="string", example="https://www.linkedin.com/company/22891"),
     *    @OA\Property(property="sto_full_name", type="string", example="Angelas"),
     *    @OA\Property(property="type", type="string", example="Subsidiary"),
     *    @OA\Property(property="min_employees", type="integer", example=1),
     *    @OA\Property(property="max_employees", type="integer", example=50),
     *    @OA\Property(property="founded", type="string", format="d.m.Y", example="18.06.2020"),
     *    @OA\Property(property="comment", type="string", example="Is good company"),
     *    @OA\Property(property="industries", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "name"},
     *            @OA\Property(property="name", type="string", example="Machinery"),
     *            @OA\Property(property="id", type="integer", example=123),
     *        ),
     *    ),
     *    @OA\Property(property="vacancies", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "job", "skills", "link"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="job", type="string", example="Install docker"),
     *            @OA\Property(property="skills", type="string", example="Solid"),
     *            @OA\Property(property="link", type="string", example="https://jobs.tut.by"),
     *        ),
     *    ),
     *    @OA\Property(property="subsidiary", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "name"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="name", type="string", example="Name"),
     *        ),
     *    ),
     *    @OA\Property(property="holding", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "name"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="name", type="string", example="Name"),
     *        ),
     *    ),
     * )
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        $data = [
            'id' => $this->id,
            'created_at' => $this->created_at->format(self::DATE_TIME_FORMAT),
            'updated_at' => $this->updated_at->format(self::DATE_TIME_FORMAT),
            'name' => $this->name,
            'website' => $this->website,
            'linkedin' => $this->linkedin,
            'sto_full_name' => $this->sto_full_name,
            'type' => $this->type,
            'founded' => $this->founded ? $this->founded->format(self::DATE_FORMAT) : $this->founded,
            'min_employees' => $this->min_employees,
            'max_employees' => $this->max_employees,
            'comment' => $this->comment,
            'industries' => $this->industries_collection,
            'vacancies' => $this->vacancies_collection,
            'contacts' => Contact::collection($this->whenLoaded('contacts')),
        ];

        $type = $this->type === CompanyModel::TYPE_COMPANY_SUBSIDIARY ? 'holding' : 'subsidiary';
        $data[$type] = SubsidiaryCompany::collection($this->companySubsidiary);

        return $data;
    }
}
