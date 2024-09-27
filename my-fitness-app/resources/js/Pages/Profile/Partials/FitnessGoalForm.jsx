import React from "react";
import { useForm } from "@inertiajs/react";

export default function FitnessGoalForm({ className, currentGoalDetails }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        fitness_goal_id: currentGoalDetails?.fitness_goal_id || "",
        target_weight: currentGoalDetails?.target_weight || "",
        target_weight_muscle: currentGoalDetails?.target_weight_muscle || "",
        target_date: currentGoalDetails?.target_date || "",
        target_date_muscle: currentGoalDetails?.target_date_muscle || "",
        exercise_name: currentGoalDetails?.exercise_name || "",
        exercise_weight: currentGoalDetails?.exercise_weight || "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("profile.setFitnessGoal"), {
            onSuccess: () => {
                alert("フィットネスゴールが設定されました！");
                reset();
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    フィットネスゴール設定
                </h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="goal">
                        フィットネスゴールを選択してください:
                    </label>
                    <select
                        id="goal"
                        name="fitness_goal_id"
                        value={data.fitness_goal_id}
                        onChange={(e) => setData("fitness_goal_id", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">フィットネスゴールを選択</option>
                        <option value="1">減量</option>
                        <option value="2">筋肥大</option>
                        <option value="3">筋力向上</option>
                    </select>
                    <span className="text-red-500">{errors.fitness_goal_id}</span>
                </div>

                {data.fitness_goal_id == "1" && (
                    <div>
                        <label htmlFor="target_weight">目標体重 (kg):</label>
                        <input
                            type="number"
                            id="target_weight"
                            value={data.target_weight}
                            onChange={(e) => setData("target_weight", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <span className="text-red-500">{errors.target_weight}</span>

                        <label htmlFor="target_date">目標日:</label>
                        <input
                            type="date"
                            id="target_date"
                            value={data.target_date}
                            onChange={(e) => setData("target_date", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <span className="text-red-500">{errors.target_date}</span>
                    </div>
                )}

                {data.fitness_goal_id == "2" && (
                    <div>
                        <label htmlFor="target_weight_muscle">目標体重 (kg):</label>
                        <input
                            type="number"
                            id="target_weight_muscle"
                            value={data.target_weight_muscle}
                            onChange={(e) => setData("target_weight_muscle", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <span className="text-red-500">{errors.target_weight_muscle}</span>

                        <label htmlFor="target_date_muscle">目標日:</label>
                        <input
                            type="date"
                            id="target_date_muscle"
                            value={data.target_date_muscle}
                            onChange={(e) => setData("target_date_muscle", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <span className="text-red-500">{errors.target_date_muscle}</span>
                    </div>
                )}

                {data.fitness_goal_id == "3" && (
                    <div>
                        <label htmlFor="exercise_name">種目名:</label>
                        <input
                            type="text"
                            id="exercise_name"
                            value={data.exercise_name}
                            onChange={(e) => setData("exercise_name", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <span className="text-red-500">{errors.exercise_name}</span>

                        <label htmlFor="exercise_weight">目標重量 (kg):</label>
                        <input
                            type="number"
                            id="exercise_weight"
                            value={data.exercise_weight}
                            onChange={(e) => setData("exercise_weight", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <span className="text-red-500">{errors.exercise_weight}</span>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={processing}
                    >
                        設定
                    </button>
                </div>
            </form>
        </section>
    );
}