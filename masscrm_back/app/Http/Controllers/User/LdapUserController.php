<?php

namespace App\Http\Controllers\User;

use App\Exceptions\User\LdapException;
use App\Http\Controllers\BaseController;
use ErrorException;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\User\LdapUserRequest;
use App\Services\Ldap\LdapService;

class LdapUserController extends BaseController
{
    public function __construct()
    {
        $this->middleware('permission:getUserFromLdap', ['only' => ['__invoke']]);
    }

    /**
     * @OA\GET(
     *     path="/users/ldap_user",
     *     tags={"User"},
     *     description="Fetch information users form LDAP",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="email",
     *         in="query",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *                 @OA\Property(property="payload", type="array",
     *                     @OA\Items(type="object",
     *                         required={"email", "name", "surname", "login"},
     *                          @OA\Property(property="email", type="string", example="test1@test.com"),
     *                          @OA\Property(property="name", type="string", example="Aleksander"),
     *                          @OA\Property(property="surname", type="string", example="Grigories"),
     *                          @OA\Property(property="login", type="string", example="an.grifories"),
     *                    )
     *               )
     *         )
     *     ),
     *     @OA\Response(response="503", ref="#/components/responses/503"),
     *     @OA\Response(response="401", ref="#/components/responses/401")
     * )
     * @throws LdapException
     */
    public function __invoke(LdapUserRequest $request, LdapService $ldapService): JsonResponse
    {
        try {
            return $this->success(
                $ldapService->fetchListUser($request->get('email')),
            );
        } catch (ErrorException $e) {
            throw new LdapException('Ldap service unavailable');
        }
    }
}
