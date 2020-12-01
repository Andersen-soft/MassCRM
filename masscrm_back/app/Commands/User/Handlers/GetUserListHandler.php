<?php

declare(strict_types=1);

namespace App\Commands\User\Handlers;

use App\Commands\User\GetUserListCommand;
use App\Repositories\User\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GetUserListHandler
{
    protected UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function handle(GetUserListCommand $command): LengthAwarePaginator
    {
        return $this->repository->getUserList(
            $command->getSearch(),
            $command->getSort()
        )->paginate($command->getLimit());
    }
}
