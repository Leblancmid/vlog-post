<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $data = $request->validate([
            'content' => ['required'],
        ]);

        $comment = Comment::create([
            'post_id' => $post->id,
            'user_id' => $request->user()->id,
            'content' => $data['content'],
        ]);

        return $comment->load('user');
    }

    public function reply(Request $request, Comment $comment)
    {
        $data = $request->validate([
            'content' => ['required'],
        ]);

        $reply = Comment::create([
            'post_id' => $comment->post_id,
            'user_id' => $request->user()->id,
            'parent_id' => $comment->id,
            'content' => $data['content'],
        ]);

        return $reply->load('user');
    }
}
