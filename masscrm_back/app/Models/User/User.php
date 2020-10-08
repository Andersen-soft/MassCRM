<?php

namespace App\Models\User;

use App\Models\Blacklist;
use App\Models\Contact\Contact;
use App\Models\Industry;
use App\Models\InformationImport;
use App\Models\Process;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Lang;

/**
 * Class User
 * @package App
 * @property int $id
 * @property string $email
 * @property string $login
 * @property string $name
 * @property string $surname
 * @property string|null $position
 * @property string $skype
 * @property bool $from_active_directory
 * @property bool $allow_setting_password
 * @property string|null $comment
 * @property string $password
 * @property array $roles
 * @property string $token
 * @property bool $active
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class User extends Authenticatable implements JWTSubject
{
    public const USER_ROLE_ADMINISTRATOR = 'administrator';
    public const USER_ROLE_MANAGER = 'manager';
    public const USER_ROLE_NC1 = 'nc1';
    public const USER_ROLE_NC2 = 'nc2';

    public const ROLES_USER = [
        self::USER_ROLE_ADMINISTRATOR,
        self::USER_ROLE_MANAGER,
        self::USER_ROLE_NC1,
        self::USER_ROLE_NC2,
    ];

    protected $fillable = [
        'id',
        'login',
        'name',
        'surname',
        'position',
        'comment',
        'email',
        'password',
        'roles',
        'token',
        'active',
        'created_at',
        'updated_at',
        'from_active_directory',
        'allow_setting_password',
        'skype'
    ];

    protected $hidden = [
        'password',
        'token',
    ];

    protected $casts = [
        'login' => 'string',
        'name' => 'string',
        'surname' => 'string',
        'skype' => 'string',
        'position' => 'string',
        'comment' => 'string',
        'email' => 'string',
        'password' => 'string',
        'roles' => 'array',
        'token' => 'string',
        'active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'from_active_directory' => 'bool',
        'allow_setting_password' => 'bool',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getLogin(): string
    {
        return $this->login;
    }

    public function setLogin(string $login): User
    {
        $this->login = $login;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): User
    {
        $this->name = $name;

        return $this;
    }

    public function getSurname(): string
    {
        return $this->surname;
    }

    public function setSurname(string $surName): User
    {
        $this->surname = $surName;

        return $this;
    }

    public function getFullNameAttribute(): string
    {
        return sprintf('%s %s', $this->getName(), $this->getSurName());
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(?string $position): User
    {
        $this->position = $position;

        return $this;
    }

    public function getSkype(): string
    {
        return $this->skype;
    }

    public function setSkype(string $skype): User
    {
        $this->skype = $skype;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): User
    {
        $this->comment = $comment;

        return $this;
    }

    public function fromActiveDirectory(): bool
    {
        return $this->from_active_directory;
    }

    public function setFromActiveDirectory(bool $fromActiveDirectory): User
    {
        $this->from_active_directory = $fromActiveDirectory;

        return $this;
    }

    public function isAllowSettingPassword(): bool
    {
        return $this->allow_setting_password;
    }

    public function setAllowSettingPassword(bool $allowSettingPassword): User
    {
        $this->allow_setting_password = $allowSettingPassword;

        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): User
    {
        $this->email = $email;

        return $this;
    }

    public function setPassword(string $password): User
    {
        $this->password = bcrypt($password);

        return $this;
    }

    public function getRolesTranslate(): array
    {
        $roles = [];
        foreach ($this->roles as $role) {
            $roles[$role] = Lang::get('user.roles.' . $role);
        }

        return $roles;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function hasRoles(array $rolesPermission): array
    {
        return array_intersect($this->roles, $rolesPermission);
    }

    public function hasRole($role): bool
    {
        return in_array($role, $this->roles, true);
    }

    public function setRoles(array $roles): User
    {
        $this->roles = $roles;

        return $this;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function setToken(string $token): User
    {
        $this->token = $token;

        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): User
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

    public function notifications(): HasMany
    {
        return $this->hasMany(UsersNotification::class, 'user_id');
    }

    public function processes(): HasMany
    {
        return $this->hasMany(Process::class, 'user_id');
    }

    public function blacklists(): HasMany
    {
        return $this->hasMany(Blacklist::class, 'user_id');
    }

    public function informationImport(): HasMany
    {
        return $this->hasMany(InformationImport::class, 'user_id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }
}
