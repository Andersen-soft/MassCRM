<?php declare(strict_types=1);

use Illuminate\Database\Seeder;
use App\Models\User\User;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->userList() as $item) {
            User::updateOrCreate(['login' => $item['login']], $item);
        }
    }

    private function userList(): Generator
    {
        yield [
            'login' => 'nc1.testing',
            'name' => 'NC1',
            'surname' => 'Testing',
            'comment' => 'comment wrote administrator for nc1 role',
            'email' => 'nc1.testing@andersenlab.com',
            'skype' => 'nc1.testing',
            'password' => Hash::make('nc1.testing'),
            'roles' => [User::USER_ROLE_NC1],
            'active' => 1,
            'allow_setting_password' => false
        ];

        yield [
            'login' => 'nc2.testing',
            'name' => 'NC2',
            'surname' => 'Testing',
            'email' => 'nc2.testing@andersenlab.com',
            'skype' => 'nc2.testing',
            'position' => 'nc2.testing',
            'password' => Hash::make('nc2.testing'),
            'roles' => [User::USER_ROLE_NC2],
            'active' => 1,
            'from_active_directory' => true,
        ];

        yield [
            'login' => 'manager',
            'name' => 'Manager',
            'surname' => 'Manager',
            'position' => 'position manager',
            'skype' => 'mn.manager',
            'comment' => 'comment wrote administrator',
            'email' => 'manager@andersenlab.com',
            'password' => Hash::make('manager'),
            'roles' => [User::USER_ROLE_MANAGER],
            'active' => 1,
            'allow_setting_password' => false
        ];

        yield [
            'login' => 'administrator',
            'name' => 'Administrator',
            'surname' => 'Administrator',
            'skype' => 'administrator.admin',
            'email' => 'administrator@andersenlab.com',
            'password' => Hash::make('administrator'),
            'roles' => [User::USER_ROLE_ADMINISTRATOR],
            'active' => 1
        ];

        yield [
            'login' => 'superAdmin',
            'name' => 'Super',
            'surname' => 'Administrator',
            'skype' => 'sup.administrator',
            'email' => 'super-admin@andersenlab.com',
            'password' => Hash::make('superAdmin'),
            'roles' => [
                User::USER_ROLE_ADMINISTRATOR,
                User::USER_ROLE_MANAGER,
                User::USER_ROLE_NC2,
                User::USER_ROLE_NC1
            ],
            'active' => 1,
            'from_active_directory' => true,
        ];
    }
}
