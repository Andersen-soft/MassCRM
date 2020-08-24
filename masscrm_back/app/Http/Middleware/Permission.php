<?php

namespace App\Http\Middleware;

use Closure;
use App\Repositories\Permission\PermissionRepository;
use App\Exceptions\Permission\PermissionException;

class Permission
{
    private PermissionRepository $permissionRepository;

    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    public function handle($request, Closure $next, $permissions)
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
