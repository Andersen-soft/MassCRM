<?php declare(strict_types=1);

namespace App\Http\Requests\Import\StartParsing;

use App\Commands\Import\ImportStartParseCommand;
use App\Http\Requests\AbstractRequest;
use Illuminate\Support\Facades\Lang;

class ImportStartParsingRequest extends AbstractRequest implements ImportStartParsingRequestInterface
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $fields = array_keys(Lang::get('filters.fields'));
        $separator = array_keys(Lang::get('filters.column_separator'));

        return [
            'file_name' => 'required|string',
            'fields' => 'required|array',
            'fields.*' => 'required|string|in:' . implode(',', $fields),
            'comment' => 'string',
            'origin' => 'array|in:' . implode(',', Lang::get('filters.origin')),
            'responsible' => 'required|exists:users,id',
            'column_separator' => 'required|string|in:' . implode(',', $separator),
            'is_headers' => 'required|boolean',
            'duplication_action' => 'required|in:' . implode(',', ImportStartParseCommand::DUPLICATION_ACTIONS)
        ];
    }
}
