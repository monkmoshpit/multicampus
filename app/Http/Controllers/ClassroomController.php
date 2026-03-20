<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Classroom;
use App\Models\Teacher;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Support\Facades\Redirect;

class ClassroomController extends Controller
{
    public function index()
    {
        $classrooms = Classroom::forTenant()
            ->with(['teacher', 'course', 'students'])
            ->get();

        $teachers = Teacher::forTenant()->get();
        $courses = Course::forTenant()->get();
        $students = Student::forTenant()->get();

        return Inertia::render('classroom/index', [
            'classrooms' => $classrooms,
            'teachers' => $teachers,
            'courses' => $courses,
            'allStudents' => $students,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'teacher_id' => 'required|exists:teachers,id',
            'course_id' => 'nullable|exists:courses,id',
            'student_ids' => 'nullable|array',
            'student_ids.*' => 'exists:students,id',
        ]);

        $classroom = Classroom::create([
            'name' => $validated['name'],
            'teacher_id' => $validated['teacher_id'],
            'course_id' => $validated['course_id'] ?? null,
        ]);

        if (!empty($validated['student_ids'])) {
            $classroom->students()->sync($validated['student_ids']);
        }

        return Redirect::route('classrooms.index')->with('success', 'Classroom created successfully.');
    }

    public function update(Request $request, Classroom $classroom)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'teacher_id' => 'required|exists:teachers,id',
            'course_id' => 'nullable|exists:courses,id',
            'student_ids' => 'nullable|array',
            'student_ids.*' => 'exists:students,id',
        ]);

        $classroom->update([
            'name' => $validated['name'],
            'teacher_id' => $validated['teacher_id'],
            'course_id' => $validated['course_id'] ?? null,
        ]);

        $classroom->students()->sync($validated['student_ids'] ?? []);

        return Redirect::route('classrooms.index')->with('success', 'Classroom updated successfully.');
    }

    public function destroy(Classroom $classroom)
    {
        $classroom->delete();

        return Redirect::route('classrooms.index')->with('success', 'Classroom deleted successfully.');
    }
}
