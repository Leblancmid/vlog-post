<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)
            ->whereNull('parent_id');
    }

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'image_url',
        'video_url',
    ];
}
