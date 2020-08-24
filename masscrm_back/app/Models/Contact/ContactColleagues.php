<?php

namespace App\Models\Contact;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ContactColleagues
 * @package Contact
 * @property int $id
 * @property int $contact_id
 * @property int|null $contact_id_relation
 * @property string|null $link
 * @property string $full_name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class ContactColleagues extends Model
{
    public const COLLEAGUE_LINK_FIELD = 'colleague_link';
    public const COLLEAGUE_NAME_FIELD = 'colleague_name';

    protected $fillable = [
        'id',
        'contact_id',
        'contact_id_relation',
        'link',
        'full_name',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'contact_id' => 'integer',
        'contact_id_relation' => 'integer',
        'link' => 'string',
        'full_name' => 'string',
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

    public function getContactIdRelation(): ?int
    {
        return $this->contact_id_relation;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): ContactColleagues
    {
        $this->link = $link;

        return $this;
    }

    public function setFullName(string $fullName): ContactColleagues
    {
        $this->full_name = $fullName;

        return $this;
    }

    public function getFullName(): string
    {
        return $this->full_name;
    }

    public function getCreatedAtDateTime(): string
    {
        return $this->created_at->format('d.m.Y H:i');
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }

    public function contractRelation(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'contact_id_relation');
    }
}
