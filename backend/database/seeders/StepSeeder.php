<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class StepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('steps')->insert(
            [
                'description' => 'Opis postupka 1',
                'recipe_id' => 1
            ],
            [
                'description' => 'Opis postupka 2',
                'recipe_id' => 1
            ],
            [
                'description' => 'Opis postupka 3',
                'recipe_id' => 1
            ],
            [
                'description' => 'Opis postupka 4',
                'recipe_id' => 1
            ],
            [
                'description' => 'Opis postupka 5',
                'recipe_id' => 1
            ],
            [
                'description' => 'Opis postupka 1',
                'recipe_id' => 2
            ],
            [
                'description' => 'Opis postupka 2',
                'recipe_id' => 2
            ],
            [
                'description' => 'Opis postupka 3',
                'recipe_id' => 2
            ],
            [
                'description' => 'Opis postupka 4',
                'recipe_id' => 2
            ],
            [
                'description' => 'Opis postupka 5',
                'recipe_id' => 2
            ]
        );
    }
}
