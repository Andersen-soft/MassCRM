<?php

namespace App\Commands\Contact\Handlers;

use App\Commands\Contact\GetContactListCommand;
use App\Models\Company\Company;
use App\Models\User\User;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactSale;
use App\Repositories\Contact\ContactRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GetContactListHandler
{
    protected ContactRepository $repository;

    public function __construct(ContactRepository $repository)
    {
        $this->repository = $repository;
    }

    public function handle(GetContactListCommand $command): LengthAwarePaginator
    {
        $searchArr = $command->getSearch();
        $tmp = $searchArr;
        $search = [];
        unset($tmp[Company::COMPANY_FIELD]);
        unset($tmp[ContactSale::SALE]);
        if (!empty($tmp)) {
            $search[Contact::CONTACT] = $tmp;
        }
        if (isset($searchArr[Company::COMPANY_FIELD])) {
            $search[Company::COMPANY_FIELD] = $searchArr[Company::COMPANY_FIELD];
        }
        if (isset($searchArr[ContactSale::SALE])) {
            $search[ContactSale::SALE] = $searchArr[ContactSale::SALE];
        }

        return $this->repository->getContactList(
            $search,
            $command->getSort(),
            $command->getLimit(),
            !$command->getUser()->hasRole(User::USER_ROLE_MANAGER) ? $command->getUser() : null
        );
    }
}
