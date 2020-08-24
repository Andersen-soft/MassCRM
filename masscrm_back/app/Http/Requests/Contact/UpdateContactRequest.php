<?php

namespace App\Http\Requests\Contact;

use App\Http\Requests\AbstractRequest;
use Illuminate\Support\Facades\Lang;

class UpdateContactRequest extends AbstractRequest
{
    private string $regexPhone = '/^[1-9+()-]+$/';
    private string $regexEmail = '/^[a-zA-Z0-9_.+-A-Яa-я]+@[a-zA-Z0-9-A-Яa-я]+\.[a-zA-Z0-9-.A-Яa-я]+$/';
    private string $regexLinkedIn= '/^https?:\/\/((www)\.)?linkedin.com/';

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
        return [
            'emails' => 'array',
            'emails.*' => 'required|string|regex:' . $this->regexEmail,
            'phones' => 'array',
            'phones.*' => 'string|regex:'. $this->regexPhone,
            'first_name' => 'string|max:50',
            'last_name' => 'string|max:50',
            'full_name' => 'nullable|string|max:150',
            'gender' => 'nullable|string|in:' . implode(',', $gender),
            'linkedin' => 'string|unique:contacts,linkedin,' . $this->contact . '|regex:' . $this->regexLinkedIn,
            'requires_validation' => 'boolean',
            'location' => 'array',
            'location.country' => 'string|max:50',
            'location.region' => 'nullable|string|max:150',
            'location.city' => 'nullable|string|max:50',
            'position' => 'string',
            'colleagues' => 'array',
            'colleagues.*.link' => 'required_with:colleagues|distinct|string|url',
            'colleagues.*.full_name' => 'required_with:colleagues|string',
            'colleagues.*.id' => 'integer|exists:contact_colleagues,id',
            'social_networks' => 'array',
            'social_networks.*' => 'string|url',
            'comment' => 'nullable|string',
            'company_id' => 'nullable|integer|exists:companies,id',
            'skype' => 'nullable|string|max:60',
            'origin' => 'string|max:50',
            'opens' => 'integer|min:0',
            'views' => 'integer|min:0',
            'deliveries' => 'integer|min:0',
            'replies' => 'integer|min:0',
            'bounces' => 'integer|min:0',
            'confidence' => 'integer|min:0',
            'service_id' => 'nullable|integer|min:1',
            'last_touch' => 'nullable|date',
            'mailing_tool' => 'nullable|string|max:50',
            'added_to_mailing' => 'nullable|date',
            'responsible' => 'nullable|string|max:150',
            'birthday' => 'nullable|date',
        ];
    }
}
