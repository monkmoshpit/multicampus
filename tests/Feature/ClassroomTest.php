<?php

namespace Tests\Feature;

use App\Models\Student;
use App\Models\Teacher;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClassroomTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected $tenant;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutExceptionHandling();
        $this->tenant = Tenant::create(['school_name' => 'Test Tenant', 'address' => 'Test Address']);
        $this->user = User::factory()->create([
            'tenant_id' => $this->tenant->id,
        ]);
    }

    public function test_can_list_classrooms()
    {
        $response = $this->actingAs($this->user)
            ->get(route('classrooms.index'));

        $response->assertStatus(200);
    }

    public function test_can_create_classroom()
    {
        $this->actingAs($this->user);

        $teacher = Teacher::forceCreate([
            'tenant_id' => $this->tenant->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
        ]);

        $student = Student::forceCreate([
            'tenant_id' => $this->tenant->id,
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'grade' => '10A',
        ]);

        $response = $this->post(route('classrooms.store'), [
            'name' => 'New Classroom',
            'teacher_id' => $teacher->id,
            'student_ids' => [$student->id],
        ]);

        $response->assertRedirect(route('classrooms.index'));
        $this->assertDatabaseHas('classrooms', ['name' => 'New Classroom']);
        $this->assertDatabaseHas('classroom_student', ['student_id' => $student->id]);
    }
}
