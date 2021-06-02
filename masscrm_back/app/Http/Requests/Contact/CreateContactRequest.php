<?php declare(strict_types=1);

namespace App\Http\Requests\Contact;

use App\Http\Requests\AbstractRequest;
use App\Rules\Contact\CheckUniqueEmailContact;
use App\Rules\Contact\UniqueContactLinkedIn;
use App\Rules\Contact\UniqueContactSocialNetwork;
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
            'emails.*' => ['required', 'email:filter', new CheckUniqueEmailContact()],
            'phones' => 'array',
            'phones.*' => 'string|regex:'. static::REGEX_PHONE,
            'first_name' => 'string|max:50',
            'last_name' => 'string|max:50',
            'full_name' => 'nullable|string|max:150',
            'gender' => 'required_if:location.country,' . $countries . '|nullable|string|in:' . implode(',', $gender),
            'linkedin' => [
                'nullable',
                'string' ,
                'regex:' . static::REGEX_LINK_LINKEDIN,
                new UniqueContactLinkedIn()
            ],
            'requires_validation' => 'boolean',
            'location' => 'array',
            'location.country' => 'string|max:50',
            'location.region' => 'nullable|string|max:150',
            'location.city' => 'nullable|string|max:50',
            'position' => 'required|string',
            'social_networks' => ['array', new DistinctRule()],
            'social_networks.*' => ['string', 'url', new UniqueContactSocialNetwork()],
            'comment' => 'nullable|string',
            'company_id' => 'required|integer|exists:companies,id',
            'opens' => 'nullable|integer|min:0',
            'views' => 'nullable|integer|min:0',
            'deliveries' => 'nullable|integer|min:0',
            'replies' => 'nullable|integer|min:0',
            'bounces' => 'nullable|integer|min:0',
            'confidence' => 'nullable|integer|min:0',
            'service_id' => 'nullable|string',
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
            'social_networks.url' => Lang::get('validation.social_networks_link_invalid_format'),
            'gender.required_if' => Lang::get('validation.gender_required'),
        ];
    }
}
