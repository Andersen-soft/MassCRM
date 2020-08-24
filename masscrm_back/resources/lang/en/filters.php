<?php

use App\Models\Company\Company;

return [
    'column_separator' => [
        'semicolon' => 'Semicolon',
        'comma' => 'Comma',
        'space' => 'Space',
        'tab' => 'Tab',
    ],
    'contacts_type' => [
        'customers' => 'Customers',
        'partners' => 'Partners',
    ],
    'import_source' => [
        'recommendation' => 'Recommendation',
        'site' => 'Site',
        'social_network' => 'Social network',
        'mail' => 'Email',
    ],
    'fields' => [
        'first_name' => 'First Name',
        'last_name' => 'Last Name',
        'email' => 'Email',
        'company' => 'Company',
        'phone' => 'Phone',
        'city' => 'City',
        'region' => 'Region',
        'country' => 'Country',
        'c_linkedin' => 'Contact linkedin',
        'c_social' => 'Contact social network',
        'comp_linkedin' => 'Company linkedin',
        'position' => 'Position',
        'website' => 'Website',
        'industry' => 'Industry',
        'comp_size' => 'Company Size',
        'confidence' => 'Confidence',
        'c_comment' => 'Contact comment',
        'comp_comment' => 'Company comment',
        'service_id' => 'id',
        'added_to_mailing' => 'Added to mailing',
        'last_touch' => 'Last Touch',
        'sequence' => 'Sequence',
        'status' => 'Status',
        'opens' => 'Opens',
        'views' => 'Views',
        'deliveries' => 'Deliveries',
        'replies' => 'Replies',
        'bounces' => 'Bounces',
        'skip' => 'Skip'
    ],
    'genders' => [
        'f' => 'Female',
        'm' => 'Male',
    ],
    'company_size' => [
        [
            'name' => 'Self-emploed',
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
    'origin' => ['NC1', 'NC2', 'Parser', 'Purchase', 'Legasy', 'Reply', 'Lemlist'],
    'company_type' => [Company::TYPE_COMPANY_HOLDING, Company::TYPE_COMPANY_SUBSIDIARY],
];
