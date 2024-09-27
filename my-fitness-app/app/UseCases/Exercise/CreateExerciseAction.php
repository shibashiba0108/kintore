<?php

namespace App\Usecases\Exercise;

use App\Models\Exercise;

class CreateExerciseAction
{
    public function execute(array $data)
    {
        // エクササイズの作成
        $exercise = Exercise::create([
            'bdp_id' => $data['bdp_id'],
            'excs_name' => $data['excs_name'],
        ]);

        return $exercise; // 作成したエクササイズを返す
    }
}