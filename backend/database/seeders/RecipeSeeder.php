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
        $faker = \Faker\Factory::create();

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
                'name' => 'Šnit sa mešanim voćem',
                'preparation_time' => 180,
                'portions' => 4,
                'fast' => false,
                'advice' => 'Mutiti belanca sa 200 grama šećera, isključivo polako i dodajući bademe, orahe, lešnike i brašno.',
                'category_id' => 10,
                'cuisine_id' => 1,
                'user_id' => 1,
                'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ]
        ]);
    }
}
