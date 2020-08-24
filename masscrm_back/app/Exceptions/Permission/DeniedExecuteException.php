<?php

namespace App\Exceptions\Permission;

use Illuminate\Http\JsonResponse;
use League\Fractal\TransformerAbstract;
use Illuminate\Database\Eloquent\Model;

class DeniedExecuteException extends PermissionException
{
    private TransformerAbstract $modelTransform;

    /** @var  Model|array */
    private $data;

    public function __construct($message = 'Permission denied', int $code = JsonResponse::HTTP_OK)
    {
        parent::__construct($message, $code);
    }

    public function setData($data): DeniedExecuteException
    {
        $this->data = $data;

        return $this;
    }

    public function setModelTransform(TransformerAbstract $modelTransform): DeniedExecuteException
    {
        $this->modelTransform = $modelTransform;

        return $this;
    }

    private function getData(): array
    {
        return is_array($this->data)
            ? $this->payloadBuilder->responseCollection($this->data, $this->modelTransform)
            : $this->payloadBuilder->responseItem($this->data, $this->modelTransform);
    }

    public function render(): JsonResponse
    {
        return new JsonResponse($this->payloadBuilder->getResponseBody(
            [
                'message' => $this->message,
                'data' => $this->getData()
            ],
            false
        ), $this->code);
    }
}
