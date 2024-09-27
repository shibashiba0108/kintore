import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import "../../../../css/profile.css";

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={`form-section ${className}`}>
            <header>
                <h2 className="form-header">アカウント削除</h2>
                <p className="form-description">
                    アカウントを削除すると、全てのデータが永久に削除されます。削除する前に、保存したい情報があればダウンロードしてください。
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>アカウント削除</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="form-header">
                        本当にアカウントを削除しますか？
                    </h2>
                    <p className="form-description">
                        アカウントを削除すると、全てのデータが削除されます。続行するにはパスワードを入力してください。
                    </p>
                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="パスワード" className="sr-only" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="パスワード"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton>
                        <DangerButton className="ms-3 primary" disabled={processing}>
                            アカウント削除
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}