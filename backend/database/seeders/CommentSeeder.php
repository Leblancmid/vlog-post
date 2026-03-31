<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        Comment::insert([
            // Main comments
            [
                'post_id' => 1,
                'user_id' => 2,
                'content' => 'Nice vlog!',
                'parent_id' => null,
            ],
            [
                'post_id' => 1,
                'user_id' => 3,
                'content' => 'Great content!',
                'parent_id' => null,
            ],
            [
                'post_id' => 2,
                'user_id' => 1,
                'content' => 'Love this!',
                'parent_id' => null,
            ],
            [
                'post_id' => 3,
                'user_id' => 4,
                'content' => 'Amazing place!',
                'parent_id' => null,
            ],
            [
                'post_id' => 4,
                'user_id' => 5,
                'content' => 'Looks delicious!',
                'parent_id' => null,
            ],

            // Replies
            [
                'post_id' => 1,
                'user_id' => 1,
                'content' => 'Thanks!',
                'parent_id' => 1,
            ],
            [
                'post_id' => 1,
                'user_id' => 2,
                'content' => 'Appreciate it!',
                'parent_id' => 2,
            ],
            [
                'post_id' => 2,
                'user_id' => 3,
                'content' => 'Glad you liked it!',
                'parent_id' => 3,
            ],
            [
                'post_id' => 3,
                'user_id' => 1,
                'content' => 'It really is!',
                'parent_id' => 4,
            ],
            [
                'post_id' => 4,
                'user_id' => 4,
                'content' => 'You should try it!',
                'parent_id' => 5,
            ],
        ]);
    }
}
