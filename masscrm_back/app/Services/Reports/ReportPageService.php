<?php declare(strict_types=1);

namespace App\Services\Reports;

use App\Commands\Report\GetReportPageListCommand;
use App\Services\Contact\BaseContactService;
use Illuminate\Database\Eloquent\Builder;

class ReportPageService
{
    private BaseContactService $baseContactService;

    public function __construct(BaseContactService $baseContactService)
    {
        $this->baseContactService = $baseContactService;
    }

    public function getReportList(GetReportPageListCommand $command): Builder
    {
        $search = $command->getSearch();
        $sort = $command->getSort();
        $user = $command->getUser();

        foreach ($user->roles as $role) {
            if ($role === 'manager') {
                return $this->baseContactService->reportRepository->getReportListForManagers($search, $sort);
            }
            if ($role === 'nc1' || 'nc2') {
                return $this->baseContactService->reportRepository->getReportListForNC($search, $sort, $user->id);
            }
        }
    }
}
