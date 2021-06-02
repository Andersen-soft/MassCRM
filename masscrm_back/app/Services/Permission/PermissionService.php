<?php

declare(strict_types=1);

namespace App\Services\Permission;

use App\Exceptions\Custom\NotFoundException;
use App\Models\User\RolesPermission;

class PermissionService
{
    public function deleteRolePermission(int $rolePerrmissionId): int
    {
        $rolePermission = RolesPermission::destroy($rolePerrmissionId);
        if ($rolePermission) {
            return $rolePermission;
        }

        throw new NotFoundException('RolePermission with ID ' . $rolePerrmissionId . ' does not exist.');
    }
}