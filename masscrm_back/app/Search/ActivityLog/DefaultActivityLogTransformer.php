<?php
declare(strict_types=1);

namespace App\Search\ActivityLog;

use App\Models\ActivityLog\AbstractActivityLog;
use App\Models\User\User;
use App\Search\SearchableTransform;

abstract class DefaultActivityLogTransformer extends SearchableTransform
{
    use ActivityLogHelper;

    protected array $data = [];

    public function transform(AbstractActivityLog $activityLog): array
    {
        /** @var User $user */
        $user = $activityLog->user;

        $this->data = [
            DefaultActivityLogConfigurator::MESSAGE_FIELD => $this->getMessage($activityLog),
            DefaultActivityLogConfigurator::USER_NAME_FIELD => $user->getFullNameAttribute(),

            // Dates
            AbstractActivityLog::CREATED_AT => $activityLog->getCreatedAt()->format(self::DATE_FORMAT)
        ];

        return $this->data;
    }
}
