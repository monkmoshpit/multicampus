<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Builder;

class Activity extends Model
{
    /** @use HasFactory<\Database\Factories\ActivityFactory> */
    use HasFactory, HasUlids;

    protected $fillable = [
        'tenant_id',
        'user_id',
        'description',
    ];

    /**
     * The "booted" method of the model.
     * Enforces strict tenant isolation.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('tenant_isolation', function (Builder $builder) {
            if (auth()->check()) {
                $builder->where('tenant_id', auth()->user()->tenant_id);
            }
        });

        // Automatically associate the activity with the current tenant and user.
        static::creating(function ($activity) {
            if (auth()->check() && empty($activity->tenant_id)) {
                $activity->tenant_id = auth()->user()->tenant_id;
            }
            if (auth()->check() && empty($activity->user_id)) {
                $activity->user_id = auth()->user()->id;
            }
        });
    }

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
