<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Cuisine;
use App\Models\Image;
use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RecipesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $recipes = Recipe::with('user', 'category', 'cuisine', 'ingredients', 'images')->paginate(10);
        return view('pages.recipes.index')->with(compact('recipes'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data['categories'] = Category::all();
        $data['cuisines'] = Cuisine::all();

        return view('pages.recipes.edit')->with(compact('data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if(!$request->hasFile('recipe-image')) {
            return redirect()->back()->with('error', 'Morate izabrati sliku recepta');
        }

        $recipe = new Recipe();
        $recipe->name = $request->recipe_name;
        $recipe->portions = (int)$request->portions;
        $recipe->category_id = $request->category;
        $recipe->cuisine_id = $request->cuisine;
        $recipe->description = $request->description;
        $recipe->preparation_time = (int)$request->preparation_time;
        $recipe->fast = $request->fast === 'on' ? true : false;
        $recipe->advice = $request->advice;
        $recipe->user_id = 2;
        $recipe->slug = Str::slug($request->recipe_name, '-').'-'.Str::uuid()->toString();

        $recipe->save();
        $name = $request->name;
        $amount = $request->amount;
        $ingredients = array_map(function ($name, $amount) {
            return [
                'name' => $name,
                'amount' => $amount,
            ];
        }, $name, $amount);
        

        foreach($ingredients as $ingredient) {
            $newIngredient = new Ingredient();

            $newIngredient->name = $ingredient['name'];
            $newIngredient->amount = $ingredient['amount'];
            $newIngredient->recipe_id = $recipe->id;
            $newIngredient->save();
        }

        $image = time()."-".$request->file('recipe-image')->getClientOriginalName();
        $request->file('recipe-image')->storeAs('public/images/recipes/', $image);
        $newImage = new Image();
        $newImage->name = $image;
        $newImage->path = 'storage/images/recipes/';
        $newImage->recipe_id = $recipe->id;
        $newImage->main = true;

        $newImage->save();

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $recipe = Recipe::with('user', 'category', 'cuisine', 'ingredients')->find($id);
        return view('pages.recipes.show')->with(compact('recipe'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data['recipe'] = Recipe::with('user', 'category', 'cuisine', 'ingredients', 'comments', 'images')->find($id);
        $data['categories'] = Category::all();
        $data['cuisines'] = Cuisine::all();

        return view('pages.recipes.edit')->with(compact('data'));
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
        $recipe = Recipe::find($id);
        $recipe->name = $request->recipe_name;
        $recipe->portions = (int)$request->portions;
        $recipe->category_id = $request->category;
        $recipe->cuisine_id = $request->cuisine;
        $recipe->description = $request->description;
        $recipe->preparation_time = (int)$request->preparation_time;
        $recipe->fast = $request->fast === 'on' ? true : false;

        $recipe->save();
        $name = $request->name;
        $amount = $request->amount;
        $ingredients = array_map(function ($name, $amount) {
            return [
                'name' => $name,
                'amount' => $amount,
            ];
        }, $name, $amount);
        
        Ingredient::where("recipe_id", $id)->delete();

        foreach($ingredients as $ingredient) {
            $newIngredient = new Ingredient();

            $newIngredient->name = $ingredient['name'];
            $newIngredient->amount = $ingredient['amount'];
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

        return redirect()->back();
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
            $user = Recipe::find($id);
            $user->delete();

            return response()->json([
                'success' => 'Recept uspesno uklonjen.'
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Doslo je do greske prilikom uklanjanja.']);
        }
    }
}
