<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Cuisine;
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
}
