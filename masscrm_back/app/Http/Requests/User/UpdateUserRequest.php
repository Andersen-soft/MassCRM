<?php declare(strict_types=1);

namespace App\Http\Requests\User;

use App\Http\Requests\AbstractRequest;
use App\Models\User\User;
use App\Rules\SocialNetwork\RegexSkype;
use App\Rules\User\RegexLogin;
use App\Rules\User\RegexUsername;
use Illuminate\Support\Facades\Lang;

class UpdateUserRequest extends AbstractRequest
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
        return [
            'email' => 'required|unique:users,email,' . $this->user .'|email:filter|max:100',
            'login' => ['required', 'string', 'unique:users,login,' . $this->user, 'max:50', new RegexLogin],
            'name' => ['required', 'string', 'max:50', new RegexUsername],
            'surname' => ['required', 'string', 'max:50', new RegexUsername],
            'roles' => 'required|array',
            'roles.*' => 'string|in:' . implode(',', User::ROLES_USER),
            'active' => 'required|boolean',
            'skype' => ['required', 'string', 'unique:users,skype,' . $this->user, 'min:6', 'max:32', new RegexSkype],
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
