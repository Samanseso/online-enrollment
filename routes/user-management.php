<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('user_management', '/user_management/students');

    Route::get('user_management/students', function () {
        return Inertia::render('user_management/student-list');
    })->name('student-list');
});
