<?php

namespace App\Models\AttachmentFile;

use App\Models\Company\Company;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class CompanyAttachment
 * @package App
 * @property int $id
 * @property int $company_id
 * @property int $user_id
 * @property string $file_name
 * @property string $url
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class CompanyAttachment extends Model
{
    protected $fillable = [
        'id',
        'company_id',
        'user_id',
        'created_at',
        'updated_at',
        'file_name',
    ];

    protected $casts = [
        'company_id' => 'integer',
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

    public function getCompanyId(): int
    {
        return $this->company_id;
    }

    public function setCompanyId(int $companyId): CompanyAttachment
    {
        $this->company_id = $companyId;

        return $this;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function setUserId(int $userId): CompanyAttachment
    {
        $this->user_id = $userId;

        return $this;
    }

    public function getFileName(): string
    {
        return $this->file_name;
    }

    public function setFileName(string $fileName): CompanyAttachment
    {
        $this->file_name = $fileName;

        return $this;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url): CompanyAttachment
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

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
