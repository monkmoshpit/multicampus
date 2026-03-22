<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GradeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role !== 'student') {
            abort(403);
        }

        $grades = Grade::with('classroom.teacher')
            ->where('student_id', $user->student->id)
            ->get();

        return Inertia::render('student/grades', [
            'grades' => $grades,
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $tenantId = $user->tenant_id;

        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'classroom_id' => 'required|exists:classrooms,id',
            'score' => 'required|numeric|min:0|max:100',
            'comments' => 'nullable|string',
        ]);

        $teacherId = $user->role === 'teacher' ? ($user->teacher->id ?? null) : $request->teacher_id;

        if (! $teacherId && $user->role !== 'tenant') {
            abort(403, 'Unauthorized teacher profile.');
        }

        Grade::updateOrCreate(
            [
                'student_id' => $validated['student_id'],
                'classroom_id' => $validated['classroom_id'],
                'tenant_id' => $tenantId,
            ],
            [
                'teacher_id' => $teacherId,
                'score' => $validated['score'],
                'comments' => $validated['comments'],
            ]
        );

        return Redirect::back()->with('success', 'Grade saved successfully.');
    }
}
