<?php

namespace App\Commands\ActivityLog\Company;


class ShowActivityLogCompanyCommand
{
    protected int $companyId;
    protected int $page;
    protected int $limit;

    public function __construct(int $companyId, int $page = 1, int $limit = 50)
    {
        $this->companyId = $companyId;
        $this->page = $page;
        $this->limit = $limit;
    }

    public function getCompanyId(): int
    {
        return $this->companyId;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getLimit(): int
    {
        return $this->limit;
    }
}
