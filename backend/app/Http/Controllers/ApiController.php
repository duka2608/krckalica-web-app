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

}
