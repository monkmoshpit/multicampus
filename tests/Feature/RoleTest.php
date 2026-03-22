<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    public function test_newly_registered_users_are_assigned_the_tenant_role()
    {
        $this->post(route('register'), [
            'name' => 'Test Tenant',
            'email' => 'tenant@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'school_name' => 'Test School',
        ]);

        $user = User::where('email', 'tenant@example.com')->first();

        $this->assertEquals(User::ROLE_TENANT, $user->role);
    }

    public function test_role_middleware_allows_access_to_authorized_users()
    {
        $user = User::factory()->create(['role' => User::ROLE_TENANT]);

        $this->actingAs($user)
            ->get('/dashboard')
            ->assertOk();
    }

    public function test_role_middleware_denies_access_to_unauthorized_users()
    {
        $user = User::factory()->create(['role' => User::ROLE_STUDENT]);

        Route::get('/test-tenant-only', function () {
            return 'success';
        })->middleware(['auth', 'role:tenant']);

        $this->actingAs($user)
            ->get('/test-tenant-only')
            ->assertForbidden();
    }

    public function test_role_middleware_allows_access_when_role_matches()
    {
        $user = User::factory()->create(['role' => User::ROLE_TENANT]);

        Route::get('/test-tenant-allowed', function () {
            return 'success';
        })->middleware(['auth', 'role:tenant']);

        $this->actingAs($user)
            ->get('/test-tenant-allowed')
            ->assertOk();
    }
}
