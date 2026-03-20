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
        Schema::create('classrooms', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->foreignUlid('teacher_id')->constrained('teachers')->cascadeOnDelete();
            $table->foreignUlid('course_id')->nullable()->constrained('courses')->nullOnDelete();
            $table->foreignUlid('tenant_id')->constrained('tenants')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classrooms');
    }
};
