<?php

namespace App\Usecases\Trainings;

use App\Models\UserGoal;

class SetFitnessGoalAction
{
    public function execute(array $data, int $userId): void
    {
        // ゴールに応じたデータを整理
        $goalData = $this->handleGoalData($data);

        // ユーザーのフィットネスゴールを作成または更新
        UserGoal::updateOrCreate(
            ['user_id' => $userId, 'fitness_goal_id' => $goalData['fitness_goal_id']], // ユニークな組み合わせ
            $goalData
        );
    }

    /**
     * ゴールによって異なるフィールドを処理する
     * 
     * @param array $data
     * @return array
     */
    private function handleGoalData(array $data): array
    {
        // 共通データ
        $goalData = [
            'fitness_goal_id' => $data['fitness_goal_id'],
            'target_weight' => null,
            'target_date' => null,
            'exercise_name' => null,
            'exercise_weight' => null,
        ];

        // ゴールごとの処理
        switch ($data['fitness_goal_id']) {
            case 1: // 減量の場合
                $goalData['target_weight'] = $data['target_weight'];
                $goalData['target_date'] = $data['target_date'];
                break;
        
            case 2: // 筋肥大の場合
                $goalData['target_weight'] = $data['target_weight_muscle'];
                $goalData['target_date'] = $data['target_date_muscle'];
                break;
        
            case 3: // 筋力向上の場合
                $goalData['exercise_name'] = $data['exercise_name'];
                $goalData['exercise_weight'] = $data['exercise_weight'];
                break;
        }        

        return $goalData;
    }
}