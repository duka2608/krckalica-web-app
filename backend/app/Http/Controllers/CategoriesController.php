<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::paginate(10);
        return view('pages.categories.index')->with(compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pages.categories.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $category = new Category();

        try {
            $category->name = $request->category;
    
            $res = $category->save();

           if(!$res) {
            return redirect()->route('admin.categories')->with('error', 'Došlo je do greške prilikom kreiranja kategorije.');
           } 

            return redirect()->route('admin.categories')->with('success', 'Kategorija uspešno uneta !');
        } catch (\Exception $e) {
            return redirect()->route('admin.categories')->with('error', 'Došlo je do greške prilikom kreiranja kategorije.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = Category::find($id);
        return view('pages.categories.edit')->with(compact('category'));
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
        try {
            $category = Category::find($id);
            $category->name = $request->category;
    
            $res = $category->save();

           if(!$res) {
            return redirect()->route('admin.categories')->with('error', 'Došlo je do greške prilikom ažuriranja kategorije.');
           } 

            return redirect()->route('admin.categories')->with('success', 'Kategorija uspešno ažurirana !');
        } catch (\Exception $e) {
            return redirect()->route('admin.categories')->with('error', 'Došlo je do greške prilikom ažuriranja kategorije.');
        }
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
            $category = Category::find($id);
            $category->delete();

            return response()->json([
                'success' => 'Kategorija uspešno uklonjena.'
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Došlo je do greške prilikom uklanjanja.']);
        }
    }
}
