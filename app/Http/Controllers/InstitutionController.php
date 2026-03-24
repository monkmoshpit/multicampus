<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InstitutionController extends Controller
{
    public function index()
    {
        $tenant = Auth::user()->tenant;

        return Inertia::render('institution/Index', [
            'tenant' => $tenant,
            'stats' => [
                'teachers' => \App\Models\Teacher::where('tenant_id', Auth::user()->tenant_id)->count(),
                'students' => \App\Models\Student::where('tenant_id', Auth::user()->tenant_id)->count(),
                'courses' => \App\Models\Course::where('tenant_id', Auth::user()->tenant_id)->count(),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $tenant = Auth::user()->tenant;

        $request->validate([
            'school_name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'registration_id' => 'nullable|string|max:255',
            'domain' => 'nullable|string|max:255',
            'official_email' => 'nullable|email|max:255',
            'support_line' => 'nullable|string|max:255',
        ]);

        $tenant->update($request->all());

        return back()->with('success', 'Institution updated successfully.');
    }
}
