<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use App\Repositories\Permission\PermissionRepository;
use App\Exceptions\Permission\PermissionException;
use Illuminate\Http\Request;

class Permission
{
    private PermissionRepository $permissionRepository;

    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    //TODO: refactor $permission there string and array in the same time
    /** @phpstan-ignore-next-line */
    public function handle(Request $request, Closure $next, $permissions)
    {
        if (app('auth')->guest()) {
            throw new PermissionException('Permission denied');
        }

        $permissions = is_array($permissions) ? $permissions : explode('|', $permissions);
        $listRoles = $this->permissionRepository->fetchListRoles($permissions);

        if (empty(app('auth')->user()->hasRoles($listRoles))) {
            throw new PermissionException('Permission denied');
        }

        return $next($request);
    }
}
