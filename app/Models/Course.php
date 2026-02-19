<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Course extends Model
{
    use HasFactory;
    
    // Ulid as primary key
    use HasUlids;
    public $incrementing = false;
    protected $keyType = 'string';


    protected $fillable = [
        'course_name',
        'tenant_id',
        'teacher_id',
    ];

    // Relationships
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
