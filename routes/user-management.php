<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users\StudentController;
use App\Http\Controllers\Users\FacultyController;
use App\Http\Controllers\Users\RegistrarController;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('user_management', '/user_management/students');

    Route::get('user_management/students', [StudentController::class, 'index'])->name('students.index');
    Route::get('user_management/students/{student}', [StudentController::class, 'retrieve'])->name('students.retrieve');

    Route::get('user_management/faculties', [FacultyController::class, 'index'])->name('faculties.index');
    Route::get('user_management/registrars', [RegistrarController::class, 'index'])->name('registrars.index');
    Route::post('user_management/students', [StudentController::class, 'create'])->name('students.create');
    Route::post('user_management/faculties', [FacultyController::class, 'create'])->name('faculties.create');

    Route::delete('user_management/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
    Route::delete('user_management/faculties/{faculty}', [FacultyController::class, 'destroy'])->name('faculties.destroy');
});
