<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class FavoriteRecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('favorite')->insert([
            [
                'user_id' => 2,
                'recipe_id' => 1
            ]
        ]);
    }
}
