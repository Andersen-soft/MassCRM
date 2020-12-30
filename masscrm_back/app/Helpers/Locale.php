<?php
declare(strict_types=1);

namespace App\Helpers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;

class Locale
{
    public function getLocales(): array
    {
        return Cache::remember('locales', now()->addMinutes(30), function () {
            return array_map(static function ($value) {
                return basename($value);
            }, glob(App::langPath() . '/*', GLOB_ONLYDIR));
        });
    }
}
