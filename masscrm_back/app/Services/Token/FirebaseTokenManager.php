<?php

namespace App\Services\Token;

use App\Models\User\User;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Exception;
use App\Exceptions\User\SetPasswordTokenException;

class FirebaseTokenManager
{
    public function encode(User $user): string
    {
        $data = [
            'userId' => $user->getId(),
            'iat' => $user->getUpdatedAt()->getTimestamp(),
            'exp' => $user->getUpdatedAt()->addDay()->getTimestamp(),
        ];

        return JWT::encode($data, config('jwt.secret'));
    }

    public function decode(string $token): array
    {
        try {
            $data = (array) JWT::decode($token, config('jwt.secret'), ['HS256']);
        } catch (ExpiredException $exception) {
            throw new SetPasswordTokenException('The link has expired. Contact Admin for a new link.');
        } catch (Exception $exception) {
            throw new SetPasswordTokenException('Invalid token for setting password.');
        }

        if (!array_key_exists('userId', $data)) {
            throw new SetPasswordTokenException('Invalid token for setting password.');
        }

        return $data;
    }
}
