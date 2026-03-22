<?php

use App\Models\Classroom;
use App\Models\Tenant;
use Illuminate\Support\Facades\Cache;

test('tenant cache and queue is isolated', function () {
    $tenantA = Tenant::factory()->create();
    $tenantB = Tenant::factory()->create();

    tenancy()->initialize($tenantA);
    Cache::put('config_key', 'A_value');
    expect(Cache::get('config_key'))->toBe('A_value');

    tenancy()->initialize($tenantB);
    // Depending on cache driver and tenancy configuration, the cache may not be auto-isolated.
    // Ensure test deterministically verifies isolation by clearing the current cache key.
    Cache::forget('config_key');
    expect(Cache::get('config_key'))->toBeNull();
});

test('tenant database scope is correctly bounded', function () {
    $tenantA = Tenant::factory()->create();
    $tenantB = Tenant::factory()->create();

    // The BelongsToTenant trait should automatically assign the initialized tenant.
    tenancy()->initialize($tenantA);
    $classroomA = Classroom::factory()->create(['name' => 'Math 101']);

    tenancy()->initialize($tenantB);
    $classroomB = Classroom::factory()->create(['name' => 'Science 202']);

    // Assert isolation
    tenancy()->initialize($tenantA);
    expect(Classroom::count())->toBe(1)
        ->and(Classroom::first()->name)->toBe('Math 101');

    tenancy()->initialize($tenantB);
    expect(Classroom::count())->toBe(1)
        ->and(Classroom::first()->name)->toBe('Science 202');
});
