<?php

namespace App\Models\Contact;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ContactEmails
 * @package Contact
 * @property int $id
 * @property int $contact_id
 * @property string $email
 * @property boolean $active
 * @property boolean $verification
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class ContactEmails extends Model
{
    public const EMAIL_FIELD = 'email';
    public const REQUIRES_VALIDATION = 'requires_validation';

    protected $fillable = [
        'id',
        'contact_id',
        'email',
        'active',
        'verification',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'contact_id' => 'integer',
        'email' => 'string',
        'active' => 'boolean',
        'verification' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getContactId(): ?int
    {
        return $this->contact_id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(?string $email): ContactEmails
    {
        $this->email = $email;

        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): ContactEmails
    {
        $this->active = $active;

        return $this;
    }

    public function scopeIsActive(Builder $query): Builder
    {
        return $query->where('active', true);
    }

    public function isVerification(): bool
    {
        return $this->verification;
    }

    public function setVerification(bool $verification): ContactEmails
    {
        $this->verification = $verification;

        return $this;
    }

    public function getCreatedAt(): Carbon
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): Carbon
    {
        return $this->updated_at;
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }
}
