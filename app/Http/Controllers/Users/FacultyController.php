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
        $faculties = Faculty::paginate(10);

        return Inertia::render('user_management/faculties', [
            'faculties' => $faculties,
            'new_faculty' => session('new_faculty'),
        ]);
    }

    public function get_current_page(Request $request) {
        $url = $request->header('referer'); 
        $parsedUrl = parse_url($url);
        $queryString = isset($parsedUrl['query']) ? $parsedUrl['query'] : 'page=1';
        parse_str($queryString, $queryParams);
        $page = $queryParams['page'] ?? 1;

        return $page;
    }

    public function create(Request $request) 
    {
        //dd($request->all());
        $validated = $request->validate([
            'first_name'  => 'required',
            'last_name'   => 'required',
        ]);

        $page = $this->get_current_page($request);
        $new_faculty = Faculty::create($validated);
        return redirect()
            ->route('faculties.index', ['page' => $page])
            ->with('new_faculty', $new_faculty->faculty_id);
    }

    public function destroy (Request $request, Faculty $faculty): RedirectResponse {
        $page = $this->get_current_page($request);
        
        $faculty->delete();

        return redirect()
            ->route('faculties.index', ['page' => $page]);
    }
}


