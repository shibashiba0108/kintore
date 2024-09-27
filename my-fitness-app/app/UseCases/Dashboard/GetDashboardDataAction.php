<?php

namespace App\Usecases\Dashboard;

use App\Models\UserProfile;
use App\Models\UserGoal;
use App\Models\Performance;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class GetDashboardDataAction
{
    public function execute()
    {
        $userId = Auth::id(); // ログイン中のユーザーIDを取得

        // ユーザープロフィールとゴールを取得
        $userProfile = UserProfile::where('user_id', $userId)->first();
        $userGoal = UserGoal::where('user_id', $userId)->first();

        // 最後のトレーニング記録を取得
        $lastTraining = Performance::with('exercise')->where('user_id', $userId)->latest('pfmc_date')->first();

        // ゴール達成までの残り日数を計算
        $remainingDays = $userGoal ? (int) Carbon::now()->diffInDays($userGoal->target_date, false) : null;

        // ゴール達成状況の確認（体重減少か筋肉増加か）
        $goalAchieved = false;
        if ($userProfile && $userGoal) {
            if ($userGoal->fitness_goal_id == 1) {
                // 減量ゴール
                $goalAchieved = $userProfile->weight <= $userGoal->target_weight;
            } elseif ($userGoal->fitness_goal_id == 2) {
                // 筋肥大ゴール
                $goalAchieved = $userProfile->weight >= $userGoal->target_weight;
            }
        }

        return [
            'userProfile' => $userProfile,
            'userGoal' => $userGoal,
            'lastTraining' => $lastTraining,
            'remainingDays' => $remainingDays,
            'goalAchieved' => $goalAchieved,
        ];
    }
}
