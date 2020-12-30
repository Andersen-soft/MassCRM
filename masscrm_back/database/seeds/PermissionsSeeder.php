<?php declare(strict_types=1);

use Illuminate\Database\Seeder;
use App\Models\User\User;
use App\Models\User\Permission;
use App\Models\User\RolesPermission;

class PermissionsSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->listPermission() as $permission) {
            /** @var $model Permission*/
            $model = Permission::query()->firstOrCreate(
                ['slug' => $permission['slug']],
                ['slug' => $permission['slug']]
            );

            foreach ($permission['roles'] as $role) {
                $model->rolesPermission()->firstOrCreate(['role' => $role], ['role' => $role]);
            }
        }
    }

    private function listPermission(): array
    {
        return [
            [
                'slug' => 'createUser',
                'roles' => [User::USER_ROLE_ADMINISTRATOR],
            ],
            [
                'slug' => 'updateUser',
                'roles' => [User::USER_ROLE_ADMINISTRATOR],
            ],
            [
                'slug' => 'delete',
                'roles' => [User::USER_ROLE_ADMINISTRATOR],
            ],
            [
                'slug' => 'getRolesUser',
                'roles' => [User::USER_ROLE_ADMINISTRATOR, User::USER_ROLE_MANAGER],
            ],
            [
                'slug' => 'showUserById',
                'roles' => [
                    User::USER_ROLE_ADMINISTRATOR,
                    User::USER_ROLE_MANAGER,
                    User::USER_ROLE_NC2,
                    User::USER_ROLE_NC1
                ]
            ],
            [
                'slug' => 'getListUsers',
                'roles' => [
                    User::USER_ROLE_ADMINISTRATOR,
                    User::USER_ROLE_MANAGER,
                    User::USER_ROLE_NC2,
                    User::USER_ROLE_NC1
                ]
            ],
            [
                'slug' => 'changePasswordUser',
                'roles' => [User::USER_ROLE_ADMINISTRATOR],
            ],
            [
                'slug' => 'getUserFromLdap',
                'roles' => [User::USER_ROLE_ADMINISTRATOR],
            ],
            [
                'slug' => 'downloadReport',
                'roles' => [User::USER_ROLE_MANAGER],
            ],
            [
                'slug' => 'createContact',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'deleteContactById',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'deleteListContacts',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'updateContact',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'showContactById',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'getListContacts',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'createCompany',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'deleteCompanyById',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'deleteListCompanies',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'showCompanyById',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'updateCompany',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'getListCompanies',
                'roles' => [User::USER_ROLE_MANAGER, User::USER_ROLE_NC2, User::USER_ROLE_NC1],
            ],
            [
                'slug' => 'addLocation',
                'roles' => [User::USER_ROLE_MANAGER],
            ]
        ];
    }
}
