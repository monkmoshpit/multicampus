<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use App\Models\Tenant;
use App\Models\Teacher;
use App\Models\Student;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;
    use HasUlids;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The data type of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Role constants.
     */
    const ROLE_TENANT = 'tenant';
    const ROLE_TEACHER = 'teacher';
    const ROLE_STUDENT = 'student';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'tenant_id',
        'role',
    ];

    /**
     * Tenant relationship.
     */
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Teacher relationship.
     */
    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }

    /**
     * Student relationship.
     */
    public function student()
    {
        return $this->hasOne(Student::class);
    }

    /**
     * Role checks.
     */
    public function isTenant(): bool
    {
        return $this->role === self::ROLE_TENANT;
    }

    public function isTeacher(): bool
    {
        return $this->role === self::ROLE_TEACHER;
    }

    public function isStudent(): bool
    {
        return $this->role === self::ROLE_STUDENT;
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
}
