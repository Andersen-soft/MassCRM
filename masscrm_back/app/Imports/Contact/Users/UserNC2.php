<?php
declare(strict_types=1);

namespace App\Imports\Contact\Users;

class UserNC2 extends User
{
    public const FIELDS = [
        'contact' => ['position', 'country', 'region', 'city'],
        'contactEmail' => ['email'],
        'company' => ['name', 'companySize'],
        'companyVacancies' => ['vacancy'],
        'companyIndustries' => ['industry']
    ];
}
