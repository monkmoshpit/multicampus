<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class Teacher extends Model
{
    use BelongsToTenant;
    use HasFactory;

    // Ulid as primary key
    use HasUlids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'user_id',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function subjects()
    {
        return $this->belongsToMany(
            Subject::class,
            'subject_teacher'
        );
    }

    public function classrooms()
    {
        return $this->hasMany(Classroom::class);
    }
}
