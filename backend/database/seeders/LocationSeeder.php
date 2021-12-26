<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $locations = [
            'Beograd',
            'Novi Sad',
            'Niš',
            'Kragujevac',
            'Subotica',
            'Leskovac',
            'Novi Pazar',
            'Kruševac',
            'Vranje',
            'Sombor',
            'Vršac',
            'Kikinda',
            'Požarevac',
            'Smederevo',
            'Valjevo',
            'Šabac',
            'Inđija',
            'Zrenjanin',
            'Loznica',
            'Sremska Mitrovica',
            'Čačak',
            'Užice',
            'Zaječar'
        ];

        foreach($locations as $location) {
            DB::table('locations')->insert([
                'name' => $location
            ]);
        }
    }
}
