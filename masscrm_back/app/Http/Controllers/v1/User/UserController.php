<?php

declare(strict_types=1);

namespace App\Http\Controllers\v1\User;

use App\Http\Controllers\BaseController;
use App\Http\Requests\User\DeleteUserRequest;
use App\Http\Requests\User\GetUsersByIdsRequest;
use App\Http\Requests\User\SpecifyUserIdRequest;
use App\Repositories\User\UserRepository;
use Illuminate\Http\JsonResponse;
use App\Models\User\User;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\SetPasswordRequest;
use App\Http\Requests\User\SetPasswordTokenRequest;
use App\Http\Requests\User\GetUserListRequest;
use App\Commands\User\CreateUserCommand;
use App\Commands\User\UpdateUserCommand;
use App\Services\User\UserService;
use App\Services\Auth\AuthService;
use App\Helpers\Pagination;
use App\Http\Resources\User\User as UserResource;
use App\Http\Resources\Auth\Login as LoginResource;

class UserController extends BaseController
{
    private UserService $userService;

    private UserRepository $userRepository;

    private User $user;

    public function __construct(UserService $userService, UserRepository $userRepository, User $user)
    {
        $this->middleware('permission:createUser', ['only' => ['store']]);
        $this->middleware('permission:updateUser', ['only' => ['update']]);
        $this->middleware('permission:getRolesUser', ['only' => ['getRoles']]);
        $this->middleware('permission:showUserById', ['only' => ['show']]);
        $this->middleware('permission:getListUsers', ['only' => ['index']]);
        $this->middleware('permission:changePasswordUser', ['only' => ['changePassword']]);
        $this->middleware('permission:delete', ['only' => ['delete']]);
        $this->middleware('permission:getUsersByIds', ['only' => ['getUsersByIds']]);

        $this->userService = $userService;
        $this->userRepository = $userRepository;
        $this->user = $user;
    }

    /**
     * @OA\Post(
     *      path="/users",
     *      tags={"User"},
     *      description="Create user",
     *      security={{"bearerAuth":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(ref="#/components/schemas/ParamsUserCreateAndUpdate")
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/User")
     *          )
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function store(CreateUserRequest $request): JsonResponse
    {
        $user =  $this->userService->createUser(
            new CreateUserCommand(
                $request->get('email'),
                $request->get('login'),
                $request->get('name'),
                $request->get('surname'),
                $request->get('roles'),
                $request->get('active'),
                $request->get('position', null),
                $request->get('comment', null),
                $request->get('skype'),
                $request->get('fromActiveDirectory', false)
            )
        );

        return $this->success([new UserResource($user)]);
    }

    /**
     * @OA\PUT(
     *      path="/users/{id}",
     *      tags={"User"},
     *      description="Update user",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/id"),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(ref="#/components/schemas/ParamsUserCreateAndUpdate")
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/User")
     *          )
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function update(UpdateUserRequest $request, int $id): JsonResponse
    {
        $user = $this->userService->updateUser(
            new UpdateUserCommand(
                (int) $id,
                $request->get('email'),
                $request->get('login'),
                $request->get('name'),
                $request->get('surname'),
                $request->get('roles'),
                $request->get('active'),
                $request->get('skype'),
                $request->get('position', null),
                $request->get('comment', null)
            )
        );

        return $this->success([new UserResource($user)]);
    }

    /**
     * @OA\GET(
     *      path="/users/token",
     *      tags={"User"},
     *      description="Get information user with use token",
     *      @OA\Parameter(
     *          name="token",
     *          in="query",
     *          required=true,
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/User")
     *          )
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="403", ref="#/components/responses/403"),
     * )
     */
    public function getUserFromToken(SetPasswordTokenRequest $request, UserService $userService): JsonResponse
    {
        return $this->success([
            new UserResource(
                $userService->fetchUserFromToken($request->get('token'))
            )
        ]);
    }

    /**
     * @OA\POST(
     *      path="/users/set-password",
     *      tags={"User"},
     *      description="Set user password",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"id", "password"},
     *                 @OA\Property(property="id", type="integer", example=10),
     *                 @OA\Property(property="password", type="string", example="Mass12crm"),
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/AuthLogin")
     *          )
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="403", ref="#/components/responses/403"),
     * )
     */
    public function setPassword(SetPasswordRequest $request, AuthService $authService): JsonResponse
    {
        /** @var User $user */
        $user = $this->userService->setPassword($request->get('id'), $request->get('password'));

        return $this->success([
            new LoginResource(
                $authService->login($user->getLogin(), $request->get('password'))
            )
        ]);
    }

