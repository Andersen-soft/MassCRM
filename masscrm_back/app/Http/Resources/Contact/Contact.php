<?php declare(strict_types=1);

namespace App\Http\Resources\Contact;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Company\Company;

class Contact extends JsonResource
{
    private const DATE_TIME_FORMAT = 'd.m.Y H:i';
    private const DATE_FORMAT = 'd.m.Y';

    /**
     * @OA\Schema(
     *     schema="Contact",
     *     required={
     *         "id", "company_id", "responsible", "created_at", "first_name", "last_name", "full_name",
     *         "gender", "birthday", "location", "position", "linkedin", "skype", "last_touch", "added_to_mailing",
     *         "mailing_tool", "origin", "opens", "views", "deliveries", "replies", "bounces", "confidence",
     *         "service_id", "emails", "in_blacklist"
     *     },
     *     @OA\Property(property="id", type="integer", example=123),
     *     @OA\Property(property="company_id", type="integer", example=123),
     *     @OA\Property(property="responsible", type="string", example="Mr. Test"),
     *     @OA\Property(property="created_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *     @OA\Property(property="updated_at", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *     @OA\Property(property="first_name", type="string", example="first"),
     *     @OA\Property(property="last_name", type="string", example="last"),
     *     @OA\Property(property="full_name", type="string", example="full"),
     *     @OA\Property(property="gender", type="string", example={"m", "f"}),
     *     @OA\Property(property="birthday", type="string", format="d.m.Y", example="18.06.2020"),
     *     @OA\Property(property="location", type="object",
     *         @OA\Property(property="country", type="string", example="Belarus"),
     *         @OA\Property(property="region", type="string", example="Vitebsk"),
     *         @OA\Property(property="city", type="string", example="Polotsk"),
     *     ),
     *     @OA\Property(property="position", type="string", example="DevOps"),
     *     @OA\Property(property="linkedin", type="string", example="http://test.com/122"),
     *     @OA\Property(property="skype", type="string", example="deev"),
     *     @OA\Property(property="last_touch", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *     @OA\Property(property="added_to_mailing", type="string", format="d.m.Y H:i", example="18.06.2020 13:15:00"),
     *     @OA\Property(property="mailing_tool", type="string", example="replay"),
     *     @OA\Property(property="origin", type="string", example=""),
     *     @OA\Property(property="opens", type="integer", example=0),
     *     @OA\Property(property="views", type="integer", example=0),
     *     @OA\Property(property="deliveries", type="integer", example=0),
     *     @OA\Property(property="replies", type="integer", example=0),
     *     @OA\Property(property="bounces", type="integer", example=0),
     *     @OA\Property(property="confidence", type="integer", example=99),
     *     @OA\Property(property="service_id", type="string", example="1233654"),
     *     @OA\Property(property="comment", type="string", example="good worker"),
     *     @OA\Property(property="in_blacklist", type="boolean", example=false),
     *     @OA\Property(property="emails", type="array",
     *         @OA\Items(type="object",
     *             required={"id", "email","verification"},
     *             @OA\Property(property="email", type="string", example="test1@test.com"),
     *             @OA\Property(property="id", type="integer", example=123),
     *             @OA\Property(property="verification", type="boolean", example="true"),
     *        ),
     *     ),
     *     @OA\Property(property="social_networks", type="array",
     *         @OA\Items(type="object",
     *             required={"id", "link"},
     *             @OA\Property(property="id", type="integer", example=123),
     *             @OA\Property(property="link", type="string", example="http://test.com/12234"),
     *        ),
     *     ),
     *     @OA\Property(property="colleagues", type="array",
     *         @OA\Items(type="object",
     *            required={"id", "link", "full_name"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="link", type="string", example="http://test.com/12234"),
     *            @OA\Property(property="full_name", type="string", example="Test Full Name"),
     *        ),
     *    ),
     *    @OA\Property(property="phones", type="array",
     *         @OA\Items(type="object",
     *             required={"id", "phone"},
     *             @OA\Property(property="id", type="integer", example=123),
     *             @OA\Property(property="phone", type="string", example="375295553322"),
     *         ),
     *    ),
     *    @OA\Property(property="sequences", type="array",
     *         @OA\Items(type="object",
     *             required={"id", "sequence", "status"},
     *             @OA\Property(property="id", type="integer", example=123),
     *             @OA\Property(property="sequence", type="string", example="text"),
     *             @OA\Property(property="status", type="string", example="Actived"),
     *         ),
     *    ),
     *    @OA\Property(property="mail", type="array",
     *        @OA\Items(type="object",
     *            required={"id", "message"},
     *            @OA\Property(property="id", type="integer", example=123),
     *            @OA\Property(property="message", type="string", example="text"),
     *        ),
     *    ),
     *    @OA\Property(property="notes", type="array",
     *         @OA\Items(type="object",
     *             required={"id", "message"},
     *             @OA\Property(property="id", type="integer", example=123),
     *             @OA\Property(property="message", type="string", example="text"),
     *         ),
     *    ),
     *    @OA\Property(property="sales", type="array",
     *         @OA\Items(type="object",
     *             required={"id", "created_at", "link", "project_c1", "status", "source"},
     *             @OA\Property(property="id", type="integer", example=123),
     *             @OA\Property(
     *                  property="created_at",
     *                  type="string",
     *                  format="d.m.Y H:i",
     *                  example="18.06.2020 13:15:00"
     *             ),
     *             @OA\Property(property="link", type="string", example="http://test.com/12234"),
     *             @OA\Property(property="project_c1", type="boolean", example="true"),
     *             @OA\Property(property="status", type="string", example="text"),
     *             @OA\Property(property="source", type="string", example="text"),
     *         ),
     *    ),
     *    @OA\Property(property="company", type="object", ref="#/components/schemas/Company"),
     * )
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'company_id' => $this->company_id,
            'responsible' => $this->getResponsibleUser(),
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
            'sequences' => $this->sequence_collection,
            'mails' => $this->mail_collection,
            'note' => $this->note_collection,
            'sales' => $this->sale_collection,
            'company' =>  (new Company($this->whenLoaded('company'))),
            'is_in_work' => $this->is_in_work,
            'date_of_use' => $this->date_of_use ? $this->date_of_use->format(self::DATE_TIME_FORMAT) : $this->date_of_use
        ];
    }
}
