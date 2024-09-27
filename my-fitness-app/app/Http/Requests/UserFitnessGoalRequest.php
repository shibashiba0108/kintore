<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserFitnessGoalRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'fitness_goal_id' => 'required|exists:fitness_goals,id',  // ゴールIDが必須で、fitness_goalsテーブルに存在するか確認
        ];
        \Log::info('fitness_goal_id:', [$this->input('fitness_goal_id')]);

        // ゴールに応じたバリデーションルールを追加
        switch ($this->input('fitness_goal_id')) {
            case 1: // 減量
                $rules['target_weight'] = 'required|numeric|min:1';  // 減量の目標体重は必須
                $rules['target_date'] = 'required|date';             // 減量の目標日も必須
                break;

            case 2: // 筋肥大
                $rules['target_weight_muscle'] = 'required|numeric|min:1';  // 筋肥大の目標体重は必須
                $rules['target_date_muscle'] = 'required|date';             // 筋肥大の目標日も必須
                break;

            case 3: // 筋力向上
                $rules['exercise_name'] = 'required|string|max:255';       // 種目名は必須
                $rules['exercise_weight'] = 'required|numeric|min:1';      // 筋力向上の目標重量は必須
                break;

            default:
                // デフォルトでエラールールを適用
                throw new \InvalidArgumentException('Invalid fitness goal selected.');
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'fitness_goal_id.required' => 'フィットネスゴールを選択してください。',
            'target_weight.required' => '目標体重を入力してください。',
            'target_date.required' => '目標日を入力してください。',
            'target_weight_muscle.required' => '筋肥大の目標体重を入力してください。',
            'target_date_muscle.required' => '筋肥大の目標日を入力してください。',
            'exercise_name.required' => '種目名を入力してください。',
            'exercise_weight.required' => '目標重量を入力してください。',
        ];
    }
}