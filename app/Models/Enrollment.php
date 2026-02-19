<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Enrollment extends Model
{
    use HasFactory;
    
    // Ulid as primary key
    use HasUlids;
    public $incrementing = false;
    protected $keyType = 'string';


    protected $fillable = [
        'tenant_id',
        'student_id',
        'enrollment_date',
    ];

    // Relationships
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
