<?php declare(strict_types=1);

namespace App\RulesValidateModels\Contact;

use App\Http\Requests\AbstractRequest;
use App\Models\BaseModel;
use App\Models\Contact\Contact;
use App\Models\Contact\Fields\ContactFields;
use App\RulesValidateModels\RulesValidateInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Lang;

class RulesContact implements RulesValidateInterface
{
    public function rules(): array
    {
        return [];
    }

    public function rulesCreate(): array
    {
        $gender = array_keys(Lang::get('filters.genders'));
        $countries = implode(',', AbstractRequest::GENDER_REQUIRED_FOR_COUNTRIES);

        return [
            'first_name' => 'string|max:50',
            'last_name' => 'string|max:50',
            'full_name' => 'nullable|string|max:150',
            'gender' => 'required_if:country,' . $countries . '|nullable|string|in:' . implode(',', $gender),
            'linkedin' => 'nullable|string|unique:contacts,linkedin|regex:' . AbstractRequest::REGEX_LINK_LINKEDIN,
            'country' => 'nullable|string|max:50',
            'region' => 'nullable|string|max:150',
            'city' => 'nullable|string|max:50',
            'position' => 'nullable|string',
            'comment' => 'nullable|string',
            'company_id' => 'nullable|integer|exists:companies,id',
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
            'responsible_id' => 'integer|exists:users,id',
            'birthday' => 'nullable|string|date',
            'origin' => 'nullable|string',
        ];
    }

    public function rulesUpdate(BaseModel $contact): array
    {
        $gender = array_keys(Lang::get('filters.genders'));

        return [
            'first_name' => 'string|max:50',
            'last_name' => 'string|max:50',
            'full_name' => 'nullable|string|max:150',
            'gender' => 'nullable|string|in:' . implode(',', $gender),
            'linkedin' =>
                'nullable|string|unique:contacts,linkedin,' . $contact->id . '|regex:' . AbstractRequest::REGEX_LINK_LINKEDIN,
            'country' => 'nullable|string|max:50',
            'region' => 'nullable|string|max:150',
            'city' => 'nullable|string|max:50',
            'position' => 'nullable|string',
            'comment' => 'nullable|string',
            'company_id' => 'nullable|integer|exists:companies,id',
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
            'responsible_id' => 'integer|exists:users,id',
            'birthday' => 'nullable|string|date',
            'origin' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'linkedin.unique' => Lang::get('validationModel.contact.contact_linkedIn_already_exist'),
            'linkedin.regex' => Lang::get('validationModel.contact.contact_linkedIn_regex'),
            'service_id.int' => Lang::get('validationModel.contact.service_id_integer'),
            'last_touch.date' => Lang::get('validationModel.contact.last_touch_date_invalid'),
            'added_to_mailing.date' => Lang::get('validationModel.contact.added_to_mailing_date_invalid'),
        ];
    }
}
