<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class ClassroomActivity extends Model
{
    use BelongsToTenant;
    use HasFactory;
    use HasUlids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'tenant_id',
        'classroom_id',
        'title',
        'description',
        'due_date',
        'type',
    ];

    /**
     * Get the classroom that owns the activity.
     */
    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }
}
