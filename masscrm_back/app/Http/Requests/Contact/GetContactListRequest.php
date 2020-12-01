<?php declare(strict_types=1);

namespace App\Http\Requests\Contact;

use App\Http\Requests\AbstractRequest;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\Contact\ContactSale;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class GetContactListRequest extends AbstractRequest
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
        return $this->getSearchValidationRules();
    }
}
