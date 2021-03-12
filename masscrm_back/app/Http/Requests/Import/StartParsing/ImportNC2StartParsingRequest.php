<?php

declare(strict_types=1);

namespace App\Http\Requests\Import\StartParsing;

use App\Commands\Import\ImportStartParseCommand;
use App\Rules\RequiredFieldsInArrayRule;

class ImportNC2StartParsingRequest extends ImportStartParsingRequest
{
    private const REQUIRED_FIELDS = ['job'];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $rule = parent::rules();
        $rule['duplication_action'] = 'required|in:' . ImportStartParseCommand::DUPLICATION_ACTION_MERGE;
        $rule['fields'] = ['required', 'array', new RequiredFieldsInArrayRule(self::REQUIRED_FIELDS)];

        return $rule;
    }
}
