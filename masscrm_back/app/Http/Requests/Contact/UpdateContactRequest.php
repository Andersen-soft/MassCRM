<?php declare(strict_types=1);

namespace App\Http\Requests\Contact;

use App\Http\Requests\AbstractRequest;
use App\Models\Contact\Contact;
use App\Rules\Contact\CheckUniqueEmailContact;
use App\Rules\Contact\UniqueContactLinkedIn;
use App\Rules\Contact\UniqueContactSocialNetwork;
use App\Rules\DistinctRule;
use Illuminate\Support\Facades\Lang;

class UpdateContactRequest extends AbstractRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $gender = array_keys(Lang::get('filters.genders'));
        $origin = Lang::get('filters.origin');
        $countries = implode(',', self::GENDER_REQUIRED_FOR_COUNTRIES);

        return [
            'emails' => ['array', new DistinctRule()],
            'emails.*' => [
                'required',
                'email:filter',
                new CheckUniqueEmailContact((int) $this->contact)
            ],
            'phones' => 'nullable|array',
            'phones.*' => 'string|regex:'. static::REGEX_PHONE,
            'first_name' => 'string|max:50',
            'last_name' => 'string|max:50',
            'full_name' => 'nullable|string|max:150',
            'gender' =>
                'required_if:location.country,' . $countries . '|nullable|string|in:' . implode(',', $gender),
            'linkedin' => [
                'nullable',
                'string',
                'regex:' . static::REGEX_LINK_LINKEDIN,
                new UniqueContactLinkedIn((int) $this->contact)
            ],
            'requires_validation' => 'nullable|boolean',
            'location' => 'array',
            'location.country' => 'required_without:gender|string|max:50',
            'location.region' => 'nullable|string|max:150',
            'location.city' => 'nullable|string|max:50',
            'position' => 'string',
            'social_networks' => 'nullable|array',
            'social_networks.*' => ['string', 'url', new UniqueContactSocialNetwork((int) $this->contact)],
            'comment' => 'nullable|string',
            'company_id' => 'nullable|integer|exists:companies,id',
            'skype' => 'nullable|string|max:60',
            'origin' => 'array',
            'origin.*' => 'string|in:' . implode(',', $origin),
            'opens' => 'nullable|integer|min:0',
            'views' => 'nullable|integer|min:0',
            'deliveries' => 'nullable|integer|min:0',
            'replies' => 'nullable|integer|min:0',
            'bounces' => 'nullable|integer|min:0',
            'confidence' => 'nullable|integer|min:0',
            'service_id' => 'nullable|string',
            'last_touch' => 'nullable|date',
            'mailing_tool' => 'nullable|string|max:50',
            'added_to_mailing' => 'nullable|date',
            'responsible' => 'nullable|string|max:150',
            'birthday' => 'nullable|date',
            'note' => 'array',
            'note.*' => 'string'
        ];
    }

    public function messages(): array
    {
        return [
            'colleagues.*.link.unique' => Lang::get('validation.colleague_link_already_exist'),
            'gender.required_if' => Lang::get('validation.gender_required'),
            'social_networks.url' => Lang::get('validation.social_networks_link_invalid_format'),
        ];
    }
}
