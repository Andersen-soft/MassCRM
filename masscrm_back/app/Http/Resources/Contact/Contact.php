<?php

namespace App\Http\Resources\Contact;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Company\Company;

class Contact extends JsonResource
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
        return [
            'id' => $this->id,
            'company_id' => $this->company_id,
            'responsible' => $this->responsible,
            'created_at' => $this->created_at->format(self::DATE_TIME_FORMAT),
            'updated_at' => $this->updated_at->format(self::DATE_TIME_FORMAT),
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'gender' => $this->gender,
            'birthday' => $this->birthday ? $this->birthday->format(self::DATE_FORMAT) : $this->birthday,
            'location' => [
                'country' => $this->country,
                'city' => $this->city,
                'region' => $this->region,
            ],
            'position' => $this->position,
            'linkedin' => $this->linkedin,
            'skype' => $this->skype,
            'last_touch' => $this->last_touch ? $this->last_touch->format(self::DATE_TIME_FORMAT) : $this->last_touch,
            'added_to_mailing' => $this->added_to_mailing
                ? $this->added_to_mailing->format(self::DATE_TIME_FORMAT)
                : $this->added_to_mailing,
            'mailing_tool' => $this->mailing_tool,
            'origin' => $this->origin ? explode(';', $this->origin) : [],
            'opens' => $this->opens,
            'views' => $this->views,
            'deliveries' => $this->deliveries,
            'replies' => $this->replies,
            'bounces' => $this->bounces,
            'confidence' => $this->confidence,
            'service_id' => $this->service_id,
            'comment' => $this->comment,
            'in_blacklist' => $this->in_blacklist,
            'emails' => $this->email_collection,
            'phones' => $this->phone_collection,
            'social_networks' => $this->social_network_collection,
            'colleagues' => Colleague::collection($this->contactColleagues),
            'sequences' => $this->sequence_collection,
            'mails' => $this->mail_collection,
            'note' => $this->note_collection,
            'sales' => $this->sale_collection,
            'company' => !empty($this->company) ? new Company($this->company) : [],
            'is_in_work' => $this->is_in_work,
            'date_of_use' => $this->date_of_use
        ];
    }
}
