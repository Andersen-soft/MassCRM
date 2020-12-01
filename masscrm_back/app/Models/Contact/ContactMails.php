<?php declare(strict_types=1);

namespace App\Models\Contact;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ContactMails
 * @package Contact
 * @property int $id
 * @property int $contact_id
 * @property string $message
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class ContactMails extends Model
{
    public const MAILS_FIELD = 'mails';
    public const FIELD_MESSAGE = 'message';

    protected $fillable = [
        'id',
        'contact_id',
        'message',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'contact_id' => 'integer',
        'message' => 'string',
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

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): ContactMails
    {
        $this->message = $message;

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
