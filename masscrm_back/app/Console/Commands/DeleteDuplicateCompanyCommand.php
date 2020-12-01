<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Company\Company;
use App\Repositories\Company\CompanyRepository;
use App\Services\Blacklist\ReplyService;
use Exception;
use Illuminate\Console\Command;

class DeleteDuplicateCompanyCommand extends Command
{
    private ReplyService $replyService;
    private CompanyRepository $companyRepository;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deleteDuplicateCompany:command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete duplicate companies';

    /**
     * Create a new command instance.
     *
     * @param ReplyService $replyService
     */
    public function __construct(ReplyService $replyService, CompanyRepository $companyRepository)
    {
        parent::__construct();

        $this->replyService = $replyService;
        $this->companyRepository = $companyRepository;
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        do {
            /** @var Company $company*/
            $company = $this->companyRepository->getCompanyForTransfer();
            var_dump($company->id);
            $oldCompanies = $this->companyRepository->getNotUniqueCompanyForDelete($company->name, $company->id);
            /** @var Company $oldCompany */
            foreach ($oldCompanies as $oldCompany) {
                if ($oldCompany->contacts()->exists()) {
                    $oldCompany->contacts()->update([
                        'company_id' => $company->id
                    ]);
                }

                Company::destroy($oldCompany->id);
            }

            $company->is_upload_collection = true;
            $company->save();
        } while ($company);
    }
}
