<?php declare(strict_types=1);

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Permission
 * @package App
 * @property int $id
 * @property string $slug
 */
class Permission extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'id',
        'slug'
    ];

    protected $casts = [
        'slug' => 'string'
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): Permission
    {
        $this->slug = $slug;

        return $this;
    }

    public function rolesPermission(): HasMany
    {
        return $this->hasMany(RolesPermission::class, 'permission_id');
    }
}
