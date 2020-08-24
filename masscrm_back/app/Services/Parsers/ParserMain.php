<?php

namespace App\Services\Parsers;

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
    protected const MAX_EMPTY_CELL = 20;
    protected array $statuses = [];
    protected array $industries = [];
    protected array $headers = [];

    protected string $responsible;

    protected function rowToArray(Row $row): array
    {
        $arr = [];
        $empty = 0;
        foreach ($row->getCellIterator('A', 'AF') as $cell) {
            if ($empty === self::MAX_EMPTY_CELL) {
                break;
            }
            $value = $cell->getFormattedValue() !== '' ? $cell->getFormattedValue() : null;
            $arr[] = $value;
            is_null($value) ? $empty++ : $empty = 0;
        }

        return $arr;
    }

    protected function createOrGetStatus(string $statusName): CampaignStatus
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

    protected function getSequences(string $sequences, string $statuses): array
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

    protected function getSizes(string $size): array
    {
        $sizes = [
            'min' => null,
            'max' => null
        ];
        if ($size === '') {
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

    protected function findIndustry(string $industryName): ?Industry
    {
        if (array_key_exists($industryName, $this->industries)) {
            return $this->industries[$industryName];
        }

        $industry = Industry::where('name', 'ILIKE', $industryName)->first();
        if (!$industry) {
            return null;
        }

        $this->industries[$industryName] = $industry;
        return $industry;
    }

    protected function getValue(array $fields, array $arrayRow, string $field): string
    {
        $index = array_search($field, $fields);
        if (
            $index === false
            || !isset($arrayRow[$index])
            || is_null($arrayRow[$index])
        ) {
            return '';
        }

        return $arrayRow[$index];
    }
}
