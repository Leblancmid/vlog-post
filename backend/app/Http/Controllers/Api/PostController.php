<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
            'video_url' => ['nullable', 'url'],
        ]);

        $imageUrl = null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $imageUrl = Storage::url($path);
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
