<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CuisineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cuisines = [
            'Univerzalna',
            'Srpska',
            'Italijanska',
            'Španska',
            'Kineska',
            'Bosanska',
            'Grčka',
            'Mađarska',
            'Turska',
            'Nemačka',
            'Ruska',
            'Francuska'
        ];

        foreach($cuisines as $cuisine) {
            DB::table('cuisines')->insert([
                'name' => $cuisine
            ]);
        }
    }
}
