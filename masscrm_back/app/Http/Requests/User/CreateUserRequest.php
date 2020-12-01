<?php declare(strict_types=1);

namespace App\Http\Requests\User;

use App\Http\Requests\AbstractRequest;
use App\Repositories\User\UserRepository;
use App\Models\User\User;
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
            'email' => 'required|unique:users,email|email:filter',
            'login' => 'required|string|min:1|unique:users,login',
            'name' => 'required|string|max:50',
            'surname' => 'required|string|max:50',
            'roles' => 'required|array',
            'roles.*' => 'required|string|in:' . implode(',', User::ROLES_USER),
            'active' => 'required|boolean',
            'skype' => 'required|string|unique:users,skype',
            'position' => 'string',
            'comment' => 'string',
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
