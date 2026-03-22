<?php

namespace App\Http\Controllers;

use App\Models\CalendarActivity;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CalendarActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activities = CalendarActivity::with(['user', 'classroom'])->orderBy('activity_date')->orderBy('start_time')->get();
        $classrooms = Classroom::orderBy('name')->get();

        return Inertia::render('activities/index', [
            'activities' => $activities,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()->role === 'student') {
            return abort(403, 'Students are not allowed to create activities.');
        }

        $validated = $request->validate([
            'classroom_id' => 'required|exists:classrooms,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'activity_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        CalendarActivity::create($validated);

        return redirect()->back()->with('success', 'Activity created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CalendarActivity $calendarActivity)
    {
        if (Auth::user()->role === 'student') {
            return abort(403, 'Students are not allowed to update activities.');
        }

        $validated = $request->validate([
            'classroom_id' => 'required|exists:classrooms,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'activity_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $calendarActivity->update($validated);

        return redirect()->back()->with('success', 'Activity updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CalendarActivity $calendarActivity)
    {
        if (Auth::user()->role === 'student') {
            return abort(403, 'Students are not allowed to delete activities.');
        }

        $calendarActivity->delete();

        return redirect()->back()->with('success', 'Activity deleted successfully.');
    }
}
