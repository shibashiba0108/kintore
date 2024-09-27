<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExerciseSeeder extends Seeder
{
    public function run()
    {
        DB::table('exercise')->insert([
            ['id' => 1, 'excs_name' => 'ベンチプレス', 'bdp_id' => 1],
            ['id' => 2, 'excs_name' => 'デッドリフト', 'bdp_id' => 2],
            ['id' => 3, 'excs_name' => 'スクワット', 'bdp_id' => 3],
            ['id' => 4, 'excs_name' => 'ショルダープレス', 'bdp_id' => 4],
            ['id' => 5, 'excs_name' => 'アームカール', 'bdp_id' => 5],
            ['id' => 6, 'excs_name' => 'フレンチプレス', 'bdp_id' => 5],
            ['id' => 7, 'excs_name' => 'クランチ', 'bdp_id' => 6],
            ['id' => 8, 'excs_name' => 'ランニング', 'bdp_id' => 7],
            ['id' => 9, 'excs_name' => 'プランク', 'bdp_id' => 7],
        ]);
    }
}