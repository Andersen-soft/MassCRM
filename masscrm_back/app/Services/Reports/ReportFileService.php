<?php

namespace App\Services\Reports;

use App\Events\User\CreateSocketUserNotificationEvent;
use App\Jobs\ExportContactList;
use App\Models\Contact\Contact;
use App\Models\Process;
use App\Models\User\User;
use App\Models\User\UsersNotification;
use App\Repositories\Report\ReportRepository;
use App\Services\Process\ProcessService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\LazyCollection;
use League\Csv\Writer as CsvWriter;

class ReportFileService extends AbstractReport
{
    private const PARAMS_SEARCH_GENERATE_NAME_PROCESS = ['country', 'city', 'company_industries', 'position', 'gender'];

    private ReportRepository $reportRepository;
    private Contact $contact;
    private ProcessService $processService;

    public function __construct(
        ReportRepository $reportRepository,
        ProcessService $processService,
        Contact $contact
    )
    {
        $this->reportRepository = $reportRepository;
        $this->processService = $processService;
        $this->contact = $contact;
    }

    private function fetchReport(Contact $contact, array $pathMethods): array
    {
        $data = $this->generateReport($contact, $pathMethods);
        $report = [];
        foreach ($pathMethods as $key => $pathMethod) {
            if (array_key_exists($key, $data)) {
                if (is_array($data[$key])) {
                    $data[$key] = implode('; ', $data[$key]);
                }
                $report[] = $data[$key];
            } else {
                $report[] = '';
            }
        }

        return $report;
    }

    private function getCollectionsContacts(array $search, array $sort, bool $isInWork): LazyCollection
    {
        $contacts = $this->reportRepository->buildQueryReport($search, $sort);

        if ($isInWork) {
            $this->contact->updateIsInWorkAndDate($contacts);
        }

        return $contacts->cursor();
    }

    public function export(
        Process $process,
        array $listField,
        array $search,
        array $sort,
        string $typeFile,
        User $user,
        bool $isInWork
    ): void
    {
        $filePath = storage_path('export/report_' . Carbon::now()->timestamp . '.'.$typeFile);
        $writer = CsvWriter::createFromPath($filePath, 'w+');

        $listHeaders = $this->getListHeaders($listField);
        $writer->insertOne($listHeaders['headers']);
        $data = $this->getCollectionsContacts($search, $sort, $isInWork);

        /** @var Contact $item */
        foreach ($data as $item) {
            $writer->insertOne(
                $this->fetchReport($item, $listHeaders['pathMethods'])
            );
        }

        CreateSocketUserNotificationEvent::dispatch(
            UsersNotification::TYPE_EXPORT_CONTACTS_FINISHED,
            Lang::get('export.contacts.export_finished'),
            [$user],
            $filePath
        );

        $this->processService->updateStatusProcess($process, Process::TYPE_STATUS_PROCESS_DONE, $filePath);
    }

    public function initExport(
        array $listField,
        array $search,
        array $sort,
        string $typeFile,
        User $user,
        bool $isInWork
    ): void
    {
        $process = $this->processService->createProcess(
            Process::TYPE_PROCESS_EXPORT_CONTACT,
            $user,
            $this->setProcessName($search)
        );

        ExportContactList::dispatch($listField, $search, $sort, $typeFile, $user, $process, $isInWork);
    }

    private function setProcessName(array $search): string
    {
        $params = '';
        foreach ($search as $key => $item) {
            if (in_array($key, self::PARAMS_SEARCH_GENERATE_NAME_PROCESS, true)) {
                $params = $this->generateName($key, $item);
            }
        }

        return Lang::get('export.contacts.export_contacts', ['params' => $params]);
    }

    private function generateName(string $key, $values): string
    {
        if (is_array($values)) {
            if ($key === Contact::GENDER_FIELD) {
                $values = $this->getGendersFromFilter($values);
            }

            return implode(', ', $values);
        }

        return $values;
    }

    private function getGendersFromFilter(array $genders): array
    {
        $listGender = [];
        foreach ($genders as $gender) {
            $listGender[] = Lang::get('filters.genders.' . $gender);
        }

        return $listGender;
    }
}
