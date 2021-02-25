<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\Company\CompanyService;
use Exception;
use Illuminate\Console\Command;

class DeactivateCompanyVacancy extends Command
{
    private CONST DAYS_TO_DEACTIVATE_VACANCY = 90;

    private CompanyService $companyService;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deactivate:vacancy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'deactivate company vacancy';

    /**
     * Create a new command instance.
     *
     * @param CompanyService $companyService
     */
    public function __construct(CompanyService $companyService)
    {
        parent::__construct();

        $this->companyService = $companyService;
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        try {
            $this->companyService->deactivateVacancies(self::DAYS_TO_DEACTIVATE_VACANCY);
        } catch (Exception $exception) {
            app('sentry')->captureException($exception);
        }
    }
}
