<?php
namespace App\Repositories\Process;

use App\Models\Process;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ProcessRepository
{
    public function getCountProcess(User $user, string $type, array $statuses): int
    {
        return Process::query()
            ->where(['user_id' => $user->id, 'type' => $type])
            ->whereIn('status', $statuses)
            ->count();
    }

    public function getListProcessExport(array $types, array $search): Builder
    {
        $query = Process::query()->select(['processes.*'])
            ->join('users', 'processes.user_id', '=', 'users.id')
            ->whereIn('type', $types);
        $query = $this->setParamsSearch($search, $query);

        return $query->groupBy('processes.id')->latest('updated_at');
    }

    private function setParamsSearch(array $search, Builder $query): Builder
    {
        if (empty($search)) {
            return $query;
        }

        foreach ($search as $key => $value) {
            switch ($key) {
                case 'name':
                    $query->where('processes.name', 'ILIKE', '%' . $value . '%');
                    break;
                case 'user':
                    $query->where(
                        DB::raw("concat_ws(' ', users.name, users.surname)"),
                        'ILIKE',
                        '%' . $value . '%'
                    );
                    break;
                case 'status':
                    $query->where('processes.status', '=', $value);
                    break;
                case 'date':
                    $query->whereBetween('processes.updated_at',
                        [Carbon::parse($value['min'])->startOfDay(), Carbon::parse($value['max'])->endOfDay()]
                    );
                    break;
                default:
                    break;
            }
        }

        return $query;
    }
}
