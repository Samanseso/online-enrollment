<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Session;
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


        return Inertia::render('user_management/students', [
            'students' => Student::paginate(12),
            'new_student' => session('new_student')
        ]);
    }

    public function create(Request $request) 
    {

        

        //dd($request->all());
        $validated = $request->validate([
            'first_name'  => 'required',
            'last_name'   => 'required',
            'middle_name' => 'required',
            'email'          => 'required',
            'contact_number' => 'required',
            'address'        => 'required',
            'barangay'       => 'required',
            'city'           => 'required',
            'program_id' => 'required',
            'year_level' => 'required'
        ]);

        $url = $request->header('referer'); 
        $parsedUrl = parse_url($url);
        parse_str($parsedUrl['query'], $queryParams);
        $page = $queryParams['page'] ?? 1;
        
        $new_student = Student::create($validated);
        return redirect()
            ->route('students.index', ['page' => $page])
            ->with('new_student', $new_student->student_id);
    }

    public function destroy(Request $request, Student $student): RedirectResponse
    {     
        $url = $request->header('referer'); 
        $parsedUrl = parse_url($url);
        parse_str($parsedUrl['query'], $queryParams);
        $page = $queryParams['page'] ?? 1;


        $student->delete();
        return redirect()->route('students.index', ['page' => $page]);
    }
}
