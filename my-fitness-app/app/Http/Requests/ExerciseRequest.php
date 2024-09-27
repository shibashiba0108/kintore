<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExerciseRequest extends FormRequest
{
    public function authorize()
    {
        return true; // 認証されたユーザーのみ許可する
    }

    public function rules()
    {
        return [
            'bdp_id' => 'required|exists:body_part,id', // 部位IDが存在することを確認
            'excs_name' => 'required|string|max:255',    // エクササイズ名
        ];
    }

    public function messages()
    {
        return [
            'bdp_id.required' => '部位を選択してください。',
            'bdp_id.exists' => '選択された部位が無効です。',
            'excs_name.required' => 'エクササイズ名を入力してください。',
            'excs_name.max' => 'エクササイズ名は255文字以内で入力してください。',
        ];
    }
}