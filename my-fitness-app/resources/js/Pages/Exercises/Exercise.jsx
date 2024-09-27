import React, { useState, useEffect } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Exercise() {
    const { auth, bodyParts = [], exercises = [] } = usePage().props;
    const user = auth ? auth.user : null;

    // エクササイズリストを管理
    const [exerciseList, setExerciseList] = useState(exercises || []);
    const [searchQuery, setSearchQuery] = useState(""); // 検索クエリ
    const [selectedPartId, setSelectedPartId] = useState(""); // 選択された部位ID

    // クエリパラメータから部位IDを取得
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        setSelectedPartId(id || "");
    }, []);

    // エクササイズ追加フォームのデータ
    const { data, setData, post, processing, reset, errors } = useForm({
        excs_name: "", // 種目名
        bdp_id: "", // 部位ID
    });

    // エクササイズ削除用のフォームフック
    const { delete: destroy } = useForm();

    // エクササイズの追加処理
    const submit = (e) => {
        e.preventDefault();

        post(route("exercises.store"), {
            onSuccess: (response) => {
                if (response.data && response.data.exercise) {
                    const newExercise = response.data.exercise;
                    setExerciseList((prevList) => [...prevList, newExercise]);
                }
                reset(); // フォームのリセット
                alert("エクササイズが正常に追加されました。");
            },
            onError: (error) => {
                if (error.response) {
                    const errorMessage = error.response.data.message || "エクササイズの追加に失敗しました。";
                    alert(`エラー: ${errorMessage}`);
                    console.error("サーバーレスポンスエラー:", error.response);
                } else {
                    alert("エクササイズの追加中に予期しないエラーが発生しました。");
                    console.error("不明なエラー:", error);
                }
            },
        });
    };

    // エクササイズ削除処理
    const handleDelete = (exerciseId) => {
        if (confirm("このエクササイズを削除しますか？")) {
            destroy(route("exercises.destroy", exerciseId), {
                onSuccess: () => {
                    setExerciseList(
                        exerciseList.filter((exercise) => exercise.id !== exerciseId)
                    );
                    alert("エクササイズが削除されました。");
                },
                onError: (error) => {
                    console.error("削除エラー:", error);
                },
            });
        }
    };

    // 検索フィルター処理
    const filteredExercises = exerciseList.filter((exercise) =>
        exercise.excs_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedPartId ? exercise.bdp_id.toString() === selectedPartId : true)
    );

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    エクササイズリスト
                </h2>
            }
        >
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* サイドバー */}
                    <div className="col-span-1">
                        <div className="bg-white p-6 shadow rounded-lg mb-8">
                            <h3 className="text-lg font-semibold mb-4 text-center">
                                部位
                            </h3>
                            <ul className="space-y-2 text-center">
                                <li>
                                    {/* 全てのエクササイズを表示するために、クエリパラメータをクリア */}
                                    <Link href="/exercises">全て</Link>
                                </li>
                                {bodyParts.length > 0 ? (
                                    bodyParts.map((part) => (
                                        <li key={part.id}>
                                            {/* 部位IDをクエリパラメータとして設定 */}
                                            <Link href={`?id=${part.id}`} className="text-red-600 hover:text-red-800">
                                                {part.bdp_name}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li>部位が見つかりません</li>
                                )}
                            </ul>
                        </div>

                        {/* エクササイズ追加フォーム */}
                        <div className="bg-white p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-center">種目を追加</h3>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block font-medium">種目名:</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={data.excs_name}
                                        onChange={(e) => setData("excs_name", e.target.value)}
                                    />
                                    {errors.excs_name && (
                                        <p className="text-red-600">{errors.excs_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block font-medium">部位:</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={data.bdp_id}
                                        onChange={(e) => setData("bdp_id", e.target.value)}
                                    >
                                        <option value="">部位を選択</option>
                                        {bodyParts.map((part) => (
                                            <option key={part.id} value={part.id}>
                                                {part.bdp_name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.bdp_id && (
                                        <p className="text-red-600">{errors.bdp_id}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                >
                                    追加
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* エクササイズリスト */}
                    <div className="col-span-3">
                        <div className="mb-4">
                            {/* 検索入力欄 */}
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="種目名を検索..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredExercises.length > 0 ? (
                                filteredExercises.map((exercise) =>
                                    exercise && exercise.id ? (
                                        <div
                                            key={exercise.id}
                                            className="bg-white p-4 shadow rounded-lg text-center relative"
                                        >
                                            <Link
                                                href={route("exercises.show", exercise.id)}
                                                className="block"
                                            >
                                                <p className="font-semibold text-lg">{exercise.excs_name}</p>
                                                <p className="text-gray-600">記録</p>
                                            </Link>
                                            <button
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                                onClick={() => handleDelete(exercise.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ) : null
                                )
                            ) : (
                                <p className="text-center col-span-3">該当するエクササイズがありません</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}