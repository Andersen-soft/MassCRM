<?php

use App\Models\Company\Company;

return [
    'column_separator' => [
        'semicolon' => 'Точка с запятой',
        'comma' => 'Запятая',
        'space' => 'Пробел',
        'tab' => 'Табуляция',
    ],
    'contacts_type' => [
        'customers' => 'Клиенты',
        'partners' => 'Партнеры',
    ],
    'import_source' => [
        'recommendation' => 'Рекомендация',
        'site' => 'Сайт',
        'social_network' => 'Соц.сеть',
        'mail' => 'Почта',
    ],
    'fields' => [
        'first_name' => 'Имя',
        'last_name' => 'Фамилия',
        'email' => 'Email',
        'company' => 'Название компании',
        'phone' => 'Телефон',
        'city' => 'Город',
        'region' => 'Регион',
        'country' => 'Страна',
        'c_linkedin' => 'Ссылка на linkedin контакта',
        'c_social' => 'Ссылка на Соц.сеть контакта',
        'comp_linkedin' => 'Ссылка на linkedin компании',
        'position' => 'должность',
        'website' => 'Ссылка на сайт компании',
        'industry' => 'Промышленность',
        'comp_size' => 'Размер компании',
        'confidence' => 'Достоверность контакта',
        'c_comment' => 'Комментарий контакта',
        'comp_comment' => 'Комментарий компании',
        'service_id' => 'ID',
        'added_to_mailing' => 'Добавлено в рассылку',
        'last_touch' => 'Последняя отправка письма',
        'sequence' => 'Последовательность',
        'status' => 'Статус',
        'opens' => 'Открытых',
        'views' => 'Просмотренных',
        'deliveries' => 'Доставленых',
        'replies' => 'Ответов',
        'bounces' => 'Отказаных'
    ],
    'genders' => [
        'f' => 'Женщина',
        'm' => 'Мужчина',
    ],
    'company_size' => [
        [
            'name' => 'Частный предприниматель',
            'min' => 1,
            'max' => 1
        ],
        [
            'name' => '1-10',
            'min' => 1,
            'max' => 10
        ],
        [
            'name' => '11-50',
            'min' => 11,
            'max' => 50
        ],
        [
            'name' => '51-200',
            'min' => 51,
            'max' => 200
        ],
        [
            'name' => '201-500',
            'min' => 201,
            'max' => 500
        ],
        [
            'name' => '501-1000',
            'min' => 501,
            'max' => 1000
        ],
        [
            'name' => '1001-5000',
            'min' => 1001,
            'max' => 5000
        ],
        [
            'name' => '5001-10000',
            'min' => 5001,
            'max' => 10000
        ],
        [
            'name' => '10001+',
            'min' => 10001,
            'max' => ''
        ],
    ],
    'origin' => ['NC1', 'NC2', 'Parser', 'Purchase', 'Legacy','Reply', 'Lemlist'],
    'company_type' => [Company::TYPE_COMPANY_HOLDING, Company::TYPE_COMPANY_SUBSIDIARY],
];
