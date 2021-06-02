<?php

declare(strict_types=1);

namespace App\Helpers;

class Url
{
    public const REGEX_GET_URL = '/^(http|https?):\/\/((www)\.)?/';

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

    public function isValidUrl(string $url): bool
    {
        $url = $this->getUrlWithSchema($url);

        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }

        if (count(explode('.', parse_url($url, PHP_URL_HOST))) < 2) {
            return false;
        }

        return true;
    }

    public static function getSecondAndFirstDomainsString(string $url): ?string
    {
        if (empty($url)) {
            return null;
        }

        if (!parse_url($url, PHP_URL_SCHEME)) {
            $url = 'http://' . $url;
        }

        preg_match(self::REGEX_GET_URL, $url, $matches);
        if (!$matches) {
            return null;
        }

        $website = str_replace($matches[0], '', $url);
        return explode('/', $website)[0];
    }

    public static function getWebsiteMatchString(string $website): string
    {
        return "^http(s)?:\/\/(www.)?{$website}$";
    }

    private function setSchemaToUrl(string $url): string
    {
        return 'http://' . $url;
    }
}
