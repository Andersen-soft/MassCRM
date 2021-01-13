<?php

declare(strict_types=1);

namespace App\Http\Controllers\v1\Vacancy;

use App\Exceptions\Custom\NotFoundException;
use App\Http\Controllers\BaseController;
use App\Http\Requests\DestroyManyRequest;
use App\Models\Company\CompanyVacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Lang;

class VacancyController extends BaseController
{
    public function destroy(DestroyManyRequest $request): JsonResponse
    {
        $ids = $request->get('ids');

        $vacancy = CompanyVacancy::destroy($ids);

        if ($vacancy) {

            return $this->success([]);
        }

        throw new NotFoundException(Lang::get('exception.vacancies_does_not_exist', ['ids' => implode(',', $ids)]));
    }
}
