<?php

namespace App\Services\Reports;

use App\Models\Contact\Contact;

interface ReportInterface
{
    public function fetchReport(Contact $contact, array $pathMethods): array;

    public function getCollectionsContacts(array $input): iterable;
}
