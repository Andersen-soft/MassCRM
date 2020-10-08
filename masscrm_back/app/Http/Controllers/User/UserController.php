<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\BaseController;
use Illuminate\Http\JsonResponse;

use App\Models\User\User;

use App\Http\Requests\User\{
    CreateUserRequest,
    UpdateUserRequest,
    SetPasswordRequest,
    SetPasswordTokenRequest,
    GetUserListRequest
};

use App\Commands\User\{
    CreateUserCommand,
    GetUserListCommand,
    UpdateUserCommand,
    SetPasswordUserCommand,
    GetUserCommand,
    ChangePasswordUserCommand
};

use App\Services\User\UserService;
use App\Services\Auth\AuthService;
use App\Helpers\Pagination;
use App\Http\Resources\User\User as UserResource;
use App\Http\Resources\Auth\Login as LoginResource;

class UserController extends BaseController
{
    public function __construct()
    {
        $this->middleware('permission:createUser', ['only' => ['store']]);
        $this->middleware('permission:updateUser', ['only' => ['update']]);
        $this->middleware('permission:getRolesUser', ['only' => ['getRoles']]);
        $this->middleware('permission:showUserById', ['only' => ['show']]);
        $this->middleware('permission:getListUsers', ['only' => ['index']]);
        $this->middleware('permission:changePasswordUser', ['only' => ['changePassword']]);
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
     *             @OA\Schema(
     *                 required={
     *                     "email", "login", "name", "surname", "skype", "active", "roles"
     *                 },
     *                 @OA\Property(property="email", type="string", example="masscrm@andersenlab.com"),
     *                 @OA\Property(property="login", type="string", example="masscrm"),
     *                 @OA\Property(property="name", type="string", example="name-masscrm"),
     *                 @OA\Property(property="surname", type="string", example="surname-masscrm"),
     *                 @OA\Property(property="position", type="string", example="position-masscrm"),
     *                 @OA\Property(property="comment", type="string", example="comment-masscrm"),
     *                 @OA\Property(property="active", type="boolean", example=true),
     *                 @OA\Property(property="fromActiveDirectory", type="boolean", example=false),
     *                 @OA\Property(property="skype", type="string", example="skype:skype"),
     *                 @OA\Property(property="roles", type="array",
     *                     @OA\Items(type="string", example="administrator")
     *                 ),
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(ref="#/components/schemas/User")
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function store(CreateUserRequest $request): JsonResponse
    {
        $user = $this->dispatchNow(
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

        return $this->success(new UserResource($user));
    }

    /**
     * @OA\Patch(
     *      path="/users/{id}",
     *      tags={"User"},
     *      description="Update user",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={
     *                     "email", "login", "name", "surname", "skype", "active", "roles"
     *                 },
     *                 @OA\Property(property="email", type="string", example="masscrm@andersenlab.com"),
     *                 @OA\Property(property="login", type="string", example="masscrm"),
     *                 @OA\Property(property="name", type="string", example="name-masscrm"),
     *                 @OA\Property(property="surname", type="string", example="surname-masscrm"),
     *                 @OA\Property(property="position", type="string", example="position-masscrm"),
     *                 @OA\Property(property="comment", type="string", example="comment-masscrm"),
     *                 @OA\Property(property="skype", type="string", example="skype:skype555"),
     *                 @OA\Property(property="active", type="boolean", example=true),
     *                 @OA\Property(property="roles", type="array",
     *                     @OA\Items(type="string", example="administrator")
     *                 ),
     *             )
     *         )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(ref="#/components/schemas/User")
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function update(UpdateUserRequest $request, $id): JsonResponse
    {
        $user = $this->dispatchNow(
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

       return $this->success(new UserResource($user));
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
     *          @OA\JsonContent(ref="#/components/schemas/User")
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="403", ref="#/components/responses/403"),
     * )
     */
    public function getUserFromToken(SetPasswordTokenRequest $request, UserService $userService): JsonResponse
    {
        return $this->success(
            new UserResource(
                $userService->fetchUserFromToken($request->get('token'))
            )
        );
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
     *          @OA\JsonContent(ref="#/components/schemas/AuthLogin")
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="403", ref="#/components/responses/403"),
     * )
     */
    public function setPassword(SetPasswordRequest $request, AuthService $authService): JsonResponse
    {
        /** @var User $user */
        $user = $this->dispatchNow(
            new SetPasswordUserCommand(
                $request->get('id'),
                $request->get('password')
            )
        );

        return $this->success(
            new LoginResource(
                $authService->login($user->getLogin(), $request->get('password'))
            )
        );
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
     *                 @OA\Property(property="payload", type="object",
     *                     @OA\Property(property="administrator", type="object",
     *                         @OA\Property(property="text", type="string", example="Admin"),
     *                         @OA\Property(property="description", type="string", example="Administrator"),
     *                     ),
     *                     @OA\Property(property="manager", type="object",
     *                          @OA\Property(property="text", type="string", example="Manager"),
     *                          @OA\Property(property="description", type="string",
     *                              example="Marketer, Marketer Assistant and other authorized employees"),
     *                     ),
     *                     @OA\Property(property="nc1", type="object",
     *                          @OA\Property(property="text", type="string", example="NC1"),
     *                          @OA\Property(property="description", type="string",
     *                              example="Ordinary Network Coordinator, who fills database"),
     *                     ),
     *                     @OA\Property(property="nc2", type="object",
     *                          @OA\Property(property="text", type="string", example="NC2"),
     *                          @OA\Property(property="description", type="string",
     *                              example="Network Coordinator, who fills jobs database"),
     *                     ),
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
     *      @OA\Parameter(     *
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(ref="#/components/schemas/User")
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function show($id): JsonResponse
    {
        return $this->success(new UserResource($this->dispatchNow(new GetUserCommand($id))));
    }

    /**
     * @OA\Get(
     *     path="/users",
     *     tags={"User"},
     *     description="Get list users",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="page", in="query", required=true,
     *        @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Parameter(name="limit", in="query", required=true,
     *        @OA\Schema(type="integer", example=30)
     *     ),
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
     *             required={"success", "payload"},
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="payload", type="object",
     *                 required={"current_page", "data", "first_page_url", "from", "last_page",
     *                 "last_page_url", "next_page_url", "path", "per_page", "prev_page_url",
     *                 "to", "total"},
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(property="data", type="array",
     *                     @OA\Items(type="object",
     *                         required={
     *                             "id", "login", "email", "name", "surname", "position", "comment", "roles",
     *                             "active", "fromActiveDirectory"
     *                         },
     *                         @OA\Property(property="id", type="integer", example=123),
     *                         @OA\Property(property="login", type="string", example="masscrm"),
     *                         @OA\Property(property="email", type="string", example="masscrm@andersenlab.com"),
     *                         @OA\Property(property="name", type="string", example="Masscrm"),
     *                         @OA\Property(property="roles", type="object",
     *                             @OA\Property(property="nc1", type="object",
     *                                 @OA\Property(property="text", type="string", example="NC1"),
     *                                 @OA\Property(property="description", type="string",
     *                                     example="Ordinary Network Coordinator, who fills database"),
     *                             ),
     *                         ),
     *                         @OA\Property(property="skype", type="string", example="masscrm.ander"),
     *                         @OA\Property(property="surname", type="string", example="Masscrm CRM"),
     *                         @OA\Property(property="position", type="string", example="Position Test"),
     *                         @OA\Property(property="comment", type="string", example="Comment Test"),
     *                         @OA\Property(property="active", type="boolean", example=false),
     *                         @OA\Property(property="fromActiveDirectory", type="boolean", example=false),
     *                      ),
     *                  ),
     *                  @OA\Property(
     *                      property="first_page_url",
     *                      type="string",
     *                      example="http://localhost/api/users?page=1"
     *                  ),
     *                  @OA\Property(property="from", type="integer", example=1),
     *                  @OA\Property(property="last_page", type="integer", example=512),
     *                  @OA\Property(
     *                      property="last_page_url",
     *                      type="string",
     *                      example="http://localhost/api/users?page=512"
     *                  ),
     *                  @OA\Property(
     *                      property="next_page_url",
     *                      type="string",
     *                      example="http://localhost/api/users?page=2"
     *                  ),
     *                  @OA\Property(
     *                      property="path",
     *                      type="string",
     *                      example="http://localhost/api/users"
     *                  ),
     *                  @OA\Property(property="per_page", type="integer", example=50),
     *                  @OA\Property(property="prev_page_url", example="null"),
     *                  @OA\Property(property="to", type="integer", example=50),
     *                  @OA\Property(property="total", type="integer", example=25566),
     *              ),
     *          ),
     *      ),
     *     @OA\Response(response="400", ref="#/components/responses/400"),
     *     @OA\Response(response="401", ref="#/components/responses/401"),
     * )
     */
    public function index(GetUserListRequest $request, Pagination $pagination): JsonResponse
    {
        $users = $this->dispatchNow(
            new GetUserListCommand(
                $request->get('search', []),
                $request->get('sort', []),
                $request->get('limit', 50),
                $request->get('page', 1)
            )
        );

        return $this->success(UserResource::collection($users), $pagination->getMeta($users));
    }

    /**
     * @OA\Get(
     *      path="/users/change-password/{id}",
     *      tags={"User"},
     *      description="Generate link for password reset and send link to the E-mail",
     *      security={{"bearerAuth":{}}},
     *      @OA\Parameter(     *
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Successfully",
     *          @OA\JsonContent(
     *              required={"success", "payload"},
     *              @OA\Property(property="success", type="boolean", example=true),
     *              @OA\Property(property="payload", type="object",
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
    public function changePassword($id): JsonResponse
    {
        return $this->success(
            $this->dispatchNow(new ChangePasswordUserCommand((int) $id))
        );
    }
}
