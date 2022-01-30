<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Cuisine;
use App\Models\Image;
use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $recipes = Recipe::with('user', 'category', 'cuisine', 'ingredients', 'images')->get();
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

        $recipe->save();

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
        $recipe->category_id = $request->category;
        $recipe->cuisine_id = $request->cuisine;
        $recipe->description = $request->description;
        $recipe->preparation_time = $request->preparation_time;

        $recipe->save();

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
        //
    }
}