    /**
     * @OA\GET(
     *      path="/users/roles",
     *      tags={"User"},
     *      description="Fetch roles users",
     *      security={{"bearerAuth":{}}},
     *      @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *                 @OA\Property(property="data", type="object",
     *                     @OA\Property(property="manager", type="object",
     *                          @OA\Property(property="text", type="string", example="Manager"),
     *                          @OA\Property(property="description", type="string",
     *                              example="Marketer, Marketer Assistant and other authorized employees"),
     *                     ),
     *                     @OA\Property(property="nc1", type="object",
     *                          @OA\Property(property="text", type="string", example="NC1"),
     *                          @OA\Property(property="description", type="string",
     *                              example="Ordinary Network Coordinator, who fills database"),
     *                     )
     *               )
     *         )
     *     ),
     *     @OA\Response(response="401", ref="#/components/responses/401")
     * )
     */
    public function getRoles(UserService $userService): JsonResponse
    {
        return $this->success($userService->getListRoles());
    }

    /**
     * @OA\Get(
     *      path="/users/{id}",
     *      tags={"User"},
     *      description="Get information user",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/id"),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *         @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/User")
     *          )
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function show(SpecifyUserIdRequest $request, int $id): JsonResponse
    {
        return $this->success([new UserResource($this->userService->fetchUser($id))]);
    }

    /**
     * @OA\Get(
     *      path="/users/getUsersByIds",
     *      tags={"User"},
     *      description="get users by ids",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(name="ids[]", in="query",
     *          @OA\Schema(type="array",
     *              @OA\Items(type="integer")
     *          )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *         @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object", ref="#/components/schemas/User")
     *          )
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function getUsersByIds(GetUsersByIdsRequest $request): JsonResponse
    {
        $users = $this->userService->getUsersByIds($request->get('ids'));

        return $this->success(UserResource::collection($users));
    }

    /**
     * @OA\Get(
     *     path="/users",
     *     tags={"User"},
     *     description="Get list users",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(ref="#/components/parameters/page"),
     *     @OA\Parameter(ref="#/components/parameters/limit"),
     *     @OA\Parameter(name="search", in="query", style="deepObject",
     *         @OA\Schema(type="object",
     *             @OA\Property(property="roles", type="object",
     *                 @OA\Property(type="string", example="administrator")
     *             ),
     *             @OA\Property(property="fullName", type="string", example="massCrm"),
     *             @OA\Property(property="email", type="string", example="mass@andr"),
     *             @OA\Property(property="login", type="string", example="massTest"),
     *             @OA\Property(property="skype", type="string", example="masscrt.andr"),
     *             @OA\Property(property="position", type="string", example="position admin"),
     *             @OA\Property(property="active", type="boolean", example=1),
     *         ),
     *     ),
     *     @OA\Parameter(name="sort", in="query", style="deepObject",
     *         @OA\Schema(type="object",
     *             @OA\Property(property="fieldName", type="string", enum={"roles", "fullName", "email", "login",
     *                 "skype","position","active"}),
     *             @OA\Property(property="typeSort", type="string", enum={"ASC", "DESC"}),
     *         ),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successfully",
     *         @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="array",
     *                  @OA\Items(type="string", ref="#/components/schemas/User")
     *              )
     *         ),
     *     ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(GetUserListRequest $request, UserService $userService, Pagination $pagination): JsonResponse
    {
        $users = $userService->getUserList($request->get('search', []), $request->get('sort', []))
            ->paginate($request->get('limit', self::DEFAULT_PAGE_LIMIT));

        return $this->success(UserResource::collection($users), $pagination->getMeta($users));
    }

    /**
     * @OA\Get(
     *      path="/users/change-password/{id}",
     *      tags={"User"},
     *      description="Generate link for password reset and send link to the E-mail",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(ref="#/components/parameters/id"),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "data"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="data", type="object",
     *                  required={"text"},
     *                  @OA\Property(property="text", type="integer",
     *                      example="The link for password reset to sent successfully"),
     *              ),
     *          ),
     *      ),
     *     @OA\Response(response="404", ref="#/components/responses/404"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function changePassword(SpecifyUserIdRequest $request, int $id): JsonResponse
    {
        return $this->success([$this->userService->allowChangePassword($id)]);
    }

    /**
     * @OA\Delete(
     *     path="/users/delete",
     *     description="Delete user id",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object"),
     *          )
     *      ),
     *  @OA\Response(response="401", ref="#/components/responses/401"),
     *  @OA\Response(response="404", ref="#/components/responses/404"),
     * )
     */
    public function delete(DeleteUserRequest $request): JsonResponse
    {
        return $this->success([$this->userService->deleteUser((int) $request->get('id'))]);
    }
}
