<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('comments')->insert([
            [
                'user_id' => 1,
                'recipe_id' => 1,
                'content' => 'Mnogo dobar recept, svaka cast.'
            ],
            [
                'user_id' => 2,
                'recipe_id' => 1,
                'content' => 'Ma bruka recept.'
            ]
        ]);
    }
}
