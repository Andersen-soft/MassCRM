<?php

namespace App\Console\Commands;

use App\Models\ActivityLog\ActivityLogContact;
use App\Models\Contact\Contact;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class FixContactCompanyIdActivityLog extends Command
{
    private int $chunkSize = 100;
    private const DATA_OLD_FIELD = 'data_old';
    private const DATA_NEW_FIELD = 'data_new';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contactActivityLog:fixCompanyId
                            {--f|first : running command first time}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Change values from company name to company id and company name array';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $progressBar = $this->output->createProgressBar($this->getCompanyIdActivityLogsQuery()->count());
        $progressBar->start();

        $this->getCompanyIdActivityLogsQuery()->chunkById($this->chunkSize, function (Collection $logs) use ($progressBar) {
            $dataOldUpdates = [];
            $dataNewUpdates = [];
            foreach ($logs as $log) {
                $dataOldUpdates[$log->id] = $log->old_id ? $this->encodeOldCompanyValue($log) : null;
                $dataNewUpdates[$log->id] = $log->new_id ? $this->encodeNewCompanyValue($log) : null;
            }

            $this->updateDataField(self::DATA_OLD_FIELD, $dataOldUpdates);
            $this->updateDataField(self::DATA_NEW_FIELD, $dataNewUpdates);

            $progressBar->advance(count($logs));
        }, 'activity_log_contacts.id', 'id');

        $progressBar->finish();
        $this->info("\nJob done!");

        return 0;
    }

    private function getCompanyIdActivityLogsQuery(): Builder
    {
        $query = ActivityLogContact::query();

        if ($this->option('first')) {
            $query->leftJoin(
                'companies as old_companies',
                'activity_log_contacts.data_old', '=', 'old_companies.name'
            )
                ->leftJoin(
                'companies as new_companies',
                'activity_log_contacts.data_new', '=', 'new_companies.name'
            );
        } else {
            $query->join(
                'companies as old_companies',
                'activity_log_contacts.data_old', '=', 'old_companies.name'
            )
                ->join(
                'companies as new_companies',
                'activity_log_contacts.data_new', '=', 'new_companies.name'
            );
        }

        return $query->select(
                'activity_log_contacts.*',
                'old_companies.id as old_id',
                'new_companies.id as new_id'
            )
            ->where('activity_log_contacts.model_field', Contact::COMPANY_ID_FIELD)
            ->orderBy('activity_log_contacts.id');
    }

    private function encodeOldCompanyValue(ActivityLogContact $log): string
    {
        return json_encode([
           'id' => $log->old_id,
           'name' => str_replace("'", "''", $log->data_old)
        ]);
    }

    private function encodeNewCompanyValue(ActivityLogContact $log): string
    {
        return json_encode([
            'id' => $log->new_id,
            'name' => str_replace("'", "''", $log->data_new)
        ]);
    }

    private function updateDataField(string $fieldName, array $updateArray): void
    {
        if (!count($updateArray)) {
            return;
        }

        $updateValues = [];
        foreach ($updateArray as $logId => $companyId) {
            if (!$companyId) {
                $updateValues[] = "({$logId}, NULL)";
                continue;
            }

            $updateValues[] = "({$logId}, '{$companyId}')";
        }

        $updateValues = implode(', ', $updateValues);
        $queryString =
            "UPDATE activity_log_contacts SET $fieldName = tmp.$fieldName
             FROM (values $updateValues) as tmp (id, $fieldName)
             WHERE activity_log_contacts.id = tmp.id";

        DB::update($queryString);
    }
}
