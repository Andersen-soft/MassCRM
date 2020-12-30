<?php
declare(strict_types=1);

namespace App\Search\ActivityLog;

use App\Models\ActivityLog\AbstractActivityLog;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Lang;

trait ActivityLogHelper
{
    public function getMessage(AbstractActivityLog $activityLog): array
    {
        $messages = [];

        $messageKey = 'activityLog.'
            . $activityLog->getModelName() . '_'
            . $activityLog->getActivityType() . '_'
            . $activityLog->getModelField();

        $replace = [
            'modelField' => $activityLog->getModelField(),
            'dataOld' => $activityLog->getDataOld(),
            'dataNew' => $activityLog->getDataNew(),
            'additionalInfoForData' => $activityLog->getAdditionalInfoForData()
        ];

        foreach ($this->getLocales() as $local) {
            if (!Lang::has($messageKey)) {
                continue;
            }
            $messages[] = Lang::get($messageKey, $replace, $local);
        }

        return $messages;
    }

    public function getLocales(): array
    {
        return Cache::remember('locales', now()->addMinutes(30), function () {
            return array_map(static function ($value) {
                return basename($value);
            }, glob(App::langPath() . '/*', GLOB_ONLYDIR));
        });
    }
}
