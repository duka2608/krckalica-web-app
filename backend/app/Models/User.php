<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'biography',
        'location_id',
        'role_id',
        'password',
        'avatar'
    ];

    protected $hidden = [
        'password', 
        'remember_token',
    ];

    public function recipes() {
        return $this->hasMany(Recipe::class);
    }

    public function favorite() {
        return $this->hasMany(FavoriteRecipe::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function location() {
        return $this->belongsTo(Location::class);
    }

    public function role() {
        return $this->belongsTo(Role::class);
    }

}
