<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => is_string($this->name) ? trim($this->name) : $this->name,
            'bio' => is_string($this->bio) ? trim($this->bio) : $this->bio,
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string', 'max:1000'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required.',
            'name.max' => 'Name must not exceed 255 characters.',

            'bio.string' => 'Bio must be a valid text.',
            'bio.max' => 'Bio must not exceed 1000 characters.',

            'avatar.image' => 'Avatar must be an image file.',
            'avatar.mimes' => 'Avatar must be a jpg, jpeg, png, or webp file.',
            'avatar.max' => 'Avatar must not be greater than 2MB.',
        ];
    }
}
