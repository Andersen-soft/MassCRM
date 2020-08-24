<?php

namespace App\Services\Reports;

use App\Models\Contact\Contact;
use App\Repositories\Report\ReportRepository;

class ReportFileService extends AbstractReport implements ReportInterface
{
    private ReportRepository $reportRepository;

    public function __construct(ReportRepository $reportRepository)
    {
        $this->reportRepository = $reportRepository;
    }

    public function fetchReport(Contact $contact, array $pathMethods): array
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

    public function getCollectionsContacts(array $input): iterable
    {
        $query = $this->reportRepository->buildQueryReport($input);
        return $query->cursor();
    }
}
