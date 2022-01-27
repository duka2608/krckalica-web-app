<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('recipes')->insert([
            [
                'name' => 'Piletina u soja sosu sa ananasom',
                'preparation_time' => '45 min',
                'portions' => '4',
                'fast' => false,
                'advice' => 'Ohladiti jelo 10 minuta pre secenja.',
                'category_id' => 1,
                'cuisine_id' => 1,
                'user_id' => 1
            ],
            [
                'name' => 'Recept 2',
                'preparation_time' => '90 min',
                'portions' => '4',
                'fast' => false,
                'advice' => 'Ohladiti jelo 10 minuta pre secenja.',
                'category_id' => 2,
                'cuisine_id' => 2,
                'user_id' => 2
            ],
            [
                'name' => 'Recept 3',
                'preparation_time' => '80 min',
                'portions' => '4',
                'fast' => true,
                'advice' => 'Ohladiti jelo 10 minuta pre secenja.',
                'category_id' => 3,
                'cuisine_id' => 3,
                'user_id' => 1
            ]
        ]);
    }
}
