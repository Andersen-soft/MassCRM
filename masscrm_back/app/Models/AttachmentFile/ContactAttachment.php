<?php

namespace App\Models\AttachmentFile;

use App\Models\Contact\Contact;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ContactAttachment
 * @package App
 * @property int $id
 * @property int $contact_id
 * @property int $user_id
 * @property string $file_name
 * @property string $url
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class ContactAttachment extends Model
{
    protected $fillable = [
        'id',
        'contact_id',
        'user_id',
        'created_at',
        'updated_at',
        'file_name',
    ];

    protected $casts = [
        'contact_id' => 'integer',
        'user_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'file_name' => 'string',
        'url' => 'string',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getContactId(): int
    {
        return $this->contact_id;
    }

    public function setContactId(int $contactId): ContactAttachment
    {
        $this->contact_id = $contactId;

        return $this;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function setUserId(int $userId): ContactAttachment
    {
        $this->user_id = $userId;

        return $this;
    }

    public function getFileName(): string
    {
        return $this->file_name;
    }

    public function setFileName(string $fileName): ContactAttachment
    {
        $this->file_name = $fileName;

        return $this;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url): ContactAttachment
    {
        $this->url = $url;

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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
