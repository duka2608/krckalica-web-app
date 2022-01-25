<?php

use App\Http\Controllers\AdminController;
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
});
