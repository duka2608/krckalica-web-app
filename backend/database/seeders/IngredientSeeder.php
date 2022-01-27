<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ingredients')->insert([
            [
                'name' => 'Beli luk',
                'amount' => '2 cena',
                'recipe_id' => 1
            ],
            [
                'name' => 'Belo meso',
                'amount' => '300 grama',
                'recipe_id' => 1
            ],
            [
                'name' => 'Ananas',
                'amount' => '100 grama',
                'recipe_id' => 1
            ],
            [
                'name' => 'Pirinac',
                'amount' => '2 solje',
                'recipe_id' => 1
            ],
            [
                'name' => 'Soja sos',
                'amount' => '1 dl',
                'recipe_id' => 1
            ]
        ]);
    }
}
