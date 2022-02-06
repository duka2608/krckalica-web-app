<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Cuisine;
use App\Models\Recipe;
use Illuminate\Http\Request;

class ApiController extends Controller
{
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
        $data['comments'] = Comment::with('recipe', 'user')->where('recipe_id', $id)->get();
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
