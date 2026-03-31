<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::insert([
            [
                'title' => 'My First Vlog',
                'content' => 'This is my first vlog post!',
                'user_id' => 1,
            ],
            [
                'title' => 'A Day in My Life',
                'content' => 'Sharing my daily routine.',
                'user_id' => 2,
            ],
            [
                'title' => 'Travel Vlog',
                'content' => 'Visited a beautiful place today.',
                'user_id' => 3,
            ],
            [
                'title' => 'Food Trip',
                'content' => 'Trying out street foods!',
                'user_id' => 4,
            ],
            [
                'title' => 'Workout Routine',
                'content' => 'My daily fitness routine.',
                'user_id' => 5,
            ],
        ]);
    }
}
