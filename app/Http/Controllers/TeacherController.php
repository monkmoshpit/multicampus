<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\Teacher;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::forTenant()->get();

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
            ],
        ]);

        Teacher::create($request->only(['first_name', 'last_name', 'email']));

        return Redirect::route('teachers.index')->with('success', 'Teacher created successfully.');
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

        $teacher = Teacher::forTenant()->findOrFail($teacher->id);

        $teacher->update($request->only(['first_name', 'last_name', 'email']));

        return Redirect::route('teachers.index')->with('success', 'Teacher updated successfully.');
    }

    public function destroy(Teacher $teacher)
    {
        $teacher = Teacher::forTenant()->findOrFail($teacher->id);

        $teacher->delete();

        return Redirect::route('teachers.index')->with('success', 'Teacher deleted successfully.');
    }
}