<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserProfileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'height' => 'required|numeric',
            'weight' => 'required|numeric',
            'birthdate' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }
}