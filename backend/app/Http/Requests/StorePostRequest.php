<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        $title = $this->input('title');
        $content = $this->input('content');
        $videoUrl = $this->input('video_url');

        $this->merge([
            'title' => is_string($title) ? trim($title) : $title,
            'content' => is_string($content) ? trim($content) : $content,
            'video_url' => is_string($videoUrl) && trim($videoUrl) !== ''
                ? trim($videoUrl)
                : null,
        ]);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'video_url' => ['nullable', 'url', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'title.max' => 'The title must not exceed 255 characters.',
            'content.required' => 'The content field is required.',
            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'The image must be a file of type: jpg, jpeg, png, webp.',
            'image.max' => 'The image must not be greater than 5MB.',
            'video_url.url' => 'The video URL must be a valid URL.',
            'video_url.max' => 'The video URL must not exceed 2048 characters.',
        ];
    }

    public function attributes(): array
    {
        return [
            'video_url' => 'video URL',
        ];
    }
}
