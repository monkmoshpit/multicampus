<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Tenant;
use App\Models\Activity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Str;

class ActivityTenantScopeTest extends TestCase
{
    use RefreshDatabase;

    public function test_tenant_isolation_on_activities()
    {
        // If factories are missing, we manually insert a basic structure
        $tenant1Id = (string) Str::ulid();
        $tenant2Id = (string) Str::ulid();

        Tenant::insert([
            ['id' => $tenant1Id, 'created_at' => now(), 'updated_at' => now()],
            ['id' => $tenant2Id, 'created_at' => now(), 'updated_at' => now()],
        ]);

        $user1 = User::factory()->create(['tenant_id' => $tenant1Id]);
        $user2 = User::factory()->create(['tenant_id' => $tenant2Id]);

        $this->actingAs($user1);
        Activity::create(['description' => 'User 1 activity']);

        $this->actingAs($user2);
        Activity::create(['description' => 'User 2 activity']);

        $this->actingAs($user1);
        $activities = Activity::all();
        $this->assertCount(1, $activities);
        $this->assertEquals('User 1 activity', $activities->first()->description);
    }
}
