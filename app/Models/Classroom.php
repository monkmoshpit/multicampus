<?php

namespace App\Models;

use App\Concerns\HasTenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Classroom extends Model
{
    use HasFactory;
    use HasTenant;
    
    // Ulid as primary key
    use HasUlids;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'teacher_id',
        'course_id',
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

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'classroom_student');
    }
}
