<?php declare(strict_types=1);

namespace App\Models\Contact;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ContactPhones
 * @package Contact
 * @property int $id
 * @property int $contact_id
 * @property string $phone
 * @property boolean $active
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class ContactPhones extends Model
{
    public const PHONE_FIELD = 'phone';

    protected $fillable = [
        'id',
        'contact_id',
        'phone',
        'active',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'contact_id' => 'integer',
        'phone' => 'string',
        'active' => 'boolean',
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

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): ContactPhones
    {
        $this->phone = $phone;

        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): ContactPhones
    {
        $this->active = $active;

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

    public function scopeIsActive(Builder $query): Builder
    {
        return $query->where('active', true);
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }
}
