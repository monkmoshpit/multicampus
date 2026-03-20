<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Initialize any application services.
     */
    public function boot(): void
    {
        Paginator::useTailwind();

        $this->configureDefaults();

        // Ensure route model binding is tenant-aware. This prevents cross-tenant data access
        // even if a controller forgets to scope queries by tenant.
        Route::bind('student', fn ($value) => Student::forTenant()->findOrFail($value));
        Route::bind('teacher', fn ($value) => Teacher::forTenant()->findOrFail($value));
        Route::bind('course', fn ($value) => Course::forTenant()->findOrFail($value));
        Route::bind('enrollment', fn ($value) => Enrollment::forTenant()->findOrFail($value));
        Route::bind('subject', fn ($value) => Subject::forTenant()->findOrFail($value));
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }
}
