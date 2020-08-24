<?php

namespace App\Models\User;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class RolePermission
 * @package App
 * @property int $id
 * @property string $role
 * @property int $permission_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class RolesPermission extends Model
{
    protected $fillable = [
        'id',
        'role',
        'permission_id',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'role' => 'string',
        'permission_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getRole(): string
    {
        return $this->role;
    }

    public function setRole(string $role): RolesPermission
    {
        $this->role = $role;

        return $this;
    }

    public function permission():  BelongsTo
    {
        return $this->belongsTo(Permission::class, 'permission_id');
    }
}
