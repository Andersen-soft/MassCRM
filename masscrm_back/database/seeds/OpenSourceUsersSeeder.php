<?php declare(strict_types=1);

use App\Models\User\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class OpenSourceUsersSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->userList() as $item) {
            User::query()->updateOrCreate(['login' => $item['login']], $item);
        }
    }

    private function userList(): Generator
    {
        yield [
            'login' => 'David Lopez',
            'name' => 'David',
            'surname' => 'Lopez',
            'email' => 'david@happysoft.com',
            'skype' => 'D.Lopez',
            'position' => 'devops',
            'password' => Hash::make('aZ12JeGbNq'),
            'roles' => [User::USER_ROLE_ADMINISTRATOR],
            'active' => 1,
            'allow_setting_password' => false
        ];

        yield [
            'login' => 'Paul Garcia',
            'name' => 'Paul Garcia',
            'surname' => 'Garcia',
            'email' => 'garcia@happysoft.com',
            'skype' => 'P.Garcia',
            'position' => 'manager',
            'password' => Hash::make('q4puH6eJxW'),
            'roles' => [User::USER_ROLE_MANAGER],
            'active' => 1,
            'from_active_directory' => false,
        ];

        yield [
            'login' => 'Jane Smith',
            'name' => 'Jane',
            'surname' => 'Smith',
            'email' => 'j.smith@happysoft.com',
            'skype' => 'J.Smith',
            'position' => 'manager',
            'password' => Hash::make('cZ4JJA8yHW'),
            'roles' => [User::USER_ROLE_NC1],
            'active' => 1,
            'from_active_directory' => false,
        ];

        yield [
            'login' => 'Mike Jones',
            'name' => 'Mike',
            'surname' => 'Jones',
            'email' => 'mike.jones@happysoft.com',
            'skype' => 'M.Jones',
            'position' => 'manager',
            'password' => Hash::make('V5eiayvzKj'),
            'roles' => [User::USER_ROLE_NC2],
            'active' => 1,
            'from_active_directory' => false,
        ];
    }
}
