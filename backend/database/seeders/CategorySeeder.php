<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'Doručak',
            'Hladna predjela',
            'Topla predjela',
            'Supe i čorbe',
            'Salate',
            'Glavna jela',
            'Riba i morski plodovi',
            'Sosevi',
            'Torte',
            'Kolači',
            'Zimnica'
        ];

        foreach($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category
            ]);
        }
    }
}
