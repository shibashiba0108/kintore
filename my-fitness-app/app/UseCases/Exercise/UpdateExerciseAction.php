<?php

namespace App\Usecases\Exercise;

use App\Models\Exercise;

class UpdateExerciseAction
{
    public function execute(array $data, int $exerciseId)
    {
        $exercise = Exercise::findOrFail($exerciseId);
        $exercise->update($data);
    }
}
