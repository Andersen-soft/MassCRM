<?php

namespace App\Services\Parsers\Import\Contact;

use App\Exceptions\Import\ImportFileException;
use App\Models\Company\Company;
use App\Models\Contact\Contact;
use App\Models\User\User;
use App\RulesValidateModels\Contact\RulesContact;
use App\Services\Location\LocationService;
use App\Services\User\UserService;
use App\Services\Validator\ValidatorService;

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

    private UserService $userService;
    private LocationService $locationService;
    private ValidatorService $validatorService;
    private RulesContact $rulesContact;

    private const ALWAYS_MERGE_FIELDS = [
        Contact::LAST_TOUCH_FIELD,
        Contact::OPENS_FIELD,
        Contact::VIEWS_FIELD,
        Contact::DELIVERIES_FIELD,
        Contact::REPLIES_FIELD,
        Contact::BOUNCES_FIELD
    ];

    private const LOCATION_FIELDS = [
        self::CITY, self::REGION, self::COUNTRY
    ];

    public function __construct(
        UserService $userService,
        LocationService $locationService,
        ValidatorService $validatorService,
        RulesContact $rulesContact
    ) {
        $this->userService = $userService;
        $this->locationService = $locationService;
        $this->validatorService = $validatorService;
        $this->rulesContact = $rulesContact;
    }

    public function merge(
        Contact $contact,
        array $row,
        User $user,
        int $responsible,
        ?Company $company,
        ?array $origin,
        ?string $comment
    ): Contact {
        $contact = $this->setUserAndCompanyToContact($contact, $user, $company);

        if (empty($row['contact'])) {
            return $contact;
        }

        if (!$contact->origin) {
            $contact->origin = implode(';', $origin);
        }

        if (!$contact->responsible) {
            $contact->responsible = $this->userService->fetchUser($responsible)->getFullNameAttribute();
        }

        if (!$contact->comment) {
            $contact->comment = $this->getComment($row['contact'], $comment);
        }

        foreach ($row['contact'] as $key => $item) {
            if (in_array($key, self::ALWAYS_MERGE_FIELDS, true)) {
                $contact->{$key} = $item;
                continue;
            }
            if (in_array($key, self::LOCATION_FIELDS, true)) {
                $contact = $this->addLocation($contact, $row['contact']);
                continue;
            }
            if ($key === 'gender' && !$contact->gender && !empty($item)) {
                $contact->gender = $this->setGender($item);
            }
            if ($contact->{$key} === null && !empty($item)) {
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
    ): Contact {
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
    ): ?Contact {
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
        int $responsible,
        ?Company $company,
        ?array $origin,
        ?string $comment
    ): Contact {
        $contact = $this->setUserAndCompanyToContact($contact, $user, $company);

        if (empty($row['contact'])) {
            return $contact;
        }

        foreach ($row['contact'] as $key => $item) {

            if (in_array($key, self::LOCATION_FIELDS, true)) {
                $contact = $this->addLocation($contact, $row['contact']);
                continue;
            }

            if ($key === 'gender') {
                $contact->gender = $this->setGender($item);
                continue;
            }

            $date = \DateTime::createFromFormat('d/m/Y H:i', $item);

            if ($date || strtotime($item)) {
                $date = !empty($date) ? $date : \DateTime::createFromFormat('d-m-Y H:i', $item);
                $contact->{$key} = $date->format('d-m-Y H:i');

                continue;
            }

            $contact->{$key} = $item;
        }

        $contact->origin = implode(';', $origin);
        $contact->responsible = $this->userService->fetchUser($responsible)->getFullNameAttribute();
        $contact->comment = $this->getComment($row['contact'], $comment);

        return $contact;
    }

    private function setUserAndCompanyToContact(Contact $contact, User $user, ?Company $company): Contact
    {
        $contact->user()->associate($user);

        if ($company) {
            $contact->company()->associate($company);
        }

        return $contact;
    }

    private function addLocation(Contact $contact, array $row): Contact
    {
        $location = null;
        foreach (self::LOCATION_FIELDS as $field) {
            if (!empty($row[$field])) {
                $location = $row[$field];
                break;
            }
        }
        if ($location) {
            $loc = $this->locationService->findLocations($location);
            if ($loc) {
                $country = $loc->getCountry();
                if ($country) {
                    $contact->country = $country->name;
                }
                $region = $loc->getRegion();
                if ($region) {
                    $contact->region = $region->name;
                }
                $city = $loc->getCity();
                if ($city) {
                    $contact->city = $city->name;
                }
            }
        }

        if(empty($contact->country)){
            throw new ImportFileException(['The location is invalid']);
        }

        return $contact;
    }

    private function setGender(?string $item) : ?string
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
}
