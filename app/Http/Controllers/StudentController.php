<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if ($user->role === 'teacher') {
            $teacher = $user->teacher;
            $students = Student::whereHas('classrooms', function ($q) use ($teacher) {
                $q->where('teacher_id', $teacher->id);
            })->get();
        } else {
            $students = Student::get();
        }

        return Inertia::render('student/index', [
            'students' => $students,
        ]);
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'tenant') {
            abort(403, 'Only institutional administrators can manage students.');
        }

        $tenantId = $request->user()->tenant_id;

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('students')->where('tenant_id', $tenantId),
                Rule::unique('users', 'email'),
            ],
            'grade' => 'required|string|max:50',
            'password' => 'nullable|string|min:8',
        ]);

        $password = $request->password ?: 'Welcome@Multicampus';

        DB::transaction(function () use ($request, $tenantId, $password) {
            $user = User::create([
                'name' => $request->first_name.' '.($request->last_name ?? ''),
                'email' => $request->email,
                'password' => Hash::make($password),
                'tenant_id' => $tenantId,
                'role' => User::ROLE_STUDENT,
            ]);

            Student::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'grade' => $request->grade,
                'user_id' => $user->id,
                'tenant_id' => $tenantId,
            ]);
        });

        return Redirect::route('students.index')->with('success', "Student created successfully. Initial password: {$password}");
    }

    public function update(Request $request, Student $student)
    {
        if (auth()->user()->role !== 'tenant') {
            abort(403, 'Only institutional administrators can manage students.');
        }

        $tenantId = $request->user()->tenant_id;

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('students')->ignore($student->id)->where('tenant_id', $tenantId),
            ],
            'grade' => 'required|string|max:50',
        ]);

        $student = Student::findOrFail($student->id);

        $student->update($request->only(['first_name', 'last_name', 'email', 'grade']));

        // Also update the linked user if it exists
        if ($student->user) {
            $student->user->update([
                'name' => $request->first_name.' '.($request->last_name ?? ''),
                'email' => $request->email,
            ]);
        }

        return Redirect::route('students.index')->with('success', 'Student updated successfully.');
    }

    public function resetPassword(Request $request, Student $student)
    {
        if (auth()->user()->role !== 'tenant') {
            abort(403, 'Only institutional administrators can reset student passwords.');
        }

        $student = Student::findOrFail($student->id);

        if (! $student->user) {
            return Redirect::back()->with('error', 'No user account linked to this student.');
        }

        $password = $request->password ?: 'Welcome@Multicampus';

        $student->user->update([
            'password' => Hash::make($password),
        ]);

        return Redirect::back()->with('success', "Password reset to {$password} successfully.");
    }

    public function destroy(Student $student)
    {
        if (auth()->user()->role !== 'tenant') {
            abort(403, 'Only institutional administrators can manage students.');
        }

        $student = Student::findOrFail($student->id);
        $student->delete();

        return Redirect::route('students.index')->with('success', 'Student deleted successfully.');
    }
}
