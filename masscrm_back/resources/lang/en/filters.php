<?php

use App\Models\Company\Company;
use App\Models\Process;
use Illuminate\Support\Facades\Lang;

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
        'skip' => 'Skip',
        'first_name' => 'First Name',
        'last_name' => 'Last Name',
        'full name' => 'Full name',
        'gender' => 'Gender',
        'date_of_birth' => 'Date of birth',
        'country' => 'Country',
        'region' => 'Region',
        'city' => 'City',
        'position' => 'Position',
        'c_linkedin' => 'Contact linkedIn',
        'c_social' => 'Other social network',
        'phone' => 'Phone',
        'skype' => 'Skype',
        'email' => 'E-mail',
        'requires_validation' => 'Requires validation',
        'confidence' => 'Confidence',
        'colleague' => 'Colleague',
        'service_id' => 'ID',
        'added_to_mailing' => 'Added to mailing',
        'last_touch' => 'Last Touch',
        'sequence' => 'Sequence',
        'status' => 'Status',
        'opens' => 'Opens',
        'views' => 'Views',
        'deliveries' => 'Deliveries',
        'replies' => 'Replies',
        'bounces' => 'Bounces',
        'mails' => 'Mails',
        'my_notes' => 'My notes',
        'sale_created' => 'Sale created',
        'source' => 'Source',
        'sale_id' => 'Sale ID',
        'sale_status' => 'Sale status',
        'sale_project_c1' => '1C Project',
        'c_comment' => 'Comment',
        'company' => 'Company',
        'website' => 'Website',
        'comp_linkedin' => 'Company LinkedIn',
        'sto' => 'CTO',
        'industry' => 'Industry',
        'comp_size' => 'Company Size',
        'comp_type' => 'Type of company',
        'subsidiaries' => 'Subsidiary companies',
        'holding' => 'Holding company',
        'founded' => 'Founded',
        'job' => 'Job',
        'job_skills' => 'Job skills',
        'job_urls' => 'Job url',
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
            'max' => null
        ],
    ],
    'origin' => ['NC1', 'NC2', 'Parser', 'Purchase', 'Legacy', 'Reply', 'Lemlist'],
    'company_type' => [Company::TYPE_COMPANY_HOLDING, Company::TYPE_COMPANY_SUBSIDIARY],
    'export_status' => [
        Process::TYPE_STATUS_PROCESS_WAIT => Lang::get('export.statuses.' . Process::TYPE_STATUS_PROCESS_WAIT),
        Process::TYPE_STATUS_PROCESS_IN_PROGRESS =>
            Lang::get('export.statuses.' . Process::TYPE_STATUS_PROCESS_IN_PROGRESS),
        Process::TYPE_STATUS_PROCESS_FAILED => Lang::get('export.statuses.' . Process::TYPE_STATUS_PROCESS_FAILED),
        Process::TYPE_STATUS_PROCESS_DONE => Lang::get('export.statuses.' . Process::TYPE_STATUS_PROCESS_DONE)
    ]
];
