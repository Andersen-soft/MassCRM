<?php declare(strict_types=1);

namespace App\Listeners\ReportPage;

use App\Events\ReportPage\CountUpdatedForReportPageEvent;
use App\Models\ActivityLog\ActivityLogCompany;
use App\Models\ReportPageLog;
use App\Repositories\ActivityLog\ActivityLogCompanyRepository;
use App\Repositories\Company\VacancyRepository;
use Carbon\Carbon;

class CountUpdatedForReportPageListeners
{
    public VacancyRepository $vacancyRepository;

    public ActivityLogCompanyRepository $activityLogCompanyRepository;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(
        VacancyRepository $vacancyRepository,
        ActivityLogCompanyRepository $activityLogCompanyRepository
    )
    {
        $this->vacancyRepository = $vacancyRepository;
        $this->activityLogCompanyRepository = $activityLogCompanyRepository;
    }

    /**
     * Handle the event.
     *
     * @param CountUpdatedForReportPageEvent $event
     * @return void
     */
    public function handle(CountUpdatedForReportPageEvent $event)
    {
        $contact = $event->contact;

        $vacancyName = $event->data['companyVacancies']['vacancy'][0]['job'];
        if (!$contact->created_at->isToday()) {
            $vacancies = $this->vacancyRepository->getVacancyForReportPageStatistic($contact, $vacancyName);

            if (!$vacancies) {
                return;
            }

            $activityLogCompany = $this->activityLogCompanyRepository->getActiveLogForVacancy($vacancies, $event->user);

            if (!$activityLogCompany) {
                return;
            }

            ReportPageLog::createLog(
                $activityLogCompany,
                ActivityLogCompany::ACTIVITY_LOG_COMPANIES,
                $contact->id
            )->increaseUpdatedValue()->save();
        }
    }
}
