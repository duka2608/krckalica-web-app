<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'biography'
    ];

    protected $hidden = [
        'password'
    ];

    public function recipes() {
        return $this->hasMany(Recipe::class);
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
