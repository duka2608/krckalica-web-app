<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'first_name' => 'Dusko',
                'last_name' => 'Stupar',
                'username' => 'dusko.stupar',
                'email' => 'dusko.stupar.128.16@ict.edu.rs',
                'biography' => 'Kratka biografija korisnika',
                'password' => Hash::make('Pass#word123'),
                'location_id' => 1,
                'role_id' => 1
            ],
            [
                'first_name' => 'Pera',
                'last_name' => 'Peric',
                'username' => 'pera.peric',
                'email' => 'pera@gmail.com',
                'biography' => 'Kratka biografija korisnika Pera Peric',
                'password' => Hash::make('Pass#word123'),
                'location_id' => 5,
                'role_id' => 2
            ]
        ]);
    }
}
