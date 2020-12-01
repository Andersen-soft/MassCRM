<?php declare(strict_types=1);

namespace App\Services\Blacklist;

use App\Events\User\CreateSocketUserNotificationEvent;
use App\Jobs\ExportBlackList;
use App\Models\Blacklist;
use App\Models\Process;
use App\Models\User\User;
use App\Models\User\UsersNotification;
use App\Repositories\Blacklist\BlacklistRepository;
use App\Services\Process\ProcessService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Lang;

class BlacklistExportService
{
    private const FILE_EXTENSION = '.csv';
    private const DUPLICATES_PREFIX = 'blacklist_';
    private const DATE_TIME_FORMAT = 'd.m.Y H:i';

    private BlacklistRepository $blacklistRepository;
    private ProcessService $processService;

    public function __construct(BlacklistRepository $blacklistRepository, ProcessService $processService)
    {
        $this->blacklistRepository = $blacklistRepository;
        $this->processService = $processService;
    }

    public function initExport(array $search, array $sort, User $user): void
    {
        $process = $this->processService->createProcess(
            Process::TYPE_PROCESS_EXPORT_BLACKLIST,
            $user,
            Lang::get('export.blacklist.export_blacklist')
        );

        ExportBlackList::dispatch($search, $sort, $user, $process);
    }

    public function export(Process $process, array $search, array $sort, User $user): void
    {
        $domains = $this->blacklistRepository->getListDomains($search, $sort)->cursor();
        $filePath = storage_path('export/')
            . self::DUPLICATES_PREFIX
            . Carbon::now()->timestamp
            . self::FILE_EXTENSION;
        $file = fopen($filePath, 'w+');

        fputcsv($file, Lang::get('export.blacklist.headers'));

        /** @var Blacklist $domain */
        foreach ($domains as $domain) {
            fputcsv($file, [
                $domain->domain,
                $domain->source,
                $domain->created_at->format(self::DATE_TIME_FORMAT)
            ]);
        }

        CreateSocketUserNotificationEvent::dispatch(
            UsersNotification::TYPE_EXPORT_BLACKLIST_FINISHED,
            Lang::get('export.blacklist.export_finished'),
            [$user],
            $filePath
        );

        $this->processService->updateStatusProcess($process, Process::TYPE_STATUS_PROCESS_DONE, $filePath);
    }
}
