<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users\StudentController;
use App\Http\Controllers\Users\FacultyController;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('user_management', '/user_management/students');

    Route::get('user_management/students', [StudentController::class, 'index'])->name('students.index');
    Route::get('user_management/faculties', [FacultyController::class, 'index'])->name('faculties.index');

    Route::post('user_management/students', [StudentController::class, 'create'])->name('students.create');
    Route::delete('user_management/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');

});
