<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        return Post::with(['user'])
            ->withCount('comments')
            ->latest()
            ->paginate(5);
    }

    public function store(StorePostRequest $request)
    {
        $data = $request->validated();

        $imageUrl = null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $imageUrl = url(Storage::url($path));
        }

        $post = Post::create([
            'title' => $data['title'],
            'content' => $data['content'],
            'image_url' => $imageUrl,
            'video_url' => $data['video_url'] ?? null,
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
}
