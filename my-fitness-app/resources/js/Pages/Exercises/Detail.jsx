import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Detail() {
    const { auth, exercise } = usePage().props;  // auth と exercise を取得
    const user = auth ? auth.user : null;  // user が存在しない場合の対処

    const { data, setData, post, processing } = useForm({
        excs_id: exercise.id,
        date: '',
        weight: '',
        reps: '',
        sets: '',
        duration: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('performance.create'), {
            onSuccess: () => {
                // 記録成功後にパフォーマンスページへ遷移
                window.location.href = route('performance.index');
            },
        });
    };    

    return (
        <AuthenticatedLayout user={user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">エクササイズ詳細</h2>}>
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-4xl font-bold text-center text-red-500 mb-8">{exercise.excs_name}</h1>

                <div className="bg-white p-6 shadow rounded-lg">
                    <form onSubmit={submit} className="space-y-4">
                        <input type="hidden" name="excs_id" value={exercise.id} />

                        <div>
                            <label className="block font-medium">日付:</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium">重さ (kg):</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={data.weight}
                                onChange={(e) => setData('weight', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium">回数:</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={data.reps}
                                onChange={(e) => setData('reps', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium">セット数:</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={data.sets}
                                onChange={(e) => setData('sets', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium">所要時間 (分):</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                onClick={() => window.history.back()}
                            >
                                一覧へ戻る
                            </button>
                            <button
                                type="submit"
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                disabled={processing}
                            >
                                トレーニングを記録する
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}