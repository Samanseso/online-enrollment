<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users\StudentController;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('user_management', '/user_management/students');

    Route::get('user_management/students', [StudentController::class, 'index'])->name('students.index');

});
