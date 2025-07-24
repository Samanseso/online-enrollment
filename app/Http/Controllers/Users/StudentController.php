<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Student;

class StudentController extends Student
{
    /**
     * Show the student list page.
     */
    public function index(Request $request)
    {
        // you can switch to paginate(10) if the table grows
        $students = Student::all();

        return Inertia::render('user_management/student-list', [
            'students' => $students,
        ]);
    }
}
