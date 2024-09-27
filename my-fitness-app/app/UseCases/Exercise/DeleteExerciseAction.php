<?php

namespace App\Usecases\Exercise;

use App\Models\Exercise;

class DeleteExerciseAction
{
    public function execute($id)
    {
        // エクササイズをIDで取得し、削除
        $exercise = Exercise::findOrFail($id);
        $exercise->delete();
    }
}