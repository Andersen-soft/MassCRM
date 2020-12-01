<?php declare(strict_types=1);

namespace App\Repositories\CampaignStatus;

use App\Models\CampaignStatus;

class CampaignStatusRepository
{
    public function getCampaignStatusFromId(int $statusId): ?CampaignStatus
    {
        return CampaignStatus::query()->find($statusId);
    }
}
