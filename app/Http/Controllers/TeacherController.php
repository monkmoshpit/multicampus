<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::get();

        return Inertia::render('teachers/index', [
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $tenantId = $request->user()->tenant_id;

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('teachers')->where('tenant_id', $tenantId),
                Rule::unique('users', 'email'),
            ],
            'password' => 'nullable|string|min:8',
        ]);

        $password = $request->password ?: 'Welcome@Multicampus';

        DB::transaction(function () use ($request, $tenantId, $password) {
            $user = User::create([
                'name' => $request->first_name.' '.($request->last_name ?? ''),
                'email' => $request->email,
                'password' => Hash::make($password),
                'tenant_id' => $tenantId,
                'role' => User::ROLE_TEACHER,
            ]);

            Teacher::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'user_id' => $user->id,
                'tenant_id' => $tenantId,
            ]);
        });

        return Redirect::route('teachers.index')->with('success', "Teacher created successfully. Initial password: {$password}");
    }

    public function update(Request $request, Teacher $teacher)
    {
        $tenantId = $request->user()->tenant_id;

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('teachers')->ignore($teacher->id)->where('tenant_id', $tenantId),
            ],
        ]);

        $teacher = Teacher::findOrFail($teacher->id);

        $teacher->update($request->only(['first_name', 'last_name', 'email']));

        // Also update the linked user if it exists
        if ($teacher->user) {
            $teacher->user->update([
                'name' => $request->first_name.' '.($request->last_name ?? ''),
                'email' => $request->email,
            ]);
        }

        return Redirect::route('teachers.index')->with('success', 'Teacher updated successfully.');
    }

    public function show(Teacher $teacher)
    {
        $teacher = Teacher::with(['user', 'classrooms.course'])->findOrFail($teacher->id);

        return Inertia::render('teachers/show', [
            'teacher' => $teacher,
        ]);
    }

    public function resetPassword(Request $request, Teacher $teacher)
    {
        $teacher = Teacher::findOrFail($teacher->id);

        if (! $teacher->user) {
            return Redirect::back()->with('error', 'No user account linked to this teacher.');
        }

        $password = $request->password ?: 'Welcome@Multicampus';

        $teacher->user->update([
            'password' => Hash::make($password),
        ]);

        return Redirect::back()->with('success', "Password reset to {$password} successfully.");
    }

    public function destroy(Teacher $teacher)
    {
        $teacher = Teacher::findOrFail($teacher->id);

        $teacher->delete();

        return Redirect::route('teachers.index')->with('success', 'Teacher deleted successfully.');
    }
}
