<?php

namespace App\Services\Contact;

use App\Repositories\Company\CompanyRepository;
use App\Repositories\Contact\ContactRepository;
use App\Services\ActivityLog\ActivityLogContactService;

class BaseContactService
{
    public ContactRepository $contactRepository;
    public ActivityLogContactService $activityLogContactService;
    public CompanyRepository $companyRepository;
    public ContactEmailService $contactEmailService;
    public ContactNotesService $contactNotesService;
    public ContactPhoneService $contactPhoneService;
    public ContactSocialNetworkService $contactSocialNetworkService;

    public function __construct(
        ContactRepository $contactRepository,
        ActivityLogContactService $activityLogContactService,
        CompanyRepository $companyRepository,
        ContactEmailService $contactEmailService,
        ContactPhoneService $contactPhoneService,
        ContactNotesService $contactNotesService,
        ContactSocialNetworkService $contactSocialNetworkService
    ) {
        $this->contactRepository = $contactRepository;
        $this->activityLogContactService = $activityLogContactService;
        $this->companyRepository = $companyRepository;
        $this->contactEmailService = $contactEmailService;
        $this->contactPhoneService = $contactPhoneService;
        $this->contactNotesService = $contactNotesService;
        $this->contactSocialNetworkService = $contactSocialNetworkService;
    }
}
