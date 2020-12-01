<?php
declare(strict_types=1);

namespace App\Search;

use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use ScoutElastic\SearchRule;

/**
 * Class DefaultRule
 * @package App\Search
 */
abstract class DefaultSearchRule extends SearchRule
{
    /**
     * @var array
     */
    protected array $params;
    /**
     * @var array
     */
    protected array $searchFields = [];
    /**
     * @var array
     */
    protected array $dateFields = [];
    /**
     * @var array
     */
    protected array $rangeFields = [];
    /**
     * @var array
     */
    private array $preparedSearchFields = [];

    /**
     * @inheritdoc
     */
    public function buildQueryPayload(): array
    {
        $this->setQuery();

        $hasDates = (isset($this->params['from'], $this->params['to']));

        if (!isset($this->params['query']) && $hasDates) {
            return $this->searchByDates();
        }

        if (isset($this->params['query']) && $hasDates) {
            return $this->searchByQueryAndDates();
        }

        return $this->searchByQuery();
    }

    protected function setQuery(): void
    {
        try {
            $this->params = json_decode($this->builder->query, true, 512, JSON_THROW_ON_ERROR);
        } catch (\JsonException $exception) {
            Log::error($exception->getMessage());
            Log::error('Line: ' . $exception->getLine());
        }
    }


    protected function searchByQuery(): array
    {
        return [
            'must' => $this->prepareQueryString()
        ];
    }

    protected function searchByDates(): array
    {
        return [
            'must' => [
                'bool' => [
                    'should' => $this->prepareDatesRules()
                ]
            ]
        ];
    }

    protected function searchByQueryAndDates(): array
    {
        $condition = $this->isNumeric() ? 'should' : 'must';

        return [
            "must" => [
                [
                    "bool" => [
                        $condition => $this->prepareQueryString()
                    ]
                ],
                [
                    "bool" => $this->searchByDates()
                ]
            ]
        ];
    }

    protected function prepareSearchFields(array $fields = [], string $prefix = ''): array
    {
        $fields = !empty($fields) ? $fields : $this->searchFields;

        foreach ($fields as $field => $value) {

            if (isset($value['properties'])) {
                $this->prepareSearchFields($value['properties'], $field);
                continue;
            }

            if ($value['type'] !== 'text') {
                continue;
            }

            $field = !empty($prefix) ? $prefix . '.' . $field : $field;

            if (isset($value['boost'])) {
                $this->preparedSearchFields[] = "{$field}^{$value['boost']}";
                continue;
            }

            $this->preparedSearchFields[] = $field;
        }

        return $this->preparedSearchFields;
    }

    protected function prepareDatesRules(): array
    {
        $rule = [];

        if (!isset($this->params['from'], $this->params['to'])) {
            return $rule;
        }

        $dates = [
            'from' => Carbon::parse($this->params['from'])->format(SearchableTransform::DATE_FORMAT) ?? '',
            'to' => Carbon::parse($this->params['to'])->format(SearchableTransform::DATE_FORMAT) ?? ''
        ];

        foreach ($this->dateFields as $fieldName => $values) {
            $rule[] = [
                "range" => [
                    $fieldName => [
                        'gte' => $dates['from'],
                        'lte' => $dates['to'],
                        'boost' => $values['boost'] ?? '1.0'
                    ],
                ],
            ];
        }

        return $rule;
    }

    protected function prepareRangeRules(): array
    {
        $rule = [];

        if (!$this->isNumeric()) {
            return $rule;
        }

        foreach ($this->rangeFields as $fieldName => $values) {
            $rule[] = [
                "range" => [
                    $fieldName => [
                        'gte' => 0,
                        'lte' => $this->params['query'],
                        'relation' => 'within'
                    ],
                ],
            ];
        }

        return $rule;
    }

    protected function prepareQueryString(): array
    {
        return [
            'multi_match' => [
                'query' => $this->params['query'],
                'fields' => $this->prepareSearchFields(),
                'type' => 'phrase_prefix'
            ]
        ];
    }

    protected function isNumeric(): bool
    {
        return
            isset($this->params['query'])
            && !empty($this->params['query'])
            && is_numeric($this->params['query']);
    }
}
