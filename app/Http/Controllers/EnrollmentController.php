<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Course;

class EnrollmentController extends Controller
{
    public function index()
    {
        $enrollments = Enrollment::forTenant()->with(['student', 'course'])->get();
        $students = Student::forTenant()->get();
        $courses = Course::forTenant()->get();

        return Inertia::render('enrollment/index', [
            'enrollments' => $enrollments,
            'students' => $students,
            'courses' => $courses,
        ]);
    }

    public function store(Request $request)
    {
        $tenantId = $request->user()->tenant_id;

        $request->validate([
            'student_id' => [
                'required',
                Rule::exists('students', 'id')->where('tenant_id', $tenantId),
            ],
            'course_id' => [
                'required',
                Rule::exists('courses', 'id')->where('tenant_id', $tenantId),
            ],
        ]);

        Enrollment::create([
            'student_id' => $request->student_id,
            'course_id' => $request->course_id,
            'enrollment_date' => now(),
        ]);

        return Redirect::route('enrollments.index')->with('success', 'Enrollment created successfully.');
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment = Enrollment::forTenant()->findOrFail($enrollment->id);
        $enrollment->delete();

        return Redirect::route('enrollments.index')->with('success', 'Enrollment deleted successfully.');
    }
}
