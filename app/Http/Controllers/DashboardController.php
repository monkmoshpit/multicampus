<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Activity;

class DashboardController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;

        $teacherCount = Teacher::where('tenant_id', $tenantId)->count();
        $studentCount = Student::where('tenant_id', $tenantId)->count();
        $courseCount = Course::where('tenant_id', $tenantId)->count();
        $enrollmentCount = Enrollment::where('tenant_id', $tenantId)->count();

        $activities = Activity::with('user')->latest()->take(4)->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'teachers' => $teacherCount,
                'students' => $studentCount,
                'courses' => $courseCount,
                'enrollments' => $enrollmentCount,
            ],
            'school_name' => Auth::user()->tenant?->school_name,
            'activities' => $activities,
        ]);
    }
}
