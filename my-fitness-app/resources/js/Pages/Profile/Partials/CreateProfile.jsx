import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import "../../../../css/profile.css";  

export default function CreateProfile({ className = '' }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        height: '',
        weight: '',
        birthdate: '',
        gender: '',
        profile_image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.create'), {
            onSuccess: () => {
                alert('プロフィールが作成されました！'); // アラート表示
                reset(); // フォームのリセット
            },
        });
    };

    return (
        <section className={`form-section ${className}`}>
            <header>
                <h2 className="form-header">プロフィール作成</h2>
                <p className="form-description">身長や体重など現在のプロフィールを作成しましょう！</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="height" value="身長 (cm)" />
                    <TextInput
                        id="height"
                        className="mt-1 block w-full"
                        value={data.height}
                        onChange={(e) => setData('height', e.target.value)}
                        required
                        autoComplete="height"
                    />
                    <InputError className="mt-2" message={errors.height} />
                </div>

                <div>
                    <InputLabel htmlFor="weight" value="体重 (kg)" />
                    <TextInput
                        id="weight"
                        className="mt-1 block w-full"
                        value={data.weight}
                        onChange={(e) => setData("weight", e.target.value)}
                        required
                        autoComplete="weight"
                    />
                    <InputError className="mt-2" message={errors.weight} />
                </div>

                <div>
                    <InputLabel htmlFor="birthdate" value="誕生日" />
                    <TextInput
                        id="birthdate"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.birthdate}
                        onChange={(e) => setData("birthdate", e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.birthdate} />
                </div>

                <div>
                    <InputLabel htmlFor="gender" value="性別" />
                    <select
                        id="gender"
                        name="gender"
                        value={data.gender}
                        onChange={(e) => setData("gender", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">性別を選択してください</option>
                        <option value="male">男性</option>
                        <option value="female">女性</option>
                        <option value="other">その他</option>
                    </select>
                    <InputError className="mt-2" message={errors.gender} />
                </div>

                <div>
                    <InputLabel htmlFor="profile_image" value="プロフィール画像" />
                    <input
                        type="file"
                        id="profile_image"
                        name="profile_image"
                        onChange={(e) =>
                            setData("profile_image", e.target.files[0])
                        }
                        className="mt-1 block w-full"
                    />
                    <InputError
                        className="mt-2"
                        message={errors.profile_image}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton className="primary" disabled={processing}>
                        作成
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}