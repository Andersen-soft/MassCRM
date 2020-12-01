<?php declare(strict_types=1);

return [
    'roles' => [
        'administrator' => [
            'text' => 'Admin',
            'description' => 'Администратор'
        ],
        'manager' => [
            'text' => 'Manager',
            'description' =>  'Маркетолог, помощник маркетолога и другие уполномоченные сотрудники'
        ],
        'nc1' => [
            'text' => 'NC1',
            'description' =>  'Координатор обычной сети, заполняющий базу данных'
        ],
        'nc2' => [
            'text' => 'NC2',
            'description' =>  'Сетевой координатор, который заполняет базу данных вакансий'
        ]
    ],
    'successful_send_link_on_change_password' => 'Ссылка для сброса пароля успешно отправлена'
];
