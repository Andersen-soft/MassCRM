<?php declare(strict_types=1);

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\DB;

class UniqueRule implements Rule
{
    private string $table;
    private string $field;
    private string $message;
    private ?int $ignoreId;

    public function __construct(string $table, string $field, string $message = null, int $ignoreId = null)
    {
        $this->table = $table;
        $this->field = $field;
        $this->ignoreId = $ignoreId;
        $this->message = $message;
    }

    public function passes($attribute, $value): bool
    {
        $query = DB::table($this->table)->where($this->field, 'ILIKE', trim($value));

        if ($this->ignoreId) {
            $query->where('id', '!=', $this->ignoreId);
        }

        if ($query->exists()) {
            return false;
        }

        return true;
    }

    public function message(): string
    {
        return $this->message ? Lang::get($this->message) : Lang::get('validation.unique');
    }
}
