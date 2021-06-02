<?php declare(strict_types=1);

namespace App\Commands\Report;

use App\Models\User\User;

class GetReportPageListCommand
{
    public const DEFAULT_LIMIT = 10;
    public const DEFAULT_PAGE = 1;

    protected array $search;
    protected array $sort;
    protected User $user;

    public function __construct(User $user, array $search, array $sort)
    {
        $this->search = $search;
        $this->sort = $sort;
        $this->user = $user;
    }

    public function getSearch(): array
    {
        return $this->search;
    }

    public function getSort(): array
    {
        return $this->sort;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
