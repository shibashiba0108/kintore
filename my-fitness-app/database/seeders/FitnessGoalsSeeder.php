<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FitnessGoalsSeeder extends Seeder
{
    public function run()
    {
        $goals = [
            ['goal_key' => 'weight_loss', 'goal_name' => '減量', 'description' => '体重を減らすことを目的としたフィットネスプログラム。'],
            ['goal_key' => 'muscle_gain', 'goal_name' => '筋肥大', 'description' => '筋肉の量を増やすことを目的としたフィットネスプログラム。'],
            ['goal_key' => 'strength_gain', 'goal_name' => '筋力向上', 'description' => '筋力を増強することを目的としたフィットネスプログラム。'],
            ['goal_key' => 'maintenance', 'goal_name' => '健康維持', 'description' => '現在の健康状態を維持することを目的としたフィットネスプログラム。'],
        ];

        foreach ($goals as $goal) {
            // すでに存在するかどうかを確認してから挿入
            DB::table('fitness_goals')->updateOrInsert(
                ['goal_key' => $goal['goal_key']], // 一意のキーを指定
                $goal // データを挿入または更新
            );
        }
    }
}