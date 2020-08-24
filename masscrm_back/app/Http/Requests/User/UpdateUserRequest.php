<?php

namespace App\Http\Requests\User;

use App\Http\Requests\AbstractRequest;
use App\Models\User\User;
use Illuminate\Support\Facades\Lang;

class UpdateUserRequest extends AbstractRequest
{
    private string $regexEmail = '/^[a-zA-Z0-9_.+-A-Яa-я]+@[a-zA-Z0-9-A-Яa-я]+\.[a-zA-Z0-9-.A-Яa-я]+$/';

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
        return [
            'email' => 'required|unique:users,email,' . $this->user .'|regex:' . $this->regexEmail,
            'login' => 'required|string|unique:users,login,' . $this->user,
            'name' => 'required|string|max:50',
            'surname' => 'required|string|max:50',
            'roles' => 'required|array',
            'roles.*' => 'string|in:' . implode(',', User::ROLES_USER),
            'active' => 'required|boolean',
            'skype' => 'required|string|unique:users,skype,' . $this->user,
            'position' => 'string',
            'comment' => 'string'
        ];
    }

    public function messages(): array
    {
        return [
            'login.unique' => Lang::get('validation.login_already_exist_form_AD'),
            'skype.unique' => Lang::get('validation.skype_already_exist'),
            'email.unique' => Lang::get('validation.email_already_exist')
        ];
    }
}
