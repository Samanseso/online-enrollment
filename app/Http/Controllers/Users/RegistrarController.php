<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Registrar;

class RegistrarController extends Controller
{
    public function index(Request $request)
    {
        // you can switch to paginate(10) if the table grows
        $registrars = Registrar::all();

        return Inertia::render('user_management/registrars', [
            'registrars' => $registrars,
        ]);
    }
}


