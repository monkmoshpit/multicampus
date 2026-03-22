<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function student(Student $student, Request $request)
    {
        $locale = $request->get('locale', 'en');
        app()->setLocale($locale);

        $student->load(['classrooms.calendarActivities', 'tenant']);

        $data = [
            'student' => $student,
            'date' => date('d/m/Y'),
            'tenant' => $student->tenant,
        ];

        $pdf = Pdf::loadView('reports.student', $data);

        return $pdf->download("report_student_{$student->first_name}_{$student->last_name}.pdf");
    }

    public function classroom(Classroom $classroom, Request $request)
    {
        $locale = $request->get('locale', 'en');
        app()->setLocale($locale);

        $classroom->load(['students', 'calendarActivities.user', 'teacher', 'tenant']);

        $data = [
            'classroom' => $classroom,
            'date' => date('d/m/Y'),
            'tenant' => $classroom->tenant,
        ];

        $pdf = Pdf::loadView('reports.classroom', $data);

        return $pdf->download("report_classroom_{$classroom->name}.pdf");
    }
}
