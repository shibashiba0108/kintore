<?php

namespace App\Http\Controllers;

use App\Models\BodyPart;
use App\Models\Exercise;
use App\Http\Requests\ExerciseRequest;
use App\Usecases\Exercise\GetExercisesAction;
use App\Usecases\Exercise\CreateExerciseAction;
use App\Usecases\Exercise\DeleteExerciseAction;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    protected $getExercisesAction;
    protected $createExerciseAction;
    protected $deleteExerciseAction;

    public function __construct(GetExercisesAction $getExercisesAction, CreateExerciseAction $createExerciseAction, DeleteExerciseAction $deleteExerciseAction)
    {
        $this->getExercisesAction = $getExercisesAction;
        $this->createExerciseAction = $createExerciseAction;
        $this->deleteExerciseAction = $deleteExerciseAction;
    }

    /**
     * エクササイズのリストを表示
     */
    public function index()
    {
        // 部位リストとエクササイズリストを取得
        $bodyParts = BodyPart::all();
        $exercises = $this->getExercisesAction->execute();

        // InertiaでReactコンポーネントにデータを渡す
        return Inertia::render('Exercises/Exercise', [
            'bodyParts' => $bodyParts,
            'exercises' => $exercises,
        ]);
    }

    /**
     * 新しいエクササイズを作成
     */
    public function store(ExerciseRequest $request)
    {
        // 新しいエクササイズを作成
        $exercise = $this->createExerciseAction->execute($request->validated());

        // 新しいエクササイズデータをフロントに返す
        return Redirect::route('exercises.index')->with('excs_id', $exercise->id);
    }

    /**
     * エクササイズを削除
     */
    public function destroy($id)
    {
        // エクササイズを削除
        $this->deleteExerciseAction->execute($id);

        // 削除後のリダイレクト
        return Redirect::route('exercises.index')->with('success', 'エクササイズが削除されました');
    }

    public function show($id)
    {
        // 指定されたIDのエクササイズを取得
        $exercise = Exercise::findOrFail($id);

        // エクササイズの詳細をInertiaで表示
        return Inertia::render('Exercises/Detail', [
            'exercise' => $exercise,
        ]);
    }
}