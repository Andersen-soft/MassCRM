<?php

declare(strict_types=1);

namespace App\Imports\Contact\Parsers;

use App\Models\CampaignStatus;
use App\Models\Contact\ContactCampaigns;
use App\Models\Industry;
use PhpOffice\PhpSpreadsheet\Worksheet\Row;

/**
 * Class ParserMain
 * @package App
 */
abstract class ParserMain
{
    public array $statuses = [];

    public array $industries = [];

    public array $headers = [];

    public function rowToArray($row, int $strictCountColumn): array
    {
        $arr = [];
        $i = 0;
        foreach ($row as $cell) {
            if ($i >= $strictCountColumn) {
                break;
            }

            $arr[] = $cell !== '' ? trim((string)$cell) : null;
            $i++;
        }

        return $arr;
    }

    public function createOrGetStatus(string $statusName): CampaignStatus
    {
        if (array_key_exists($statusName, $this->statuses)) {
            return $this->statuses[$statusName];
        }

        $status = CampaignStatus::where('name', $statusName)->first();
        if (!$status instanceof CampaignStatus) {
            $status = (new CampaignStatus())->setName($statusName);
            $status->save();
        }
        $this->statuses[$statusName] = $status;

        return $status;
    }

    public function getSequences(string $sequences, string $statuses): array
    {
        $seq = [];
        $sequences = explode(';', $sequences);
        $statuses = explode(';', $statuses);

        foreach ($sequences as $key => $sequence) {
            $statusName = trim($statuses[$key]);
            if ($statusName === '') {
                continue;
            }
            $status = $this->createOrGetStatus(trim($statuses[$key]));
            $seq[] = (new ContactCampaigns())
                ->setSequence(trim($sequence))
                ->status()
                ->associate($status);
        }

        return $seq;
    }

    public function getSizes(?string $size): array
    {
        $sizes = [
            'min' => null,
            'max' => null
        ];
        if (!$size) {
            return $sizes;
        }

        list($size) = explode(' ', $size);
        if (strpos($size, '+') !== false) {
            $sizes['min'] = (int)str_replace(['+', '.', ','], '', $size);
        } elseif (strpos($size, '-') !== false) {
            list($min, $max) = explode('-', $size);
            $sizes['min'] = (int)$min;
            $sizes['max'] = (int)$max;
        } else {
            $sizes['max'] = (int)str_replace(['+', '.', ',', '-'], '', $size);
        }

        return $sizes;
    }
}
