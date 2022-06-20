<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Cuisine;
use App\Models\FavoriteRecipe;
use App\Models\Image;
use App\Models\Ingredient;
use App\Models\Location;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;



class ApiController extends Controller
{
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

    public function getUserRecipes($id) {
        $recipes = Recipe::with('images', 'category', 'cuisine', 'ingredients', 'steps')->where('user_id', $id)->paginate(8);

        return response()->json($recipes, 200);
    }

    public function getUserFavoriteRecipes($id) {
        $recipes = FavoriteRecipe::with('recipe')->where('user_id', $id)->paginate(8);

        foreach($recipes as $recipe) {
            $recipe->recipe->image = Image::where('recipe_id', $recipe->recipe->id)->get();
        }

        return response()->json($recipes, 200);
    }

    public function popularRecipes() {
        $recipes = Recipe::with('images')->orderBy('created_at')->limit(9)->get();
        foreach($recipes as $r) {
            $r->commentCount = $r->comments->count();
        }

        return response()->json($recipes, 200);
    } 

    public function addRecipe(Request $request) {
        try {
            $recipe = new Recipe();
            $recipe->name = $request->recipe_name;
            $recipe->portions = (int)$request->portions;
            $recipe->category_id = $request->category;
            $recipe->cuisine_id = $request->cuisine;
            $recipe->description = $request->description;
            $recipe->preparation_time = (int)$request->preparation_time;
            $recipe->fast = (bool)$request->fast;
            $recipe->advice = $request->advice;
            $recipe->user_id = 2;
            $recipe->slug = Str::slug($request->recipe_name, '-').'-'.Str::uuid()->toString();
            

            $recipe->save();
            $ingredients = json_decode($request->ingredients);

            foreach($ingredients as $ingredient) {
                $newIngredient = new Ingredient();

                $newIngredient->name = $ingredient->name;
                $newIngredient->amount = $ingredient->amount;
                $newIngredient->recipe_id = $recipe->id;
                $newIngredient->save();
            }

            if($request->hasFile('recipe-image')) {
                $image = time()."-".$request->file('recipe-image')->getClientOriginalName();
                $request->file('recipe-image')->storeAs('public/images/recipes/', $image);
                $newImage = new Image();
                $newImage->name = $image;
                $newImage->path = 'storage/images/recipes/';
                $newImage->recipe_id = $recipe->id;
                $newImage->main = true;
    
                $newImage->save();
            }


            return response()->json(['message' => 'Uspešno ste uneli novi recept.'], 201);
        } catch(\Exception $e) {
            return response()->json(['message' => 'Došlo je do greške prilikom unosa recepta.'], 500);
        }
    }

    public function updateRecipe(Request $request, $id) {
        try {
            $recipe = Recipe::find($id);
            $recipe->name = $request->recipe_name;
            $recipe->portions = (int)$request->portions;
            $recipe->category_id = $request->category;
            $recipe->cuisine_id = $request->cuisine;
            $recipe->description = $request->description;
            $recipe->preparation_time = (int)$request->preparation_time;
            $recipe->fast = (bool)$request->fast;
            $recipe->advice = $request->advice;
            $recipe->user_id = 2;
            $recipe->slug = Str::slug($request->recipe_name, '-').'-'.Str::uuid()->toString();
            

            $recipe->save();
            $ingredients = json_decode($request->ingredients);

            foreach($ingredients as $ingredient) {
                $newIngredient = new Ingredient();

                $newIngredient->name = $ingredient->name;
                $newIngredient->amount = $ingredient->amount;
                $newIngredient->recipe_id = $recipe->id;
                $newIngredient->save();
            }

            if($request->hasFile('recipe-image')) {
                $image = time()."-".$request->file('recipe-image')->getClientOriginalName();
                $request->file('recipe-image')->storeAs('public/images/recipes/', $image);
                $newImage = new Image();
                $newImage->name = $image;
                $newImage->path = 'storage/images/recipes/';
                $newImage->recipe_id = $recipe->id;
                $newImage->main = true;
    
                $newImage->save();
            }


            return response()->json(['message' => 'Uspešno ste izmenili recept.'], 201);
        } catch(\Exception $e) {
            return response()->json(['message' => 'Došlo je do greške prilikom izmene recepta.'], 500);
        }
    }

    public function searchRecipes(Request $request) {
        $search = $request->get('search');
        $recipes = Recipe::select('name', 'id')->where('name', 'like', "%{$search}%")->with('images')->get();

        return response()->json($recipes, 200);
    }
}
