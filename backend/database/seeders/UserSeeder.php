<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::insert([
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Mark Lee',
                'email' => 'mark@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Anna Cruz',
                'email' => 'anna@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Carlos Reyes',
                'email' => 'carlos@example.com',
                'password' => Hash::make('password'),
            ],
        ]);
    }
}
