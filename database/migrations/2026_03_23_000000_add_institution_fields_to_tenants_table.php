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
        Schema::table('tenants', function (Blueprint $row) {
            if (!Schema::hasColumn('tenants', 'registration_id')) {
                $row->string('registration_id')->nullable();
            }
            if (!Schema::hasColumn('tenants', 'domain')) {
                $row->string('domain')->nullable();
            }
            if (!Schema::hasColumn('tenants', 'official_email')) {
                $row->string('official_email')->nullable();
            }
            if (!Schema::hasColumn('tenants', 'support_line')) {
                $row->string('support_line')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $row) {
            $row->dropColumn(['registration_id', 'domain', 'official_email', 'support_line']);
        });
    }
};
