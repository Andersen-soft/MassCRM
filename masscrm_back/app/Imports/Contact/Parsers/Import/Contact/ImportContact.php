<?php

declare(strict_types=1);

namespace App\Imports\Contact\Parsers\Import\Contact;

use App\Exceptions\Import\ImportFileException;
use App\Helpers\Url;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\User\User;
use App\RulesValidateModels\Contact\RulesContact;
use App\Services\Location\LocationService;
use App\Services\User\UserService;
use App\Services\Validator\ValidatorService;
use Carbon\Carbon;

class ImportContact
{
    private const COUNTRY = 'country';
    private const REGION = 'region';
    private const CITY = 'city';
    private const CHECK_DATE_FIELDS = [
        'opens',
        'replies',
        'bounces'
    ];

    private const GENDER = [
        'm' => [
            'man',
            'male',
            'men',
            'm',
        ],
        'f' => [
            'female',
            'f',
            'women',
            'woman'
        ]
    ];

    public const COUNTRY_MAPPING = [
        'United States' => [
            'United States',
            'US',
            'USA',
            'The USA',
            'United States of America',
            'U.S.'
        ],
        'United Kingdom' => [
            'United Kingdom',
            'UK',
            'United Kingdom of Great Britain and Northern Ireland'
        ],
        'United Arab Emirates' => [
            'United Arab Emirates',
            'UAE'
        ],
        'Venezuela' => [
            'Venezuela',
            'Bolivarian Republic of Venezuela'
        ],
        'Russia' => [
            'Russia',
            'Russian Federation'
        ],
        'Finland' => [
            'Finland',
            'Suomi'
        ],
        'Czechia' => [
            'Czechia',
            'Czech Republic'
        ],
        'Austria' => [
            'Austria',
            'Republic of Austria'
        ],
        'Australia' => [
            'Australia',
            'Commonwealth of Australia'
        ],
        'Cyprus' => [
            'Cyprus',
            'Republic of Cyprus'
        ],
        'Cuba' => [
            'Cuba',
            'Republic of Cuba'
        ],
        'Croatia' => [
            'Croatia',
            'Republic of Croatia'
        ],
        'Colombia' => [
            'Colombia',
            'Republic of Colombia'
        ],
        'China' => [
            'China',
            "People's Republic of China"
        ],
        'Chile' => [
            'Chile',
            'Republic of Chile'
        ],
        'Chad' => [
            'Chad',
            'Republic of Chad'
        ],
        'Brunei' => [
            'Brunei',
            'Nation of Brunei'
        ],
        'Bolivia' => [
            'Bolivia',
            'Plurinational State of Bolivia'
        ],
        'Bahrain' => [
            'Bahrain',
            'Kingdom of Bahrain'
        ],
        'Bahamas' => [
            'Bahamas',
            'Commonwealth of the Bahamas'
        ],
        'Azerbaijan' => [
            'Azerbaijan',
            'Republic of Azerbaijan'
        ],
        'Armenia' => [
            'Armenia',
            'Republic of Armenia'
        ],
        'Argentina' => [
            'Argentina',
            'Argentine Republic'
        ],
        'Angola' => [
            'Angola',
            'Republic of Angola'
        ],
        'Andorra' => [
            'Andorra',
            'Principality of Andorra'
        ],
        'Algeria' => [
            'Algeria',
            "People's Democratic Republic of Algeria"
        ],
        'Albania' => [
            'Albania',
            'Republic of Albania'
        ]
    ];

    private UserService $userService;
    private LocationService $locationService;
    private ValidatorService $validatorService;
    private RulesContact $rulesContact;
    private Url $urlHelper;

    private const ALWAYS_MERGE_FIELDS = [
        Contact::LAST_TOUCH_FIELD,
        Contact::VIEWS_FIELD,
        Contact::DELIVERIES_FIELD
    ];

    private const LOCATION_FIELDS = [
        self::CITY, self::REGION, self::COUNTRY
    ];

