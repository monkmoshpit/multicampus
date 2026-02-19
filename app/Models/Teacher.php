<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Teacher extends Model
{
    use HasFactory;

    // Ulid as primary key
    use HasUlids;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'tenant_id',
        'first_name',
        'last_name',
    ];

    // Relationships
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
}
