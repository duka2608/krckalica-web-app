<?php

namespace App\Http\Controllers;

use App\Models\Cuisine;
use Illuminate\Http\Request;

class CuisinesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cuisines = Cuisine::paginate(10);
        return view('pages.cuisines.index')->with(compact('cuisines'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pages.cuisines.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $cuisine = new Cuisine();

        try {
            $cuisine->name = $request->cuisine;
    
            $res = $cuisine->save();

           if(!$res) {
            return redirect()->route('admin.cuisines')->with('error', 'Došlo je do greške prilikom kreiranja kuhinje.');
           } 

            return redirect()->route('admin.cuisines')->with('success', 'Kuhinja uspešno uneta !');
        } catch (\Exception $e) {
            return redirect()->route('admin.cuisines')->with('error', 'Došlo je do greške prilikom kreiranja kuhinje.');
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
        $cuisine = Cuisine::find($id);
        return view('pages.cuisines.edit')->with(compact('cuisine'));
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
            $cuisine = Cuisine::find($id);
            $cuisine->name = $request->cuisine;
    
            $res = $cuisine->save();

           if(!$res) {
            return redirect()->route('admin.cuisines')->with('error', 'Došlo je do greške prilikom ažuriranja kuhinje.');
           } 

            return redirect()->route('admin.cuisines')->with('success', 'Kuhinja uspešno ažurirana !');
        } catch (\Exception $e) {
            return redirect()->route('admin.cuisines')->with('error', 'Došlo je do greške prilikom ažuriranja kuhinje.');
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
            $cuisine = Cuisine::find($id);
            $cuisine->delete();

            return response()->json([
                'success' => 'Kuhinja uspešno uklonjena.'
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Došlo je do greške prilikom uklanjanja.']);
        }
    }
}
