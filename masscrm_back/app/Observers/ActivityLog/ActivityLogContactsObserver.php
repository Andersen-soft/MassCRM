<?php declare(strict_types=1);

namespace App\Observers\ActivityLog;

use App\Models\ActivityLog\ActivityLogContact;
use App\Models\Contact\Contact;
use App\Models\ReportPageLog;


class ActivityLogContactsObserver
{
    public function created(ActivityLogContact $activityLogContact): void
    {
        if ($activityLogContact->activity_type === ActivityLogContact::CREATED_BASE_MODEL_EVENT &&
            $activityLogContact->model_name === Contact::MODEL_NAME) {
            ReportPageLog::createLog($activityLogContact, ActivityLogContact::ACTIVITY_LOG_CONTACT)
                ->increaseCreatedValue()
                ->save();
        }
    }
}
