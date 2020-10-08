<?php

namespace App\Http\Requests\Contact;

use App\Http\Requests\AbstractRequest;
use App\Rules\Contact\CheckUniqueEmailContact;
use App\Rules\DistinctRule;
use Illuminate\Support\Facades\Lang;

class CreateContactRequest extends AbstractRequest
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
            'emails' => ['required', 'array', new DistinctRule()],
            'emails.*' => ['required', 'regex:' . static::REGEX_EMAIL, new CheckUniqueEmailContact()],
            'phones' => 'array',
            'phones.*' => 'string|regex:'. static::REGEX_PHONE,
            'first_name' => 'string|max:50',
            'last_name' => 'string|max:50',
            'full_name' => 'nullable|string|max:150',
            'gender' => 'required_if:location.country,' . $countries . '|nullable|string|in:' . implode(',', $gender),
            'linkedin' => 'nullable|string|unique:contacts,linkedin|regex:' . static::REGEX_LINK_LINKEDIN,
            'requires_validation' => 'boolean',
            'location' => 'array',
            'location.country' => 'string|max:50',
            'location.region' => 'nullable|string|max:150',
            'location.city' => 'nullable|string|max:50',
            'position' => 'string',
            'colleagues' => 'array',
            'colleagues.*.link' => 'required_with:colleagues|url|distinct|string|unique:contact_colleagues,link',
            'colleagues.*.full_name' => 'required_with:colleagues|string',
            'social_networks' => 'array',
            'social_networks.*' => 'string|url|unique:contact_social_networks,link',
            'comment' => 'nullable|string',
            'company_id' => 'nullable|integer|exists:companies,id',
            'opens' => 'nullable|integer|min:0',
            'views' => 'nullable|integer|min:0',
            'deliveries' => 'nullable|integer|min:0',
            'replies' => 'nullable|integer|min:0',
            'bounces' => 'nullable|integer|min:0',
            'confidence' => 'nullable|integer|min:0',
            'service_id' => 'nullable|integer|min:1',
            'skype' => 'nullable|string|max:60',
            'last_touch' => 'nullable|date',
            'mailing_tool' => 'nullable|string|max:50',
            'added_to_mailing' => 'nullable|date',
            'responsible' => 'nullable|string|max:150',
            'birthday' => 'nullable|string|date',
            'origin' => 'array',
            'origin.*' => 'string|in:' . implode(',', $origin),
        ];
    }

    public function messages(): array
    {
        return [
            'colleagues.*.link.unique' => Lang::get('validation.colleague_link_already_exist'),
            'social_networks.unique' => Lang::get('validation.social_networks_link_already_exist'),
            'social_networks.url' => Lang::get('validation.social_networks_link_invalid_format'),
            'gender.required_if' => Lang::get('validation.gender_required'),
        ];
    }
}
