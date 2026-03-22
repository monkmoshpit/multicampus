<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Grade;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $tenantId = $user->tenant_id;
        $role = $user->role;

        $stats = [];

        // Real activities from CalendarActivity
        $activitiesQuery = \App\Models\CalendarActivity::with('user')->latest();

        if ($role === 'teacher') {
            $teacher = $user->teacher;
            $activitiesQuery->where('user_id', $user->id)
                ->orWhereHas('classroom', function ($q) use ($teacher) {
                    $q->where('teacher_id', $teacher->id);
                });
        } elseif ($role === 'student') {
            $student = $user->student;
            $activitiesQuery->whereHas('classroom', function ($q) use ($student) {
                $q->whereHas('students', function ($sq) use ($student) {
                    $sq->where('student_id', $student->id);
                });
            });
        } else {
            $activitiesQuery->where('tenant_id', $tenantId);
        }

        $activities = $activitiesQuery->take(10)->get()->map(function ($act) {
            return [
                'id' => $act->id,
                'description' => $act->title.': '.$act->description,
                'created_at' => $act->created_at,
                'user' => ['name' => $act->user?->name ?? 'System'],
            ];
        });

        if ($role === 'tenant') {
            $startOfMonth = now()->startOfMonth();
            $startOfSemester = now()->month <= 6 ? now()->startOfYear() : now()->setMonth(7)->startOfMonth();

            $teachersTotal = Teacher::where('tenant_id', $tenantId)->count();
            $teachersThisMonth = Teacher::where('tenant_id', $tenantId)->where('created_at', '>=', $startOfMonth)->count();

            $studentsTotal = Student::where('tenant_id', $tenantId)->count();
            $studentsThisSemester = Student::where('tenant_id', $tenantId)->where('created_at', '>=', $startOfSemester)->count();

            $coursesTotal = Course::where('tenant_id', $tenantId)->count();

            $enrollmentsTotal = Enrollment::where('tenant_id', $tenantId)->count();

            $stats = [
                ['label' => 'Total Teachers', 'value' => $teachersTotal, 'icon' => 'GraduationCap',
                    'trend' => $teachersThisMonth > 0 ? "+{$teachersThisMonth} " . __('this month') : null],
                ['label' => 'Total Students', 'value' => $studentsTotal, 'icon' => 'Users',
                    'trend' => $studentsThisSemester > 0 ? "+{$studentsThisSemester} " . __('this semester') : null],
                ['label' => 'Active Courses', 'value' => $coursesTotal, 'icon' => 'BookOpen',
                    'trend' => null],
                ['label' => 'Enrollments', 'value' => $enrollmentsTotal, 'icon' => 'ListChecks',
                    'trend' => null],
            ];
        } elseif ($role === 'teacher') {
            $teacher = $user->teacher;
            $classroomsCount = $teacher ? $teacher->classrooms()->count() : 0;
            $studentsCount = $teacher ? Student::whereHas('classrooms', function ($q) use ($teacher) {
                $q->where('teacher_id', $teacher->id);
            })->count() : 0;
            $coursesCount = Course::where('tenant_id', $tenantId)->count();

            $stats = [
                ['label' => 'My Classes', 'value' => $classroomsCount, 'icon' => 'Folder', 'trend' => null],
                ['label' => 'My Students', 'value' => $studentsCount, 'icon' => 'Users', 'trend' => null],
                ['label' => 'My Courses', 'value' => $coursesCount, 'icon' => 'Book', 'trend' => null],
            ];
        } elseif ($role === 'student') {
            $student = $user->student;
            $classroomsCount = $student ? $student->classrooms()->count() : 0;
            $averageGrade = Grade::where('student_id', $student->id)->avg('score');
            $assessmentsCount = Grade::where('student_id', $student->id)->count();

            $stats = [
                ['label' => 'My Classes', 'value' => $classroomsCount, 'icon' => 'Folder', 'trend' => null],
                ['label' => 'My Average Score', 'value' => $averageGrade ? number_format($averageGrade, 1).'%' : 'N/A', 'icon' => 'TrendingUp', 'trend' => null],
                ['label' => 'Total Assessments', 'value' => $assessmentsCount, 'icon' => 'Clock', 'trend' => null],
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'school_name' => $user->tenant?->school_name,
            'activities' => $activities,
            'role' => $role,
        ]);
    }
}
