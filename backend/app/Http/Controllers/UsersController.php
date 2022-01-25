<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Location;
use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('role', 'location')->get();

        return view('pages.users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data['roles'] = Role::all();
        $data['locations'] = Location::all();

        return view('pages.users.create', compact('data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $username = $request->username;
        $email = $request->email;
        $password = Hash::make($request->password);
        $biography = $request->biography;
        $location = (int)$request->location;
        $role = (int)$request->role;

        $user = new User();

        try {
            
            $user->first_name = $first_name;
            $user->last_name = $last_name;
            $user->username = $username;
            $user->email = $email;
            $user->biography = $biography;
            $user->password = $password;
            $user->location_id = $location;
            $user->role_id = $role;

            $res = $user->save();

           if(!$res) {
            return redirect()->route('admin.users')->with('error', 'Došlo je do greške prilikom pravljenja korisničkog naloga.');
           } 

            return redirect()->route('admin.users')->with('success', 'Korisnički nalog je uspešno kreiran !');
        } catch (\Exception $e) {
            return redirect()->route('admin.users')->with('error', 'Došlo je do greške prilikom pravljenja korisničkog naloga.');
        }
    }

    public function edit($id)
    {
        $data['roles'] = Role::all();
        $data['locations'] = Location::all();
        $data['user'] = User::findOrFail($id);

        return view('pages.users.edit', compact('data'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $user = User::find($id);
            $user->delete();

            return response()->json([
                'success' => 'Korisnik uspesno uklonjen.'
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Doslo je do greske prilikom uklanjanja.']);
        }
    }
}
