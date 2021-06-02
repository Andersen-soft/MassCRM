<?php
declare(strict_types=1);

namespace App\Imports\Contact\Users;

class UserNC2 extends User
{
    public const FIELDS = [
        'contact' => ['first_name', 'last_name', 'position', 'country', 'region', 'city'],
        'contactEmail' => ['email'],
        'company' => ['name', 'website', 'companySize'],
        'companyVacancies' => ['vacancy'],
        'companyIndustries' => ['industry']
    ];
}
