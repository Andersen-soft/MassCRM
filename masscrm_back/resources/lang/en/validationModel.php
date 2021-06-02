<?php declare(strict_types=1);

return [
    'company' => [
        'company_name_already_exist' => 'The company name is already exist.',
        'company_name_required' => 'The company name is required.',
        'company_name_string' => 'The company name must be a string.',
        'company_website_already_exist' => 'The company website is already exist.',
        'company_website_invalid' => 'The company website is invalid',
        'company_website_required' => 'The company website is required.',
        'company_website_url' => 'The company website format is invalid, should be format URL.',
        'company_linkedIn_already_exist' => 'The company LinkedIn  is already exist.',
        'company_linkedIn_regex' => 'The company LinkedIn ":value" format is invalid.',
        'company_type_error' => 'The company type ":value" selected is invalid. Company type can be Subsidiary or Holding',
        'founded_date' => 'The founded is not a valid date.',
        'company_vacancies_has_active_of_another_user' => 'The company has active vacancies of another user. Try in :days days.',
        'company_vacancies_timed_out' => 'Vacancies update timed out. Try in :days days.',
        'company_vacancies_doesnt_fill_in' => 'Company vacancies does not fill in',
    ],
    'industry' => [
        'name_not_exist' => 'The industry name ":value" not exist in database.'
    ],
    'holding' => [
        'name_not_exist' => 'The holding company name ":value" not exist in database.'
    ],
    'subsidiaries' => [
        'name_not_exist' => 'The subsidiary company name ":input" not exist in database.'
    ],
    'vacancy' => [
        'name_invalid_count' => 'Count names vacancies should be like Job skills or Job URL.',
        'url_invalid' => 'The URL vacancy ":input" format is invalid'
    ],
    'social_network' => [
        'invalid_url' => 'The URL :input Social Network format is invalid',
        'url_already_exist' => 'The URL :input Social Network is already exist.'
    ],
    'contact' => [
        'contact_linkedIn_already_exist' => 'The contact LinkedIn  is already exist.',
        'contact_linkedIn_regex' => 'The contact LinkedIn ":input" format is invalid.',
        'service_id_integer' => 'The ID must be an number',
        'last_touch_date_invalid' => 'The Last touch is not a valid date',
        'added_to_mailing_date_invalid' => 'The Added to mailing is not a valid date',
        'not_responsible' => 'You are not responsible for this contact.'
    ],
    'contactEmail' => [
        'email_invalid' => 'The contact E-mail :input format is invalid.',
        'email_invalid_count' => 'The contact E-mail :input should be like Requires validation',
        'email_duplicate' => 'The contact E-mail ":value" is already exist',
    ],
    'contactPhone' => [
        'phone_invalid' => 'The contact phone :input format is invalid.'
    ],
    'not_found' => 'The :model not found',
];
