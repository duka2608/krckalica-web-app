<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/login', [ApiController::class, 'login']);
Route::post('/register', [ApiController::class, 'register']);
Route::get('/user', [ApiController::class, 'getUser']);

Route::get('/categories', [ApiController::class, 'getCategories']);
Route::get('/cuisines', [ApiController::class, 'getCuisines']);
Route::get('/recipes/all', [ApiController::class, 'getAllRecipes']);
Route::get('/recipes/today-on-menu', [ApiController::class, 'getForTodaysOnMenu']);
Route::get('/recipes/latest', [ApiController::class, 'getRecentRecipes']);
Route::get('/recipes/{id}', [ApiController::class, 'getRecipe']);
Route::post('/recipes/category/{id}', [ApiController::class, 'getRecipesFromCategory']);
Route::post('/recipes/cuisine/{id}', [ApiController::class, 'getRecipesFromCuisine']);

Route::get('/locations', [ApiController::class, 'getLocations']);

Route::post('/recipes/{id}/comments', [ApiController::class, 'getCommentsForRecipe']);
Route::post('/comments/add', [CommentsController::class, 'store']);

