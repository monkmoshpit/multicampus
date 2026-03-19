<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use Illuminate\Support\Facades\Redirect;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::forTenant()->get();

        return Inertia::render('student/index', [
            'students' => $students,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'grade' => 'required|string|max:50',
        ]);

        Student::create($request->only(['first_name', 'last_name', 'grade']));

        return Redirect::route('students.index')->with('success', 'Student created successfully.');
    }

    public function update(Request $request, Student $student)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'grade' => 'required|string|max:50',
        ]);

        $student = Student::forTenant()->findOrFail($student->id);

        $student->update($request->only(['first_name', 'last_name', 'grade']));

        return Redirect::route('students.index')->with('success', 'Student updated successfully.');
    }

    public function destroy(Student $student)
    {
        $student = Student::forTenant()->findOrFail($student->id);
        $student->delete();

        return Redirect::route('students.index')->with('success', 'Student deleted successfully.');
    }
}
