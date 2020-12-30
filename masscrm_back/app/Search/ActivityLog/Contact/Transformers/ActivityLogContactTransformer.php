<?php
declare(strict_types=1);

namespace App\Search\ActivityLog\Contact\Transformers;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Models\ActivityLog\ActivityLogContact;
use App\Search\ActivityLog\DefaultActivityLogTransformer;

class ActivityLogContactTransformer extends DefaultActivityLogTransformer
{
    protected array $data = [];

    public function transform(AbstractActivityLog $activityLog): array
    {
        return parent::transform($activityLog) + [
                ActivityLogContact::CONTACT_ID_FIELD => $activityLog->getContactId()
            ];
    }
}
