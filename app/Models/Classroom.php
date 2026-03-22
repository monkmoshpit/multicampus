<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class Classroom extends Model
{
    use BelongsToTenant;
    use HasFactory;

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

    public function activities()
    {
        return $this->hasMany(ClassroomActivity::class);
    }

    public function calendarActivities()
    {
        return $this->hasMany(CalendarActivity::class);
    }
}
