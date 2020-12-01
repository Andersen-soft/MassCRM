<?php declare(strict_types=1);

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Country
 * @package App
 * @property int $id
 * @property string $name
 * @property string $code
 */
class Country extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'id', 'name', 'code'
    ];

    protected $casts = [
        'name' => 'string',
        'code' => 'string',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): Country
    {
        $this->name = $name;

        return $this;
    }

    public function getCode(): string
    {
        return $this->code;
    }

    public function setCode(string $code): Country
    {
        $this->code = $code;

        return $this;
    }

    public function regions(): HasMany
    {
        return $this->hasMany(Region::class, 'country_id');
    }
}
