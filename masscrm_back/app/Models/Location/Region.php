<?php declare(strict_types=1);

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Region
 * @package App
 * @property int $id
 * @property string $name
 * @property string $code
 * @property int $country_id
 */
class Region extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'id', 'name', 'code', 'country_id'
    ];

    protected $casts = [
        'name' => 'string',
        'code' => 'string',
        'country_id' => 'integer',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): Region
    {
        $this->name = $name;

        return $this;
    }

    public function getCode(): string
    {
        return $this->code;
    }

    public function setCode(string $code): Region
    {
        $this->code = $code;

        return $this;
    }

    public function getCountryId(): int
    {
        return $this->country_id;
    }

    public function cities(): HasMany
    {
        return $this->hasMany(City::class, 'region_id');
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_id');
    }
}
