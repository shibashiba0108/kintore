<?php

namespace App\Usecases\Exercise;

use App\Models\Exercise;

class GetExercisesAction
{
    public function execute()
    {
        // 全エクササイズを取得
        return Exercise::with('bodyPart')->get();
    }
}