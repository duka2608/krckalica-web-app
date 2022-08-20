<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('images')->insert([
            [
                'name' => '1660826261-Full_English_breakfast.jpg',
                'path' => 'storage/images/recipes/',
                'main' => 1,
                'recipe_id' => 1
            ]
        ]);
    }
}
