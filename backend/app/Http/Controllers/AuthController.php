<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->middleware("auth:api",["except" => ["login","register"]]);
        $this->user = new User;
    }

    public function register(Request $request) {

        $validatedData = Validator::make($request->all(), [
            'first_name' => 'required|regex:/^([A-Z][a-z]+)$/',
            'last_name' => 'required|regex:/^([A-Z][a-z]+)$/',
            'username' => 'required|unique:users,username|min:8|max:15',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|max:20'
        ]);

        if($validatedData->fails()) {
            return response()->json([
                'message' => $validatedData->messages()->toArray()
            ], 500);
        }

        $validatedData = $request->all();
        $validatedData['password'] = Hash::make($request->password);

        $validatedData['location_id'] = 1;
        $validatedData['role_id'] = 2;
        $validatedData['biography'] = "Ja sam Bcava.";

        // $data = (array)$validatedData;

        $user = $this->user->create($validatedData);

        if(!$user) {
            return response(['message' => "Registration failed"]);
        }

        return response()->json([
            'message' => "Uspesna registracija"
        ], 200);
    }

    public function login(Request $request) {
        $login = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|min:6'
        ]);

        if($login->fails()) {
            return response()->json([
                'message' => $login->messages()->toArray()
            ], 500);
        }

        $credentials = $request->only(["username", "password"]);
        $user = User::where('username', $credentials['username'])->first();

        if(!$user) {
            return response()->json([
                'message' => "User does not exist."
            ], 422);
        }

        if(!Auth::attempt($credentials)) {
            return response()->json([
                'message' => "Invalid username or password."
            ], 422);
        }

        $accessToken = Auth::user()->createToken('authToken')->accessToken;

        return response(['user' => Auth::user(), 'access_token' => $accessToken]);
    }

    public function getUser() {
        $user = Auth::guard('api')->user();
        $user->location;
        $user->recipesCount = count($user->recipes);
        $user->commentsCount = count($user->comments);
        return response()->json($user, 200);
    }

    public function logout(Request $request) {
        Auth::guard('api')->logout();

        return response()->json([
            'message' => "Successful logout."
        ], 204);
    }

}
