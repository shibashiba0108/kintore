import React from "react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Performance() {
    // サーバーサイドから渡されたデータを取得
    const { auth, dataArr } = usePage().props;
    const user = auth ? auth.user : null;

    // 削除ボタンのハンドラー関数
    const handleDelete = (id) => {
        if (confirm("この記録を削除してもよろしいですか？")) {
            Inertia.delete(route("performance.destroy", id), {
                preserveScroll: true, // スクロール位置を維持
                onSuccess: () => {
                    alert("記録が削除されました。");
                    Inertia.reload({ only: ['dataArr'] }); // dataArrだけ再取得
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    今日のトレーニング記録
                </h2>
            }
        >
            <div className="container mx-auto py-8 px-4">
                {/* パフォーマンスデータの表示 */}
                {dataArr && dataArr.length > 0 ? (
                    <div id="excs_list" className="grid grid-cols-1 gap-6">
                        {dataArr.map((performance) => (
                            <div
                                key={performance.id}
                                className="bg-white p-4 shadow rounded-lg"
                            >
                                <ul>
                                    <li className="font-semibold text-lg">
                                        {/* performance.exercise.excs_name を使ってエクササイズ名を表示 */}
                                        {performance.exercise.excs_name}
                                    </li>
                                    <li>重さ: {performance.weight_count} kg</li>
                                    <li>回数: {performance.rep_count}</li>
                                    <li>セット数: {performance.set_count}</li>
                                    <li>所要時間: {performance.duration} 分</li>
                                    <li>
                                        <button
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                            onClick={() =>
                                                handleDelete(performance.id)
                                            }
                                        >
                                            削除
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">
                        まだ本日トレーニングをしていません
                    </p>
                )}

                {/* リンクボタン */}
                <div className="mt-6 text-center">
                    <a
                        href="/training_history"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        全ての記録を見る
                    </a>
                    <br />
                    <a
                        href="/exercises"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        種目一覧へ戻る
                    </a>
                    <br />
                    <a
                        href="/dashboard"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        マイページへ戻る
                    </a>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}