<?php

namespace App\Services\Contact;

use App\Repositories\Contact\ContactRepository;

class ContactService
{
    private const AMOUNT_EXPECTED_DAILY_PLAN = 30;

    private ContactRepository $contactRepository;

    public function __construct(ContactRepository $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }

    public function getCounterDailyPlanUser(int $userId): array
    {
        return [
            'count' => $this->contactRepository->getCounterDailyPlanUser($userId),
            'expected' => self::AMOUNT_EXPECTED_DAILY_PLAN
        ];
    }
}
