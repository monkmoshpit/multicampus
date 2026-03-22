<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with('teacher')->get();
        $teachers = Teacher::get();

        return Inertia::render('course/index', [
            'courses' => $courses,
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'tenant') {
            abort(403, 'Only institutional administrators can manage courses.');
        }

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
        if (auth()->user()->role !== 'tenant') {
            abort(403, 'Only institutional administrators can manage courses.');
        }

        $tenantId = $request->user()->tenant_id;

        $request->validate([
            'course_name' => 'required|string|max:255',
            'teacher_id' => [
                'required',
                Rule::exists('teachers', 'id')->where('tenant_id', $tenantId),
            ],
        ]);

        $course = Course::findOrFail($course->id);

        $course->update($request->only(['course_name', 'teacher_id']));

        return Redirect::route('courses.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        if (auth()->user()->role !== 'tenant') {
            abort(403, 'Only institutional administrators can manage courses.');
        }

        $course = Course::findOrFail($course->id);
        $course->delete();

        return Redirect::route('courses.index')->with('success', 'Course deleted successfully.');
    }
}
