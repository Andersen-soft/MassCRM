<?php declare(strict_types=1);

namespace App\Services\Validator;

use App\Models\BaseModel;
use App\RulesValidateModels\RulesValidateInterface;
use Illuminate\Support\Facades\Validator;
use Illuminate\Contracts\Validation\Validator as ValidatorRules;

class ValidatorService
{
    private array $errors = [];

    public function validateCreate(BaseModel $model, RulesValidateInterface $rulesValidate): bool
    {
        $validator = Validator::make(
            $model->toArray(),
            $rulesValidate->rulesCreate(),
            $rulesValidate->messages()
        );

        return $this->validate($validator);
    }

    public function validateUpdate(BaseModel $model, RulesValidateInterface $rulesValidate): bool
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

    /** @phpstan-ignore-next-line */
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
