<?php

namespace App\Http\Resources\Company;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Company\Company as CompanyModel;

class Company extends JsonResource
{
    private const DATE_TIME_FORMAT = 'd.m.Y H:i';
    private const DATE_FORMAT = 'd.m.Y';

    /**
     * Transform the resource into an array.
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
            'vacancies' => $this->vacancies_collection
        ];

        $type = $this->type === CompanyModel::TYPE_COMPANY_SUBSIDIARY ? 'holding' : 'subsidiary';
        $data[$type] = SubsidiaryCompany::collection($this->companySubsidiary);

        return $data;
    }
}
