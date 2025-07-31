<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Faculty;

class FacultyController extends Controller
{
    public function index(Request $request)
    {
        // you can switch to paginate(10) if the table grows
        $faculties = Faculty::all();

        return Inertia::render('user_management/faculties', [
            'faculties' => $faculties,
        ]);
    }
}


