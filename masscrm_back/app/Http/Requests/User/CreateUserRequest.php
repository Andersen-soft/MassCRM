<?php declare(strict_types=1);

namespace App\Http\Requests\User;

use App\Http\Requests\AbstractRequest;
use App\Repositories\User\UserRepository;
use App\Models\User\User;
use App\Rules\SocialNetwork\RegexSkype;
use App\Rules\User\RegexLogin;
use App\Rules\User\RegexUsername;
use Illuminate\Support\Facades\Lang;

class CreateUserRequest extends AbstractRequest
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
            'email' => 'required|unique:users,email|email:filter|max:100',
            'login' => ['required', 'string', 'unique:users,login', 'max:50', new RegexLogin],
            'name' => ['required', 'string', 'max:50', new RegexUsername],
            'surname' => ['required', 'string', 'max:50', new RegexUsername],
            'roles' => 'required|array',
            'roles.*' => 'required|string|in:' . implode(',', User::ROLES_USER),
            'active' => 'required|boolean',
            'skype' => ['required', 'string', 'unique:users,skype', 'min:6', 'max:32', new RegexSkype],
            'position' => 'nullable|string',
            'comment' => 'nullable|string',
            'fromActiveDirectory' => 'required|boolean'
        ];
    }

    public function messages(): array
    {
        $user = (new UserRepository())->fetchUserFromLogin($this->login);

        return [
            'login.unique' => ($user && $this->fromActiveDirectory)
                ? Lang::get('validation.login_already_exist', ['fio' => $user->getFullNameAttribute()])
                : Lang::get('validation.login_already_exist_form_AD'),
            'skype.unique' => Lang::get('validation.skype_already_exist'),
            'email.unique' => Lang::get('validation.email_already_exist')
        ];
    }
}
