<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class CalendarActivity extends Model
{
    use BelongsToTenant, HasFactory, HasUlids;

    protected $fillable = [
        'tenant_id',
        'user_id',
        'classroom_id',
        'title',
        'description',
        'activity_date',
        'start_time',
        'end_time',
    ];

    protected $casts = [
        'activity_date' => 'date',
        // 'start_time' => 'datetime:H:i:s',  -- Can cause timezone issues if using 'datetime:H:i', leave as is usually best for time.
    ];

    /**
     * The "booted" method of the model.
     * Enforces strict tenant and user isolation.
     */
    protected static function booted(): void
    {
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

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }
}
