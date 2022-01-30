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
                'preparation_time' => 45,
                'portions' => 4,
                'fast' => false,
                'advice' => 'Ohladiti jelo 10 minuta pre secenja.',
                'category_id' => 1,
                'cuisine_id' => 1,
                'user_id' => 1,
                'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ],
            [
                'name' => 'Recept 2',
                'preparation_time' => 90,
                'portions' => 5,
                'fast' => false,
                'advice' => 'Ohladiti jelo 10 minuta pre secenja.',
                'category_id' => 2,
                'cuisine_id' => 2,
                'user_id' => 2,
                'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ],
            [
                'name' => 'Recept 3',
                'preparation_time' => 80,
                'portions' => 3,
                'fast' => true,
                'advice' => 'Ohladiti jelo 10 minuta pre secenja.',
                'category_id' => 3,
                'cuisine_id' => 3,
                'user_id' => 1,
                'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ]
        ]);
    }
}
