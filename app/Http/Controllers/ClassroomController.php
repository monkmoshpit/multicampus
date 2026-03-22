<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Course;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $query = Classroom::with(['teacher', 'course', 'students']);

        if ($user->role === 'teacher') {
            $query->where('teacher_id', $user->teacher->id);
        }

        $classrooms = $query->get();

        $teachers = Teacher::get();
        $courses = Course::get();
        $students = Student::get();

        return Inertia::render('classroom/index', [
            'classrooms' => $classrooms,
            'teachers' => $teachers,
            'courses' => $courses,
            'allStudents' => $students,
        ]);
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'tenant') {
            abort(403, 'Only institutional administrators can create classrooms.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'teacher_id' => 'required|exists:teachers,id',
            'course_id' => 'nullable',
            'student_ids' => 'nullable|array',
            'student_ids.*' => 'exists:students,id',
        ]);

        $courseId = $validated['course_id'] ?? null;
        $courseId = ($courseId === 'none' || empty($courseId)) ? null : $courseId;

        // Validate course_id if not null
        if ($courseId) {
            $request->validate(['course_id' => 'exists:courses,id']);
        }

        $classroom = Classroom::create([
            'name' => $validated['name'],
            'teacher_id' => $validated['teacher_id'],
            'course_id' => $courseId,
        ]);

        if (! empty($validated['student_ids'])) {
            $classroom->students()->sync($validated['student_ids']);
        }

        return Redirect::route('classrooms.index')->with('success', 'Classroom created successfully.');
    }

    public function update(Request $request, Classroom $classroom)
    {
        if (auth()->user()->role !== 'tenant') {
            abort(403, 'Only institutional administrators can edit classrooms.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'teacher_id' => 'required|exists:teachers,id',
            'course_id' => 'nullable',
            'student_ids' => 'nullable|array',
            'student_ids.*' => 'exists:students,id',
        ]);

        $courseId = $validated['course_id'] ?? null;
        $courseId = ($courseId === 'none' || empty($courseId)) ? null : $courseId;

        // Validate course_id if not null
        if ($courseId) {
            $request->validate(['course_id' => 'exists:courses,id']);
        }

        $classroom->update([
            'name' => $validated['name'],
            'teacher_id' => $validated['teacher_id'],
            'course_id' => $courseId,
        ]);

        $classroom->students()->sync($validated['student_ids'] ?? []);

        return Redirect::route('classrooms.index')->with('success', 'Classroom updated successfully.');
    }

    public function show(Classroom $classroom)
    {
        $classroom->load([
            'teacher',
            'course',
            'students.grades' => function ($q) use ($classroom) {
                $q->where('classroom_id', $classroom->id);
            },
            'activities',
            'calendarActivities.user',
        ]);

        return Inertia::render('classroom/show', [
            'classroom' => $classroom,
        ]);
    }

    public function destroy(Classroom $classroom)
    {
        if (auth()->user()->role !== 'tenant') {
            abort(403, 'Only institutional administrators can delete classrooms.');
        }

        $classroom->delete();

        return Redirect::route('classrooms.index')->with('success', 'Classroom deleted successfully.');
    }
}
