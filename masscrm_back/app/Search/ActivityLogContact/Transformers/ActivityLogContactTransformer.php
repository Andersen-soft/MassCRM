<?php

namespace App\Search\ActivityLogContact\Transformers;

use App\Models\ActivityLog\ActivityLogContact;
use App\Models\User\User;
use App\Search\ActivityLogContact\ActivityLogContactIndexConfigurator;
use App\Search\SearchableTransform;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Lang;

class ActivityLogContactTransformer extends SearchableTransform
{
    protected array $data = [];

    public function transform(ActivityLogContact $activityLog): array
    {
        /** @var User $user */
        $user = $activityLog->user;

        $this->data = [
            ActivityLogContact::CONTACT_ID_FIELD => $activityLog->getContactId(),
            ActivityLogContactIndexConfigurator::MESSAGE_FIELD => $this->getMessage($activityLog),
            ActivityLogContactIndexConfigurator::USER_NAME_FIELD => $user->getFullNameAttribute(),

            // Dates
            ActivityLogContact::CREATED_AT => $activityLog->getCreatedAt()->format(self::DATE_FORMAT),
            ActivityLogContact::UPDATED_AT => $activityLog->getUpdatedAt()->format(self::DATE_FORMAT),
        ];

        return $this->data;
    }

    public function getMessage(ActivityLogContact $activityLog): array
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
            if (!Lang::has($messageKey, $local)) {
                continue;
            }
            $messages[] = Lang::get($messageKey, $replace, $local);
        }

        return $messages;
    }

    private function getLocales(): array
    {
        return Cache::remember('locales', now()->addMinutes(30), function () {
            return array_map(static function ($value) {
                return basename($value);
            }, glob(App::langPath() . '/*', GLOB_ONLYDIR));
        });
    }
}
