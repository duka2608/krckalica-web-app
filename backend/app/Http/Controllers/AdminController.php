<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function loginForm()
    {
        return view('pages.login');
    }

    public function loginSubmit(Request $request)
    {

        $validation = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        $validation['role_id'] = 1;

        if (Auth::attempt($validation)) {
            $request->session()->regenerate();

            return redirect()->route('admin.users');
        }


        return back()->with('error', 'Proverite kredencijale');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
