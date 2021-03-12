<?php declare(strict_types=1);

namespace App\Http\Requests\Import\StartParsing;

use App\Models\User\User;
use Illuminate\Auth\AuthManager;

class ImportRequestFactory
{
    public static function createStartParsingValidator(): ImportStartParsingRequestInterface
    {
        $user = auth()->user();

        $roles = $user instanceof User ? $user->getRoles() : [];
        switch (true) {
            case in_array(User::USER_ROLE_ADMINISTRATOR, $roles, true):
            case in_array(User::USER_ROLE_MANAGER, $roles, true):
            case in_array(User::USER_ROLE_NC1, $roles, true):
                $validator = new ImportStartParsingRequest();
                break;
            case in_array(User::USER_ROLE_NC2, $roles, true):
                $validator = new ImportNC2StartParsingRequest();
                break;
            default:
                $validator = new ImportStartParsingRequest();
        }

        return $validator;
    }
}
