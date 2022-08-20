<?php

namespace Database\Seeders;

use App\Models\Cuisine;
use App\Models\Step;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);
        $this->call(LocationSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(CuisineSeeder::class);
        $this->call(RecipeSeeder::class);
        $this->call(ImagesSeeder::class);
        $this->call(IngredientSeeder::class);
        $this->call(CommentSeeder::class);
        $this->call(StepSeeder::class);
        $this->call(FavoriteRecipeSeeder::class);
    }
}
