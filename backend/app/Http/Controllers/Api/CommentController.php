<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, Post $post): JsonResponse
    {
        $data = $request->validated();

        $comment = Comment::create([
            'post_id' => $post->id,
            'user_id' => $request->user()->id,
            'content' => $data['content'],
        ]);

        return response()->json(
            $comment->load('user'),
            201
        );
    }

    public function reply(StoreCommentRequest $request, Comment $comment): JsonResponse
    {
        $data = $request->validated();

        $reply = Comment::create([
            'post_id' => $comment->post_id,
            'user_id' => $request->user()->id,
            'parent_id' => $comment->id,
            'content' => $data['content'],
        ]);

        return response()->json(
            $reply->load('user'),
            201
        );
    }
}
