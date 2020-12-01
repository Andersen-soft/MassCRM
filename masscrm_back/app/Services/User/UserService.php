<?php

declare(strict_types=1);

namespace App\Services\User;

use App\Commands\User\CreateUserCommand;
use App\Commands\User\UpdateUserCommand;
use App\Events\User\ChangeLoginEvent;
use App\Events\User\ChangePasswordEvent;
use App\Events\User\RegistrationUserToActiveDirectoryEvent;
use App\Events\User\RegistrationUserToEmailEvent;
use App\Exceptions\Custom\NotFoundException;
use App\Exceptions\User\SetPasswordTokenException;
use App\Models\User\User;
use App\Repositories\User\UserRepository;
use App\Services\Token\FirebaseTokenManager;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Lang;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserService
{
    private FirebaseTokenManager $firebaseTokenManager;

    private UserRepository $userRepository;

    private User $user;

    public function __construct(FirebaseTokenManager $firebaseTokenManager, UserRepository $userRepository, User $user)
    {
        $this->firebaseTokenManager = $firebaseTokenManager;
        $this->userRepository = $userRepository;
        $this->user = $user;
    }

    public function fetchUserFromToken(string $token): User
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
            return User::query()->findOrFail($id);
        } catch (ModelNotFoundException $exception) {
            throw new NotFoundException('User value(' . $id . ') not found');
        }
    }

    public function getUsersByIds(array $ids): Collection
    {
        return $this->userRepository->getUsersByIds($ids);
    }

    public function fetchUserForSetPassword(int $userId): User
    {
        $user = User::query()->find($userId);
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

    public function deleteUser(int $id): int
    {
        return $this->userRepository->deleteUserById($id);
    }

    public function getUserList(array $search, array $sort): Builder
    {
        return $this->userRepository->getUserList($search, $sort);
    }
    public function createUser(CreateUserCommand $command): User
    {
        $user = $this->user->createUser($command->toArray());

        if (!$user->active) {
            return $user;
        }

        if ($command->fromActiveDirectory()) {
            RegistrationUserToActiveDirectoryEvent::dispatch($user);
        } else {
            RegistrationUserToEmailEvent::dispatch($user);
        }

        return $user;
    }

    public function updateUser(UpdateUserCommand $command): User
    {
        $user = $this->userRepository->getUserById($command->getUserId());
        if (!$user instanceof User) {
            throw new NotFoundException('User value(' . $command->getUserId() . ') not found');
        }

        $loginUser = $user->login;
        $user = $this->user->updateUser($user, $command->toArray());

        if ($loginUser !== $user->login && $user->active) {
            ChangeLoginEvent::dispatch($user);
        }

        return $user;
    }

    public function setPassword(int $userId, string $password): User
    {
        $user = $this->userRepository->getUserById($userId);
        if (!$user instanceof User) {
            throw new NotFoundException('User value(' . $userId . ') not found');
        }

        $this->user->setNewPassword($user, $password);


        return $user;
    }

    public function allowChangePassword(int $userId): array
    {
        $user = $this->userRepository->getUserById($userId, false);
        if (!$user instanceof User) {
            throw new NotFoundException('User value(' . $userId . ') not found');
        }

        $user->allow_setting_password = true;
        $user->save();

        if ($user->active) {
            ChangePasswordEvent::dispatch($user);
        }

        return [
            'text' => Lang::get('user.successful_send_link_on_change_password')
        ];
    }

}
