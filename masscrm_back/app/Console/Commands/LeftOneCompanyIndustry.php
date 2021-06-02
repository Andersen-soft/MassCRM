<?php

namespace App\Console\Commands;

use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\Company\Company;
use Illuminate\Console\Command;
use \Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class LeftOneCompanyIndustry extends Command
{
    private Collection $activityLog;
    private int $chunkSize = 100;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'company:leftOneIndustry';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Left only one industry for companies';

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
        $this->activityLog = $this->getActivityLogForPolyIndustriesCompanies();

        $progressBar = $this->output->createProgressBar(
            $this->getPolyIndustriesCompaniesQuery()->toBase()->getCountForPagination()
        );
        $progressBar->start();

        $this->getPolyIndustriesCompaniesQuery()->chunkById($this->chunkSize, function ($companies) use ($progressBar) {
            foreach ($companies as $company) {
                $company->industries()->sync($this->chooseLatestCompanyIndustryId($company));
                $progressBar->advance();
            }
        });

        $progressBar->finish();
        $this->info("\nJob done!");
        $this->warn("Need to run command: php artisan transferCompany:command industries -f");

        return 0;
    }

    private function chooseLatestCompanyIndustryId(Company $company): int
    {
        $industryId = $this->getLatestAddedIndustryIdFromLogs($company);

        if ($industryId) {
            return $industryId;
        }

        return $company->industries->max('id');
    }

    private function getLatestAddedIndustryIdFromLogs(Company $company): ?int
    {
        $companyAddIndustryLog =  $this->activityLog
            ->where('company_id', '=', $company->id)
            ->sortByDesc('created_at');

        if (!$companyAddIndustryLog->count()) {
            return null;
        }

        foreach ($companyAddIndustryLog as $logRow) {
            if ($logRow->log_info) {
                $loggedIndustryId = $logRow->log_info['id'];
                $companyIndustry = $company->industries->where('id', '=', $loggedIndustryId)->first();

                if ($companyIndustry) {
                    return $companyIndustry->id;
                }
            }

            if ($logRow->data_new) {
                $logIndustryName = $logRow->data_new;
                $companyIndustry = $company->industries->where('name', '=', $logIndustryName)->first();

                if ($companyIndustry) {
                    return $companyIndustry->id;
                }
            }
        }

        return null;
    }

    private function getPolyIndustriesCompaniesQuery(): Builder
    {
        return Company::query()
            ->with(['industries'])
            ->leftJoin('companies_industries', 'companies.id', '=', 'companies_industries.company_id')
            ->select('companies.id', DB::raw('COUNT(companies_industries.company_id) as industries_count'))
            ->groupBy('companies.id')
            ->having(DB::raw('COUNT(companies_industries.company_id)'), '>', 1)
            ->orderBy('companies.id');
    }

    private function getActivityLogForPolyIndustriesCompanies(): Collection
    {
        return ActivityLogCompany::query()
            ->joinSub(
                $this->getPolyIndustriesCompaniesQuery(), 'companies',
                'activity_log_companies.company_id', '=', 'companies.id'
            )
            ->where('activity_log_companies.model_name', '=', 'CompanyIndustry')
            ->where('activity_log_companies.activity_type', '=', 'addNewValueField')
            ->orderBy('activity_log_companies.company_id')
            ->get();
    }
}
