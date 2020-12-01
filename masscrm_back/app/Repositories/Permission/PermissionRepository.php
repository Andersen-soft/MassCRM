<?php

declare(strict_types=1);

namespace App\Repositories\Permission;

use App\Models\User\RolesPermission;

class PermissionRepository
{
    public function fetchListRoles(array $slugs): array
    {
        $query = RolesPermission::query()
            ->join('permissions', 'permissions.id', '=', 'roles_permissions.permission_id');

        foreach ($slugs as $slug) {
            $query->orWhere('permissions.slug', '=', $slug);
        }

        return $query->pluck('roles_permissions.role')->toArray();
    }
}
