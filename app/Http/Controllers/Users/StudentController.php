<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Student;

class StudentController extends Controller
{
    /**
     * Show the student list page.
     */
    public function index(Request $request)
    {
        // you can switch to paginate(10) if the table grows
        $students = Student::all();

        return Inertia::render('user_management/students', [
            'students' => $students,
        ]);
    }

    public function create(Request $request): RedirectResponse {





        $validated = $request->validate([
            'first_name'  => 'required',
            'last_name'   => 'required',
            'middle_name' => 'required',
            'birth_date' => 'required',
            'gender' => 'required',
            'email' => 'required',
            'contact_number' => 'required',
            'address' => 'required',
            'barangay' => 'required',
            'city' => 'required',
            'program_id' => 'required',
            'year_level' => 'required',
        ]);

        Student::create($validated);


        return redirect('user_management/students');
    }


}
