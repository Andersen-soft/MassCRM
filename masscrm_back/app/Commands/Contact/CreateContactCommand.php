<?php declare(strict_types=1);

namespace App\Commands\Contact;

use App\Models\User\User;

/**
 * Class CreateContactCommand
 * @package  App\Commands\Contact
 */
class CreateContactCommand
{
    protected array $emails;
    protected ?int $companyId;
    protected ?array $origin;
    protected array $contactFields;
    protected array $phones;
    protected ?array $socialNetworks;
    protected bool $requiresValidation;
    protected User $user;
    protected User $createdBy;

    public function __construct(
        array $emails,
        ?array $origin,
        array $contactFields,
        array $phones,
        ?array $socialNetworks,
        bool $requiresValidation,
        User $user,
        int $companyId = null
    ) {
        $this->emails = $emails;
        $this->origin = $origin;
        $this->companyId = $companyId;
        $this->contactFields = $contactFields;
        $this->phones = $phones;
        $this->socialNetworks = $socialNetworks;
        $this->requiresValidation = in_array($requiresValidation, ['1', 'true']);
        $this->user = $user;
        $this->createdBy = $user;
    }

    public function getOrigin(): ?array
    {
        return $this->origin;
    }

    public function getEmails(): array
    {
        return $this->emails;
    }

    public function getContactFields(): array
    {
        return $this->contactFields;
    }

    public function getPhones(): array
    {
        return $this->phones;
    }

    public function getSocialNetworks(): ?array
    {
        return $this->socialNetworks;
    }

    public function isRequiresValidation(): bool
    {
        return $this->requiresValidation;
    }

    public function getCompanyId(): ?int
    {
        return $this->companyId;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function getCreatedBy(): User
    {
        return $this->createdBy;
    }
}
