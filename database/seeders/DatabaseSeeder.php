<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Course;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create a Primary Tenant (Institutional Admin)
        $tenant = Tenant::create([
            'school_name' => 'MultiCampus Academy',
            'address' => 'Av. Paulista, 1000 - São Paulo, SP',
            'registration_id' => 'MC-2024-0001',
            'domain' => 'academy.multicampus.com',
            'official_email' => 'contact@multicampus.academy',
            'support_line' => '+55 11 99999-9999',
        ]);

        // 2. Create the Tenant Admin User
        $admin = User::create([
            'name' => 'Admin MultiCampus',
            'email' => 'admin@multicampus.com',
            'password' => Hash::make('password'),
            'tenant_id' => $tenant->id,
        ]);

        // 3. Create 3 Teachers
        $teachers = [];
        $teacherData = [
            ['first_name' => 'Ricardo', 'last_name' => 'Oliveira', 'email' => 'ricardo.teacher@multicampus.com'],
            ['first_name' => 'Mariana', 'last_name' => 'Costa', 'email' => 'mariana.teacher@multicampus.com'],
            ['first_name' => 'Carlos', 'last_name' => 'Silva', 'email' => 'carlos.teacher@multicampus.com'],
        ];

        foreach ($teacherData as $data) {
            $user = User::create([
                'name' => $data['first_name'].' '.$data['last_name'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'tenant_id' => $tenant->id,
            ]);

            $teachers[] = Teacher::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'user_id' => $user->id,
                'tenant_id' => $tenant->id,
            ]);
        }

        // 4. Create 2 Courses
        $course1 = Course::create([
            'course_name' => 'Advanced Web Development',
            'teacher_id' => $teachers[0]->id,
            'tenant_id' => $tenant->id,
        ]);

        $course2 = Course::create([
            'course_name' => 'Data Science Foundations',
            'teacher_id' => $teachers[1]->id,
            'tenant_id' => $tenant->id,
        ]);

        // 5. Create 2 Classrooms
        $classroom1 = Classroom::create([
            'name' => 'Web Dev 2024 - Morning',
            'teacher_id' => $teachers[0]->id,
            'course_id' => $course1->id,
            'tenant_id' => $tenant->id,
        ]);

        $classroom2 = Classroom::create([
            'name' => 'Data Science - Evening',
            'teacher_id' => $teachers[1]->id,
            'course_id' => $course2->id,
            'tenant_id' => $tenant->id,
        ]);

        // 6. Create 5 Students
        $studentData = [
            ['first_name' => 'Alice', 'last_name' => 'Martins', 'email' => 'alice@student.com', 'grade' => 'A'],
            ['first_name' => 'Bruno', 'last_name' => 'Souza', 'email' => 'bruno@student.com', 'grade' => 'B'],
            ['first_name' => 'Carla', 'last_name' => 'Fernandes', 'email' => 'carla@student.com', 'grade' => 'A'],
            ['first_name' => 'Diego', 'last_name' => 'Rocha', 'email' => 'diego@student.com', 'grade' => 'C'],
            ['first_name' => 'Elena', 'last_name' => 'Nunes', 'email' => 'elena@student.com', 'grade' => 'B'],
        ];

        foreach ($studentData as $i => $data) {
            $user = User::create([
                'name' => $data['first_name'].' '.$data['last_name'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'tenant_id' => $tenant->id,
            ]);

            $student = Student::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'grade' => $data['grade'],
                'user_id' => $user->id,
                'tenant_id' => $tenant->id,
            ]);

            // Assign students to classrooms (mix them up)
            if ($i < 3) {
                $classroom1->students()->attach($student->id);
            } else {
                $classroom2->students()->attach($student->id);
            }
        }
    }
}
