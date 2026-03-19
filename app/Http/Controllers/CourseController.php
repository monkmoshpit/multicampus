<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Teacher;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::forTenant()->with('teacher')->get();
        $teachers = Teacher::forTenant()->get();

        return Inertia::render('course/index', [
            'courses' => $courses,
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $tenantId = $request->user()->tenant_id;

        $request->validate([
            'course_name' => 'required|string|max:255',
            'teacher_id' => [
                'required',
                Rule::exists('teachers', 'id')->where('tenant_id', $tenantId),
            ],
        ]);

        Course::create($request->only(['course_name', 'teacher_id']));

        return Redirect::route('courses.index')->with('success', 'Course created successfully.');
    }

    public function update(Request $request, Course $course)
    {
        $tenantId = $request->user()->tenant_id;

        $request->validate([
            'course_name' => 'required|string|max:255',
            'teacher_id' => [
                'required',
                Rule::exists('teachers', 'id')->where('tenant_id', $tenantId),
            ],
        ]);

        $course = Course::forTenant()->findOrFail($course->id);

        $course->update($request->only(['course_name', 'teacher_id']));

        return Redirect::route('courses.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course = Course::forTenant()->findOrFail($course->id);
        $course->delete();

        return Redirect::route('courses.index')->with('success', 'Course deleted successfully.');
    }
}
