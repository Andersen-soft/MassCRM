<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class City
 * @package App
 * @property int $id
 * @property string $name
 * @property int $region_id
 */
class City extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'id', 'name', 'region_id'
    ];

    protected $casts = [
        'name' => 'string',
        'region_id' => 'integer',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): City
    {
        $this->name = $name;

        return $this;
    }

    public function getRegionId(): int
    {
        return $this->region_id;
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class, 'region_id');
    }
}
