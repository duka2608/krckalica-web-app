<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\CuisinesController;
use App\Http\Controllers\LocationsController;
use App\Http\Controllers\RecipesController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.home');
});


Route::prefix('admin')->group(function() {
    Route::get('/', [AdminController::class, 'loginForm'])->name('login.form');

    Route::get('/users', [UsersController::class, 'index'])->name('admin.users');
    Route::get('/users/create', [UsersController::class, 'create'])->name('admin.users.create');
    Route::post('/users', [UsersController::class, 'store'])->name('admin.users.store');
    Route::get('/users/{id}/edit', [UsersController::class, 'edit'])->name('admin.users.edit');
    Route::put('/users/{id}', [UsersController::class, 'update'])->name('admin.users.update');
    Route::delete('/users/{id}', [UsersController::class, 'destroy'])->name('admin.users.destroy');

    Route::get('/recipes', [RecipesController::class, 'index'])->name('admin.recipes');
    Route::get('/recipes/create', [RecipesController::class, 'create'])->name('admin.recipes.create');
    Route::post('/recipes', [RecipesController::class, 'store'])->name('admin.recipes.store');
    Route::get('/recipes/{id}/show', [RecipesController::class, 'show'])->name('admin.recipes.show');
    Route::get('/recipes/{id}/edit', [RecipesController::class, 'edit'])->name('admin.recipes.edit');
    Route::put('/recipes/{id}', [RecipesController::class, 'update'])->name('admin.recipes.update');
    Route::delete('/recipes/{id}', [RecipesController::class, 'destroy'])->name('admin.recipes.destroy');

    Route::get('/locations', [LocationsController::class, 'index'])->name('admin.locations');
    Route::get('/locations/create', [LocationsController::class, 'create'])->name('admin.locations.create');
    Route::post('/locations', [LocationsController::class, 'store'])->name('admin.locations.store');
    Route::get('/locations/{id}/edit', [LocationsController::class, 'edit'])->name('admin.locations.edit');
    Route::put('/locations/{id}', [LocationsController::class, 'update'])->name('admin.locations.update');
    Route::delete('/locations/{id}', [LocationsController::class, 'destroy'])->name('admin.locations.destroy');

    Route::get('/categories', [CategoriesController::class, 'index'])->name('admin.categories');
    Route::get('/categories/create', [CategoriesController::class, 'create'])->name('admin.categories.create');
    Route::post('/categories', [CategoriesController::class, 'store'])->name('admin.categories.store');
    Route::get('/categories/{id}/edit', [CategoriesController::class, 'edit'])->name('admin.categories.edit');
    Route::put('/categories/{id}', [CategoriesController::class, 'update'])->name('admin.categories.update');
    Route::delete('/categories/{id}', [CategoriesController::class, 'destroy'])->name('admin.categories.destroy');

    Route::get('/cuisines', [CuisinesController::class, 'index'])->name('admin.cuisines');
    Route::get('/cuisines/create', [CuisinesController::class, 'create'])->name('admin.cuisines.create');
    Route::post('/cuisines', [CuisinesController::class, 'store'])->name('admin.cuisines.store');
    Route::get('/cuisines/{id}/edit', [CuisinesController::class, 'edit'])->name('admin.cuisines.edit');
    Route::put('/cuisines/{id}', [CuisinesController::class, 'update'])->name('admin.cuisines.update');
    Route::delete('/cuisines/{id}', [CuisinesController::class, 'destroy'])->name('admin.cuisines.destroy');

    Route::delete('/comments/{id}', [CommentsController::class, 'destroy'])->name('admin.comments.destroy');
});
