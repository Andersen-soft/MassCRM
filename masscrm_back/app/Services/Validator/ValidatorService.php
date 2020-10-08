<?php

namespace App\Services\Validator;

use App\RulesValidateModels\RulesValidateInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class ValidatorService
{
    private array $errors = [];

    public function validateCreate(Model $model, RulesValidateInterface $rulesValidate): bool
    {
        $validator = Validator::make(
            $model->toArray(),
            $rulesValidate->rulesCreate(),
            $rulesValidate->messages()
        );

        return $this->validate($validator);
    }

    public function validateUpdate(Model $model, RulesValidateInterface $rulesValidate): bool
    {
        $validator = Validator::make(
            $model->toArray(),
            $rulesValidate->rulesUpdate($model),
            $rulesValidate->messages()
        );

        return $this->validate($validator);
    }

    public function basicValidate(array $data, RulesValidateInterface $rulesValidate): bool
    {
        $validator = Validator::make($data, $rulesValidate->rules(), $rulesValidate->messages());

        return $this->validate($validator);
    }

    private function validate($validator): bool
    {
        if ($validator->passes()) {
            return true;
        }

        $this->errors = $validator->messages()->all();

        return false;
    }


    public function getErrors(): array
    {
        return $this->errors;
    }
}
