<?php

declare(strict_type=1);

namespace App\Console\Commands;

use App\Models\User\User;
use App\Repositories\Permission\PermissionRepository;
use App\Services\Permission\PermissionService;
use Illuminate\Console\Command;

class DetachPermission extends Command
{
    private PermissionRepository $permissionRepository;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permission:detach {permissionSlug} {role}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Detach permission for user role';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(PermissionRepository $permissionRepository, PermissionService $permissionService)
    {
        parent::__construct();
        $this->permissionRepository = $permissionRepository;
        $this->permissionService = $permissionService;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $permissionSlug = $this->argument('permissionSlug');
        $role = $this->argument('role');

        if (!$this->permissionRepository->permissionExist($permissionSlug)) {
            $this->error("Permission '{$permissionSlug}' doesn't exist.");
            return 1;
        }

        if (!in_array($role, User::ROLES_USER, true)) {
            $this->error("Role '{$role}' doesn't exist.");
            return 1;
        }

        $rolePermission = $this->permissionRepository->getRolePermissionByRoleNameAndSlug($role, $permissionSlug);

        if (!$rolePermission) {
            $this->error("Role '{$role}' doesn't have the '{$permissionSlug}' permission.");
            return 1;
        }

        try {
            $this->permissionService->deleteRolePermission($rolePermission->getId());
            $this->info("Permission '{$permissionSlug}' successfully detached from role '{$role}'.");
            return 0;
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return 1;
        }
    }
}
