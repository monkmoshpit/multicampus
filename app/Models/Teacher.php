<?php

namespace App\Models;

use App\Concerns\HasTenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Teacher extends Model
{
    use HasFactory;
    use HasTenant;

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
