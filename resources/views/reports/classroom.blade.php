<!DOCTYPE html>
<html>
<head>
    <title>{{ __('classroom_report') }} - {{ $classroom->name }}</title>
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
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ __('classroom_report') }}</h1>
        <p>{{ $tenant->name }} - {{ $classroom->name }}</p>
    </div>

    <div class="info-grid">
        <div class="info-item"><span class="label">{{ __('class_name') }}:</span> {{ $classroom->name }}</div>
        <div class="info-item"><span class="label">{{ __('teacher') }}:</span> {{ $classroom->teacher->first_name }} {{ $classroom->teacher->last_name }}</div>
        <div class="info-item"><span class="label">{{ __('total_students') }}:</span> {{ $classroom->students->count() }}</div>
        <div class="info-item"><span class="label">{{ __('report_date') }}:</span> {{ $date }}</div>
    </div>

    <h2>{{ __('students_enrolled') }}</h2>
    <table>
        <thead>
            <tr>
                <th>{{ __('name') }}</th>
                <th>{{ __('email') }}</th>
                <th>{{ __('grade_level') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach($classroom->students as $student)
            <tr>
                <td>{{ $student->first_name }} {{ $student->last_name }}</td>
                <td>{{ $student->email }}</td>
                <td>{{ $student->grade }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h2>{{ __('classroom_activities') }}</h2>
    @if($classroom->calendarActivities->count() > 0)
    <table>
        <thead>
            <tr>
                <th>{{ __('activity') }}</th>
                <th>{{ __('date') }}</th>
                <th>{{ __('time') }}</th>
                <th>{{ __('created_by') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach($classroom->calendarActivities as $activity)
            <tr>
                <td>{{ $activity->title }}</td>
                <td>{{ \Carbon\Carbon::parse($activity->activity_date)->format('d/m/Y') }}</td>
                <td>{{ substr($activity->start_time, 0, 5) }} - {{ substr($activity->end_time, 0, 5) }}</td>
                <td>{{ $activity->user->name }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @else
    <p>{{ __('no_activities_scheduled') }}</p>
    @endif

    <div class="footer">
        {{ __('generated_by') }} - {{ $date }}
    </div>
</body>
</html>
