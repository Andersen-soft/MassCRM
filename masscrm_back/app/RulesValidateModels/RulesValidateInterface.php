<?php declare(strict_types=1);

namespace App\RulesValidateModels;

use App\Models\BaseModel;

interface RulesValidateInterface
{
    public function messages(): array;

    public function rulesUpdate(BaseModel $model): array;

    public function rulesCreate(): array;

    public function rules(): array;
}
