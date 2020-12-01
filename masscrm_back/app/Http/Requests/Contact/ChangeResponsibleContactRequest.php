<?php declare(strict_types=1);

namespace App\Http\Requests\Contact;

use App\Http\Requests\AbstractRequest;
use App\Rules\Contact\CheckUniqueEmailContact;
use App\Rules\DistinctRule;
use Illuminate\Support\Facades\Lang;

class ChangeResponsibleContactRequest extends AbstractRequest
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
        $responsibleRules = [
            'search' => 'array|required_without:ids',
            'responsibleId' => 'required|exists:users,id',
            'ids' => 'array|required_without:search',
            'ids.*' => 'exists:contacts,id',
        ];

        return array_merge($responsibleRules, $this->getSearchValidationRules());
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
