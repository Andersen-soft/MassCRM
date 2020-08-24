<?php

namespace App\Http\Controllers\Auth;

use App\Http\Transformers\Auth\LoginTransform;
use App\Http\Transformers\User\UserTransform;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Tymon\JWTAuth\Exceptions\UserNotDefinedException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use App\Exceptions\Auth\AuthException;
use App\Services\Auth\AuthService;

/**
 * Class AuthController
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *    path="/auth/login",
     *    tags={"Authentification"},
     *    @OA\RequestBody(
     *      required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="login", type="string", example="manager"),
     *                 @OA\Property(property="password", type="string", example="manager"),
     *             )
     *         )
     *     ),
     *    @OA\Response(
     *       response="200",
     *       description="Successfully",
     *       @OA\JsonContent(ref="#/components/schemas/AuthLogin")
     *    ),
     *    @OA\Response(response="400", ref="#/components/responses/400"),
     *    @OA\Response(
     *        response="401",
     *        description="Invalid login or password.",
     *        @OA\JsonContent(
     *            @OA\Property(property="success", type="boolean", example=false),
     *            @OA\Property(property="payload", type="object",
     *                @OA\Property(property="message", type="string", example="Invalid login or password."),
     *            )
     *        )
     *    )
     * )
     */
    public function login(LoginRequest $request, AuthService $authService): JsonResponse
    {
        return $this->responseTransform(
            $authService->login($request->get('login'), $request->get('password')),
            new LoginTransform()
        );
    }

    /**
     * @OA\Get(
     *    path="/auth/user",
     *    tags={"Authentification"},
     *    security={{"bearerAuth":{}}},
     *    @OA\Response(
     *        response="200",
     *        description="Successfully",
     *        @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *    @OA\Response(response="401", ref="#/components/responses/401")
     * )
     * @throws AuthException
     */
    public function user(): JsonResponse
    {
        try {
            $user = auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            throw new AuthException('User not found.', JsonResponse::HTTP_FORBIDDEN);
        }

        return $this->responseTransform($user, new UserTransform());
    }

    /**
     * @OA\Get(
     *    path="/auth/logout",
     *    tags={"Authentification"},
     *    security={{"bearerAuth":{}}},
     *    @OA\Response(
     *        response="200",
     *        description="Successful logout",
     *        @OA\JsonContent(
     *            @OA\Property(property="success", type="boolean", example=true),
     *            @OA\Property(property="payload", type="object",
     *                @OA\Property(property="message", type="string", example="Successfully logged out.")
     *            ),
     *        )
     *    ),
     *    @OA\Response(response="401", ref="#/components/responses/401")
     * )
     * @throws AuthException
     */
    public function logout(): JsonResponse
    {
        try {
            auth()->logout();
        } catch (TokenExpiredException $e) {
            throw new AuthException('Token has expired.', JsonResponse::HTTP_UNAUTHORIZED);
        }

        return $this->response(['message' => 'Successfully logged out.']);
    }

    /**
     * @OA\Get(
     *    path="/auth/refresh",
     *    tags={"Authentification"},
     *    security={{"bearerAuth":{}}},
     *    @OA\Response(
     *       response="200",
     *       description="Successfully",
     *       @OA\JsonContent(ref="#/components/schemas/AuthLogin")
     *    ),
     *    @OA\Response(
     *        response="403",
     *        description="Invalid credentials",
     *        @OA\JsonContent(
     *            @OA\Property(property="success", type="boolean", example=false),
     *            @OA\Property(property="payload", type="object",
     *                @OA\Property(property="message", type="string", example="Invalid token."),
     *            )
     *        )
     *    )
     * )
     * @throws AuthException
     */
    public function refresh(): JsonResponse
    {
        try {
            $token = auth()->refresh();
        } catch (TokenBlacklistedException $e) {
            throw new AuthException('Invalid token.', JsonResponse::HTTP_FORBIDDEN);
        }

        return $this->responseTransform($token, new LoginTransform());
    }
}
