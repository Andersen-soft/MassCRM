<?php

namespace App\Services;

use App\Http\Transformers\Serializers\AppSerializer;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;
use League\Fractal\Resource\ResourceAbstract;
use League\Fractal\TransformerAbstract;

class PayloadBuilder
{
    public function getResponseBody(array $payload, bool $success): array
    {
        return [
            'success' => $success,
            'payload' => $payload,
        ];
    }

    public function responseItem($item, TransformerAbstract $transformer): array
    {
        $resource = new Item($item, $transformer);

        return $this->serializeResponse($resource);
    }

    public function responseCollection($collection, TransformerAbstract $transformer) :array
    {
        $resource = new Collection($collection, $transformer);

        return $this->serializeResponse($resource);
    }

    public function responseWithPagination(LengthAwarePaginator $data, TransformerAbstract $transformer): array
    {
        $transformData = [];
        foreach ($data->items() as $item) {
            $transformData[] = $transformer->transform($item);
        }
        $values = $data->toArray();
        if (!empty($transformData)) {
            $values['data'] = $transformData;
        }

        return $values;
    }

    private function serializeResponse(ResourceAbstract $resource) : array
    {
        /** @var Manager $fractal */
        $fractal = app('League\Fractal\Manager');
        $fractal->setSerializer(new AppSerializer());
        return $fractal->createData($resource)->toArray() ?? [];
    }
}
