<?php

namespace App\Services\Auth;

use App\Exceptions\Auth\AuthException;
use App\Models\User\User;
use Illuminate\Support\Facades\Http;

class AuthService
{
    public function login(string $login, string $password): string
    {
        /** @var User $user */
        if (!$user = User::where(['login' => $login, 'active' => 1])->first()) {
            throw new AuthException('Invalid login or password.');
        }

        if ($user->fromActiveDirectory()) {
            return $this->loginWithSsoUser($login, $password, $user);
        }

        return $this->loginWithPassword($login, $password);
    }

    private function loginWithPassword(string $login, string $password): string
    {
        if (!$token = auth()->attempt(['login' => $login, 'password' => $password, 'active' => 1])) {
            throw new AuthException('Invalid login or password.');
        }

        return $token;
    }

    private function loginWithSsoUser(string $login, string $password, User $user): string
    {
        if ($this->tryLoginSsoUser($login, $password)) {
            $token = auth()->login($user);
            if ($token) {
                return $token;
            }
        }

        throw new AuthException('Invalid login or password.');
    }

    private function tryLoginSsoUser(string $login, string $password): bool
    {
        $response = Http::post(config('app.sso_auth_server_url'), [
            'username' => $login,
            'password' => $password,
        ])->throw()->json();

        return !empty($response['result']) && $response['result'] === 'success';
    }
}
