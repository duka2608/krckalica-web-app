<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $locations = Location::paginate(10);
        return view('pages.locations.index')->with(compact('locations'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pages.locations.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $location = new Location();

        try {
            $location->name = $request->location;
    
            $res = $location->save();

           if(!$res) {
            return redirect()->route('admin.locations')->with('error', 'Došlo je do greške prilikom kreiranja lokacije.');
           } 

            return redirect()->route('admin.locations')->with('success', 'Lokacija uspešno uneta !');
        } catch (\Exception $e) {
            return redirect()->route('admin.locations')->with('error', 'Došlo je do greške prilikom kreiranja lokacije.');
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
        $location = Location::find($id);

        return view('pages.locations.edit')->with(compact('location'));
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
            $location = Location::find($id);
            $location->name = $request->location;
    
            $res = $location->save();

           if(!$res) {
            return redirect()->route('admin.locations')->with('error', 'Došlo je do greške prilikom ažuriranja lokacije.');
           } 

            return redirect()->route('admin.locations')->with('success', 'Lokacija uspešno ažurirana !');
        } catch (\Exception $e) {
            return redirect()->route('admin.locations')->with('error', 'Došlo je do greške prilikom ažuriranja lokacije.');
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
            $location = Location::find($id);
            $location->delete();

            return response()->json([
                'success' => 'Korisnik uspesno uklonjen.'
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Doslo je do greske prilikom uklanjanja.']);
        }
    }
}