    public function __construct(
        UserService $userService,
        LocationService $locationService,
        ValidatorService $validatorService,
        RulesContact $rulesContact,
        Url $urlHelper
    )
    {
        $this->userService = $userService;
        $this->locationService = $locationService;
        $this->validatorService = $validatorService;
        $this->rulesContact = $rulesContact;
        $this->urlHelper = $urlHelper;
    }

    public function merge(
        Contact $contact,
        array $row,
        User $user,
        int $responsible,
        ?Company $company,
        ?array $origin,
        ?string $comment
    ): Contact
    {
        $contact = $this->setUserAndCompanyToContact($contact, $user, $company);

        if (empty($row['contact'])) {
            return $contact;
        }

        if (!$contact->origin) {
            $contact->origin = implode(';', $origin);
        }

        if (!$contact->comment) {
            $contact->comment = $this->getComment($row['contact'], $comment);
        }

        $contact->responsible_id = $responsible;

        /**
         * @var string $item
         * @var string $key
         */
        foreach ($row['contact'] as $key => $item) {
            if (in_array($key, self::ALWAYS_MERGE_FIELDS, true)) {
                $contact->{$key} = $item;
                continue;
            }

            if (in_array($key, self::LOCATION_FIELDS, true)) {
                $contact = $this->addLocation($contact, $row['contact']);
                continue;
            }

            if ($key === Contact::GENDER_FIELD && !empty($contact->gender) && !empty($item)) {
                $contact->gender = $this->setGender($item);
                continue;
            }

            if ($key === Contact::LINKEDIN_FIELD && !empty($contact->linkedin) && !empty($item)) {
                $contact->linkedin = $this->urlHelper->getUrlWithSchema($item);
                continue;
            }

            if (in_array($key, self::CHECK_DATE_FIELDS) && !is_null($item) && strtotime($item)) {
                $contact->{$key} = 1;
                continue;
            }

            if ($contact->{$key} === null && !empty($item)) {
                if ($contact->getCasts()[$key] === 'datetime') {
                    $date = \DateTime::createFromFormat('d/m/Y H:i', $item);
                    $time = strtotime($item);

                    /** @phpstan-ignore-next-line */
                    if ($date || (is_int($time) && Carbon::parse($time))) {
                        $date = !empty($date) ? $date->format('d-m-Y H:i') : Carbon::parse((int)$item)->format('d-m-Y H:i');
                        $contact->{$key} = $date;

                        continue;
                    }
                }

                $contact->{$key} = $item;
            }
        }

        if (!$this->validatorService->validateUpdate($contact, $this->rulesContact)) {
            throw new ImportFileException($this->validatorService->getErrors());
        }

        $contact->save();

        return $contact;
    }

    public function replace(
        Contact $contact,
        array $row,
        User $user,
        int $responsible,
        ?Company $company,
        ?array $origin,
        ?string $comment
    ): Contact
    {
        $contact = $this->setNewDataCompany($contact, $row, $user, $responsible, $company, $origin, $comment);

        if (!$this->validatorService->validateUpdate($contact, $this->rulesContact)) {
            throw new ImportFileException($this->validatorService->getErrors());
        }

        $contact->save();

        return $contact;
    }

    public function create(
        array $row,
        User $user,
        int $responsible,
        ?Company $company,
        ?array $origin,
        ?string $comment
    ): ?Contact
    {
        if (empty($row['contact'])) {
            return null;
        }

        $contact = new Contact();
        $contact = $this->setNewDataCompany($contact, $row, $user, $responsible, $company, $origin, $comment);

        if (!$this->validatorService->validateCreate($contact, $this->rulesContact)) {
            throw new ImportFileException($this->validatorService->getErrors());
        }

        $contact->save();

        return $contact;
    }

