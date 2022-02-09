<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Cuisine;
use App\Models\Location;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class ApiController extends Controller
{
    public function register(Request $request) {
        // $validatedData = $request->validate([
        //     'name' => 'required|max:55',
        //     'email' => 'email|required|unique:users',
        //     'password' => 'required|confirmed'
        // ]);

        // $validatedData['password'] = Hash::make($request->password);

        $data = $request->all();
        $data['location_id'] = 1;
        $data['role_id'] = 2;
        $data['biography'] = "Bbbbbbbbbbbbbbbb";
        $data['password'] = Hash::make($request->password);

        $user = User::create($data);

        if(!$user) {
            return response(['message' => "Registration failed"]);
        }

        $accessToken = $user->createToken('authToken')->accessToken;

        return response([ 'user' => $user, 'access_token' => $accessToken]);
    }

    public function login(Request $request) {
        $login = $request->validate([
            'username' => 'required|string',
            'password' => 'required|min:6'
        ]);

        if(!Auth::attempt($login)) {
            return response(['message' => "Invalid login credentials."]);
        }

        $accessToken = Auth::user()->createToken('authToken')->accessToken;

        return response(['user' => Auth::user(), 'access_token' => $accessToken]);
    }

    public function getUser() {
        return response()->json(Auth::user(), 200);
    }

    public function getLocations() {
        $locations = Location::all();
        return response()->json($locations, 200);
    }

    public function getCategories() {
        $categories = Category::all();
        return response()->json($categories, 200);
    }

    public function getCuisines() {
        $cuisines = Cuisine::all();
        return response()->json($cuisines, 200);
    }

    public function getAllRecipes() {
        $recipes = Recipe::with('images')->get();
        return response()->json($recipes, 200);
    }

    public function getForTodaysOnMenu() {
        $recipe = Recipe::inRandomOrder()->with('user', 'images')->firstOrFail();
        return response()->json($recipe, 200);
    }

    public function getRecentRecipes() {
        $recipes = Recipe::with('images')->orderBy('created_at')->limit(3)->get();
        return response()->json($recipes, 200);
    }

    public function getRecipe($id) {
        $data['recipe'] = Recipe::with('images', 'category', 'cuisine', 'ingredients', 'steps', 'user')->where('id', $id)->firstOrFail();
        
        return response()->json($data);
    }

    public function getCommentsForRecipe($id) {
        $data['comments'] = Comment::with('recipe', 'user')->where('recipe_id', $id)->orderBy('created_at', 'desc')->get();

        return response()->json($data);
    }

    public function getRecipesFromCategory($id, Request $request) {
        $limit = $request->limit ? $request->limit : 0;
        $recipeId = $request->recipe ? $request->recipe : 0;

        $query = Recipe::where('category_id', $id);

        if($recipeId) {
            $query = Recipe::where([
                ['id', '!=', $recipeId], 
                ['category_id', '=', $id]
            ]);
        }

        $data['recipes'] = $query->with('images')->offset(0)->limit($limit)->get();
        $data['category'] = Category::find($id);

        return response()->json($data);
    }

    public function getRecipesFromCuisine($id, Request $request) {
        $limit = $request->limit ? $request->limit : 0;

        $data['recipes'] = Recipe::where('cuisine_id', $id)->with('images')->offset(0)->limit($limit)->get();
        $data['cuisine'] = Cuisine::find($id);

        return response()->json($data);
    }

}
