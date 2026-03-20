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
        $user = Auth::user();
        $tenantId = $user->tenant_id;
        $role = $user->role;

        $stats = [];
        $activities = Activity::with('user')->latest()->take(5)->get();

        if ($role === 'tenant') {
            $stats = [
                ['label' => 'Total Teachers', 'value' => Teacher::where('tenant_id', $tenantId)->count(), 'icon' => 'GraduationCap', 'trend' => '+2 this month'],
                ['label' => 'Total Students', 'value' => Student::where('tenant_id', $tenantId)->count(), 'icon' => 'Users', 'trend' => '+15 this semester'],
                ['label' => 'Active Courses', 'value' => Course::where('tenant_id', $tenantId)->count(), 'icon' => 'BookOpen', 'trend' => '4 departments'],
                ['label' => 'Enrollments', 'value' => Enrollment::where('tenant_id', $tenantId)->count(), 'icon' => 'ListChecks', 'trend' => '98% retention'],
            ];
        } elseif ($role === 'teacher') {
            $teacher = $user->teacher;
            $classroomsCount = $teacher ? $teacher->classrooms()->count() : 0;
            $studentsCount = $teacher ? Student::whereHas('classrooms', function($q) use ($teacher) {
                $q->where('teacher_id', $teacher->id);
            })->count() : 0;
            $coursesCount = Course::where('tenant_id', $tenantId)->count(); // Simplified for now

            $stats = [
                ['label' => 'My Classes', 'value' => $classroomsCount, 'icon' => 'Folder', 'trend' => 'Active now'],
                ['label' => 'My Students', 'value' => $studentsCount, 'icon' => 'Users', 'trend' => 'Across all classes'],
                ['label' => 'My Courses', 'value' => $coursesCount, 'icon' => 'Book', 'trend' => 'Assigned to you'],
            ];
        } elseif ($role === 'student') {
            $student = $user->student;
            $classroomsCount = $student ? $student->classrooms()->count() : 0;
            
            $stats = [
                ['label' => 'My Classes', 'value' => $classroomsCount, 'icon' => 'Folder', 'trend' => 'Enrolled'],
                ['label' => 'My Grades', 'value' => 'A+', 'icon' => 'TrendingUp', 'trend' => 'Top 5%'],
                ['label' => 'Attendance', 'value' => '94%', 'icon' => 'Clock', 'trend' => 'This month'],
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
