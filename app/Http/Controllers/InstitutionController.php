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
            ]
        ]);
    }
}
