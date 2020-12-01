<?php

declare(strict_types=1);

namespace App\Helpers;

class Url
{
    public function getUrlWithSchema(?string $url): ?string
    {
        if (empty($url)) {
            return $url;
        }

        if (!parse_url($url, PHP_URL_SCHEME)) {
            return $this->setSchemaToUrl($url);
        }

        return $url;
    }

    private function setSchemaToUrl(string $url): string
    {
        return 'http://' . $url;
    }
}
