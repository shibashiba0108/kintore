<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PerformanceRequest extends FormRequest
{
    public function authorize()
    {
        // ユーザーが認証されているか確認
        return auth()->check();
    }

    public function rules()
    {
        return [
            'excs_id' => 'required|exists:exercise,id', // exerciseテーブルに存在するエクササイズID
            'date' => 'required|date',
            'weight' => 'required|numeric',
            'reps' => 'required|integer',
            'sets' => 'required|integer',
            'duration' => 'required|integer',
        ];
    }

    public function messages()
    {
        return [
            'excs_id.required' => 'エクササイズIDが必要です。',
            'excs_id.exists' => '指定されたエクササイズが存在しません。',
            'date.required' => '日付を入力してください。',
            'weight.required' => '重さを入力してください。',
            'reps.required' => '回数を入力してください。',
            'sets.required' => 'セット数を入力してください。',
            'duration.required' => '所要時間を入力してください。',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