    private function setNewDataCompany(
        Contact $contact,
        array $row,
        User $user,
        int $responsibleId,
        ?Company $company,
        ?array $origin,
        ?string $comment
    ): Contact
    {
        $contact = $this->setUserAndCompanyToContact($contact, $user, $company);

        if (empty($row['contact'])) {
            return $contact;
        }

        foreach ($row['contact'] as $key => $item) {
            if (in_array($key, self::LOCATION_FIELDS, true)) {
                $contact = $this->addLocation($contact, $row['contact']);
                continue;
            }

            if ($key === Contact::GENDER_FIELD) {
                $contact->gender = $this->setGender($item);
                continue;
            }

            if (in_array($key, self::CHECK_DATE_FIELDS) && !is_null($item) && strtotime($item)) {
                $contact->{$key} = 1;
                continue;
            }

            if ($key === Contact::LINKEDIN_FIELD) {
                $contact->linkedin = $this->urlHelper->getUrlWithSchema($item);
                continue;
            }

            if ($key === Contact::FIRST_NAME_FIELD &&
                $item !== null &&
                $item !== $contact->first_name) {
                $contact->first_name = $item;
                continue;
            }

            if ($key === Contact::LAST_NAME_FIELD &&
                $item !== null &&
                $item !== $contact->last_name) {
                $contact->last_name = $item;
                continue;
            }


            if (!is_null($item)) {
                if ($contact->getCasts()[$key] === 'datetime') {
                    $date = \DateTime::createFromFormat('d/m/Y H:i', $item);
                    $time = strtotime($item);

                    /** @phpstan-ignore-next-line */
                    if ($date || (is_int($time) && Carbon::parse((int)$time))) {
                        $date = !empty($date) ? $date->format('d-m-Y H:i') : Carbon::parse((int)$time)->format('d-m-Y H:i');
                        $contact->{$key} = $date;

                        continue;
                    }
                }

                $contact->{$key} = $item;
            }
        }

        $contact->origin = implode(';', $origin);
        $contact->responsible_id = $responsibleId;
        $contact->comment = $this->getComment($row['contact'], $comment);
        $contact->full_name = $this->getContactFullName($contact);

        return $contact;
    }

    private function setUserAndCompanyToContact(Contact $contact, User $user, ?Company $company): Contact
    {
        if (!$contact->getUserId()) {
            $contact->user()->associate($user);
        }

        if (!$contact->getCreatedBy()) {
            $contact->createdBy()->associate($user);
        }

        if ($company) {
            $contact->company()->associate($company);
        }

        return $contact;
    }

    private function addLocation(Contact $contact, array $row): Contact
    {
        $location = null;
        foreach (self::LOCATION_FIELDS as $field) {
            if (empty($row[$field])) {
                continue;
            }

            $row[$field] = $this->mapCountries($row[$field]);

            $loc = $this->locationService->findLocations($row[$field], $row);

            if ($loc) {
                if ($country = $loc->getCountry()) {
                    $contact->country = $country->name;
                }

                if ($region = $loc->getRegion()) {
                    $contact->region = $region->name;
                }

                if ($city = $loc->getCity()) {
                    $contact->city = $city->name;
                }
                break;
            }
        }

        if (empty($contact->country)) {
            throw new ImportFileException(['The location is invalid']);
        }

        return $contact;
    }

    private function setGender(?string $item): ?string
    {
        if (!$item) {
            return $item;
        }

        foreach (self::GENDER as $genderKey => $genders) {
            if (in_array(strtolower(trim($item)), $genders, true)) {
                return $genderKey;
            }
        }

        return $item;
    }

    private function getComment(array $row, ?string $comment): string
    {
        $data = [];
        if (!empty($comment)) {
            $data[] = $comment;
        }
        if (!empty($row['comment'])) {
            $data[] = $row['comment'];
        }

        return implode('. ', $data);
    }

    private function mapCountries(string $country): string
    {
        foreach (self::COUNTRY_MAPPING as $originCountry => $countryVariation) {
            if (in_array($country, $countryVariation)) {
                return $originCountry;
            }
        }

        return $country;
    }

    private function getContactFullName(Contact $contact): ?string
    {
        if (empty($contact->first_name) || empty($contact->last_name)) {
            return null;
        }

        return "{$contact->first_name} {$contact->last_name}";
    }
}
