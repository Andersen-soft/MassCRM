<?php

namespace App\Commands\Contact;

use App\Models\User\User;

/**
 * Class UpdateContactCommand
 * @package  App\Commands\Contact
 */
class UpdateContactCommand
{
    protected int $contactId;
    protected array $emails;
    protected array $phones;
    protected ?int $companyId;
    protected array $contactFields;
    protected array $colleagues;
    protected array $socialNetworks;
    protected ?bool $requiresValidation;
    protected User $user;

    public function __construct(
        int $contactId,
        User $user,
        array $emails,
        array $phones,
        array $contactFields,
        array $colleagues,
        array $socialNetworks,
        bool $requiresValidation = null,
        int $companyId = null
    ) {
        $this->contactId = $contactId;
        $this->user = $user;
        $this->emails = $emails;
        $this->phones = $phones;
        $this->companyId = $companyId;
        $this->contactFields = $contactFields;
        $this->colleagues = $colleagues;
        $this->socialNetworks = $socialNetworks;
        $this->requiresValidation = $requiresValidation ? in_array($requiresValidation, ['1', 'true']) : null;
    }

    public function getEmails(): array
    {
        return $this->emails;
    }

    public function getPhones(): array
    {
        return $this->phones;
    }

    public function getContactFields(): array
    {
        return $this->contactFields;
    }

    public function getColleagues(): array
    {
        return $this->colleagues;
    }

    public function getSocialNetworks(): array
    {
        return $this->socialNetworks;
    }

    public function isRequiresValidation(): ?bool
    {
        return $this->requiresValidation;
    }

    public function getCompanyId(): ?int
    {
        return $this->companyId;
    }

    public function getContactId(): int
    {
        return $this->contactId;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
