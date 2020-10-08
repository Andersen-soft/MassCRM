<?php

namespace App\Services\User;

use App\Exceptions\Custom\NotFoundException;
use App\Exceptions\User\SetPasswordTokenException;
use App\Models\User\User;
use App\Repositories\User\UserRepository;
use App\Services\Token\FirebaseTokenManager;
use Illuminate\Support\Facades\Lang;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserService
{
    private FirebaseTokenManager $firebaseTokenManager;
    private UserRepository $userRepository;

    public function __construct(FirebaseTokenManager $firebaseTokenManager, UserRepository $userRepository)
    {
        $this->firebaseTokenManager = $firebaseTokenManager;
        $this->userRepository = $userRepository;
    }

    public function fetchUserFromToken($token): User
    {
        $userFromToken = $this->firebaseTokenManager->decode($token);

        return $this->fetchUserForSetPassword($userFromToken['userId']);
    }

    public function getListRoles(): array
    {
        $roles = [];

        foreach (User::ROLES_USER as $role) {
            $roles[$role] = Lang::get('user.roles.' . $role);
        }

        return $roles;
    }

    public function fetchUser(int $id): User
    {
        try {
            return User::findOrFail($id);
        } catch (ModelNotFoundException $exception) {
            throw new NotFoundException('User value(' . $id . ') not found');
        }
    }

    public function fetchUserForSetPassword(int $userId): User
    {
        $user = User::find($userId);
        if (!$user instanceof User) {
            throw new NotFoundException('User value(' . $userId . ') not found');
        }

        if (!$user->isActive()) {
            throw new SetPasswordTokenException(Lang::get('exception.at_the_direction_admin_link_invalid'));
        }

        if (!$user->isAllowSettingPassword()) {
            throw new SetPasswordTokenException(Lang::get('exception.link_has_already_been_used_to_set_password'));
        }

        return $user;
    }

    public function loginUserSuperAdmin(): ?string
    {
        /** @var User|null $user */
        $user = User::query()->where('active', '=', true)->first();
        if ($user) {
            return auth()->login($user);
        }

        return null;
    }
}
