<?php

namespace Database\Factories;

use App\Models\Classroom;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Classroom>
 */
class ClassroomFactory extends Factory
{
    protected $model = Classroom::class;

    public function definition(): array
    {
        return [
            'name' => fake()->word().' '.fake()->numerify('###'),
            'teacher_id' => Teacher::factory(),
            // tenant association is handled by BelongsToTenant when tenancy is initialized in tests
        ];
    }
}
