<?php

use App\Models\User;

test('it correctly identifies roles', function () {
    $tenant = new User(['role' => 'tenant']);
    $teacher = new User(['role' => 'teacher']);
    $student = new User(['role' => 'student']);

    expect($tenant->isTenant())->toBeTrue()
        ->and($tenant->isTeacher())->toBeFalse()
        ->and($tenant->isStudent())->toBeFalse();

    expect($teacher->isTeacher())->toBeTrue()
        ->and($teacher->isTenant())->toBeFalse()
        ->and($teacher->isStudent())->toBeFalse();

    expect($student->isStudent())->toBeTrue()
        ->and($student->isTeacher())->toBeFalse()
        ->and($student->isTenant())->toBeFalse();
});

test('it has hidden attributes for security', function () {
    $user = new User();
    
    expect($user->getHidden())->toContain('password', 'two_factor_secret', 'remember_token');
});
