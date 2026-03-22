<!DOCTYPE html>
<html>
<head>
    <title>{{ __('student_report') }} - {{ $student->first_name }} {{ $student->last_name }}</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; color: #333; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 10px; color: #777; border-top: 1px solid #ddd; padding-top: 5px; }
        h1 { color: #2563eb; margin-bottom: 5px; text-transform: uppercase; font-size: 24px; }
        h2 { border-left: 4px solid #10b981; padding-left: 10px; color: #1f2937; margin-top: 30px; font-size: 18px; }
        .info-grid { display: block; margin-bottom: 20px; }
        .info-item { margin-bottom: 5px; }
        .label { font-weight: bold; color: #4b5563; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
        th, td { border: 1px solid #e5e7eb; padding: 10px; text-align: left; }
        th { background-color: #f9fafb; font-weight: bold; color: #374151; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: bold; }
        .badge-blue { background-color: #dbeafe; color: #1e40af; }
        .badge-green { background-color: #d1fae5; color: #065f46; }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ __('student_report') }}</h1>
        <p>{{ $tenant->name }} - {{ date('Y') }}</p>
    </div>

    <div class="info-grid">
        <div class="info-item"><span class="label">{{ __('name') }}:</span> {{ $student->first_name }} {{ $student->last_name }}</div>
        <div class="info-item"><span class="label">{{ __('email') }}:</span> {{ $student->email }}</div>
        <div class="info-item"><span class="label">{{ __('grade_level') }}:</span> {{ $student->grade }}</div>
        <div class="info-item"><span class="label">{{ __('report_date') }}:</span> {{ $date }}</div>
    </div>

    <h2>{{ __('enrolled_classrooms') }}</h2>
    <table>
        <thead>
            <tr>
                <th>{{ __('classroom_name') }}</th>
                <th>{{ __('activities_assigned') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach($student->classrooms as $classroom)
            <tr>
                <td>{{ $classroom->name }}</td>
                <td>{{ $classroom->calendarActivities->count() }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    @foreach($student->classrooms as $classroom)
        @if($classroom->calendarActivities->count() > 0)
        <h2>{{ __('activities') }} - {{ $classroom->name }}</h2>
        <table>
            <thead>
                <tr>
                    <th>{{ __('title') }}</th>
                    <th>{{ __('date') }}</th>
                    <th>{{ __('time') }}</th>
                </tr>
            </thead>
            <tbody>
                @foreach($classroom->calendarActivities as $activity)
                <tr>
                    <td>{{ $activity->title }}</td>
                    <td>{{ \Carbon\Carbon::parse($activity->activity_date)->format('d/m/Y') }}</td>
                    <td>{{ substr($activity->start_time, 0, 5) }} - {{ substr($activity->end_time, 0, 5) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
        @endif
    @endforeach

    <div class="footer">
        {{ __('generated_by') }} - {{ $date }}
    </div>
</body>
</html>
