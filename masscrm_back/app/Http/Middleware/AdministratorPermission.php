<?php

namespace App\Http\Middleware;

use Closure;
use App\Repositories\Permission\PermissionRepository;
use App\Exceptions\Permission\PermissionException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class AdministratorPermission
{
    private const ADMINISTRATOR = 'administrator';

    private PermissionRepository $permissionRepository;

    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * @param Request $request
     * @param Closure $next
     * @return mixed
     * @throws PermissionException
     */
    public function handle(Request $request,  Closure $next)
    {
        if (!in_array(self::ADMINISTRATOR, Auth::user()->roles)) {
            throw new PermissionException('Permission denied');
        }

        return $next($request);
    }
}
