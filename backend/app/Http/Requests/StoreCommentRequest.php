<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        $content = $this->input('content');

        $this->merge([
            'content' => is_string($content) ? trim($content) : $content,
        ]);
    }

    public function rules(): array
    {
        return [
            'content' => ['required', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'content.required' => 'Comment content is required.',
            'content.string' => 'Comment content must be text.',
            'content.max' => 'Comment content must not exceed 1000 characters.',
        ];
    }
}
