<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('classroom_student', function (Blueprint $table) {
            $table->foreignUlid('classroom_id')->constrained('classrooms')->cascadeOnDelete();
            $table->foreignUlid('student_id')->constrained('students')->cascadeOnDelete();
            $table->primary(['classroom_id', 'student_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classroom_student');
    }
};
