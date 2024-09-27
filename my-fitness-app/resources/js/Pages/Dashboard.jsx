import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

export default function Dashboard({
    auth,
    userProfile,
    userGoal,
    lastTraining,
    remainingDays,
    goalAchieved,
}) {
    const [recommendedExercises, setRecommendedExercises] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const getRecommendedExercises = (fitness_goal_id) => {
            let recommendations = [];
            switch (fitness_goal_id) {
                case 1:
                    recommendations = [
                        { exercise: "ランニング", sets: 1, reps: "30分" },
                        { exercise: "クランチ", sets: 3, reps: "100回" },
                    ];
                    break;
                case 2:
                    recommendations = [
                        { exercise: "ベンチプレス", sets: 3, reps: "6回" },
                        { exercise: "スクワット", sets: 3, reps: "6回" },
                    ];
                    break;
                case 3:
                    recommendations = [
                        { exercise: "デッドリフト", sets: 3, reps: "15回" },
                        { exercise: "ショルダープレス", sets: 3, reps: "15回" },
                    ];
                    break;
                case 4:
                    recommendations = [
                        { exercise: "ウォーキング", sets: 1, reps: "30分" },
                        { exercise: "プランク", sets: 3, reps: "30秒" },
                    ];
                    break;
                default:
                    recommendations = [];
            }
            return recommendations;
        };

        if (userGoal) {
            const exercises = getRecommendedExercises(userGoal.fitness_goal_id);
            setRecommendedExercises(exercises);
        }
    }, [userGoal]);

    // フォームのトグル関数
    const toggleContactForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    マイページ
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="flex flex-col min-h-screen">
                <div className="flex-grow py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 space-y-6">
                                {/* プロフィール情報 */}
                                <div className="p-4 border border-gray-300 rounded-md shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">
                                        プロフィール情報
                                    </h3>
                                    <p>
                                        身長:{" "}
                                        <span className="font-medium">
                                            {userProfile?.height ?? "N/A"} cm
                                        </span>
                                    </p>
                                    <p>
                                        体重:{" "}
                                        <span className="font-medium">
                                            {userProfile?.weight ?? "N/A"} kg
                                        </span>
                                    </p>
                                    <p>
                                        生年月日:{" "}
                                        <span className="font-medium">
                                            {userProfile?.birthdate ?? "N/A"}
                                        </span>
                                    </p>
                                    <p>
                                        性別:{" "}
                                        <span className="font-medium">
                                            {userProfile?.gender ?? "N/A"}
                                        </span>
                                    </p>
                                </div>

                                {/* フィットネスゴール */}
                                <div className="p-4 border border-gray-300 rounded-md shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">
                                        フィットネスゴール
                                    </h3>
                                    <p>
                                        目標体重:{" "}
                                        <span className="font-medium">
                                            {userGoal?.target_weight ?? "N/A"}{" "}
                                            kg
                                        </span>
                                    </p>
                                    <p>
                                        目標日:{" "}
                                        <span className="font-medium">
                                            {userGoal?.target_date ?? "N/A"}
                                        </span>
                                    </p>
                                    <p>
                                        残り日数:{" "}
                                        <span className="font-medium">
                                            {remainingDays !== null
                                                ? Math.floor(remainingDays)
                                                : "N/A"}{" "}
                                            日
                                        </span>
                                    </p>
                                    <p>
                                        達成状況:{" "}
                                        <span
                                            className={`font-medium ${
                                                goalAchieved
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {goalAchieved
                                                ? "目標達成"
                                                : "未達成"}
                                        </span>
                                    </p>
                                </div>

                                {/* おすすめのトレーニング */}
                                <div className="p-4 border border-gray-300 rounded-md shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">
                                        おすすめのトレーニング
                                    </h3>
                                    <ul>
                                        {recommendedExercises.length > 0 ? (
                                            recommendedExercises.map(
                                                (exercise, index) => (
                                                    <li
                                                        key={index}
                                                        className="mb-1"
                                                    >
                                                        {exercise.exercise} -{" "}
                                                        <span className="font-medium">
                                                            {exercise.sets}
                                                        </span>{" "}
                                                        セット{" "}
                                                        <span className="font-medium">
                                                            {exercise.reps}
                                                        </span>
                                                    </li>
                                                )
                                            )
                                        ) : (
                                            <li>
                                                お薦めのトレーニングはありません
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* 前回のトレーニング記録 */}
                                <div className="p-4 border border-gray-300 rounded-md shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">
                                        前回のトレーニング記録
                                    </h3>
                                    <p>
                                        種目:{" "}
                                        <span className="font-medium">
                                            {lastTraining?.exercise
                                                ?.excs_name ?? "N/A"}
                                        </span>
                                    </p>
                                    <p>
                                        重量:{" "}
                                        <span className="font-medium">
                                            {lastTraining?.weight_count ??
                                                "N/A"}{" "}
                                            kg
                                        </span>
                                    </p>
                                    <p>
                                        日付:{" "}
                                        <span className="font-medium">
                                            {lastTraining?.pfmc_date ?? "N/A"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* フッター部分 */}
                <footer
                    className={`footer bg-red-600 p-4 ${
                        isFormOpen ? "open" : ""
                    }`}
                >
                    <div className="flex justify-center">
                        <button
                            id="contactButton"
                            onClick={toggleContactForm}
                            className="mb-4 p-2 bg-red-700 text-white rounded"
                        >
                            お問い合わせ
                        </button>
                    </div>
                    {isFormOpen && (
                        <form
                            action="contact.php"
                            method="POST"
                            id="contactForm"
                            className="mb-4"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="お名前"
                                className="border p-2 mb-2 w-full"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="メールアドレス"
                                className="border p-2 mb-2 w-full"
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="お問い合わせ内容"
                                rows="5"
                                className="border p-2 mb-2 w-full"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="p-2 bg-red-700 text-white rounded"
                            >
                                送信
                            </button>
                        </form>
                    )}
                    <p className="text-center">
                        &copy; 2024 Kintrail. All rights reserved.
                    </p>
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}
