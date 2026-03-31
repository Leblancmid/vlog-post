<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::with(['user'])
            ->latest()
            ->paginate(5);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required'],
            'content' => ['required'],
            'image_url' => ['nullable', 'url'],
            'video_url' => ['nullable', 'url'],
        ]);

        $post = Post::create([
            ...$data,
            'user_id' => $request->user()->id,
        ]);

        return $post->load('user');
    }

    public function show(Post $post)
    {
        return $post->load([
            'user',
            'comments' => function ($query) {
                $query->with([
                    'user',
                    'replies.user',
                ]);
            },
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
