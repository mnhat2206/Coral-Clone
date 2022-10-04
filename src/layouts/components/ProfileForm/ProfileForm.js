import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ProfileForm.module.scss';
import Field from '~/components/Field';
import Button from '~/components/Button';
import PreviewImg from '~/components/PreviewImg';
import { TitleAdmin, ContainerAdmin } from '~/components/templates';
import { storage } from '~/firebase';
import { useStore } from '~/hooks';
import { actions } from '~/store';

const cx = classNames.bind(styles);

function ProfileForm() {
    const [state, dispatch] = useStore();
    const userData = state.user;
    const [user, setUser] = useState(userData);

    const fileRef = useRef();
    // Click to choose File
    const handleChooseFile = () => {
        fileRef.current.click();
    };

    // START: Handle upload and preview image
    const [image, setImage] = useState(null);

    const handlePreviewFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setImage(file);
        }
    };

    // clear url preview image when change new image
    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
        };
    }, [image]);
    // END: Handle upload and preview image

    const handleUpdate = async () => {
        let urlImg;
        const desertRef = ref(storage, `images/users/${user.id}`);
        if (fileRef.current.value) {
            const snapshot = await uploadBytes(desertRef, image);
            urlImg = await getDownloadURL(snapshot.ref);
        }
        const data = {
            ...user,
            avatar: urlImg || user.avatar,
        };
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        };

        const res = await fetch(`https://json-server-coral.herokuapp.com/api/users/${user.id}`, options);
        try {
            const resData = await res.json();
            dispatch(actions.user_login(resData));
            toast.success('Update is successfully', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error(`Error: ${error}`, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleChangePassword = (e) => {
        setUser({
            ...user,
            password: e.target.value,
        });
    };

    const handleChangeFullName = (e) => {
        setUser({
            ...user,
            fullName: e.target.value,
        });
    };

    const handleChangePhoneNumber = (e) => {
        setUser({
            ...user,
            phoneNumber: e.target.value,
        });
    };

    const handleChangeAddress = (e) => {
        setUser({
            ...user,
            address: e.target.value,
        });
    };

    const handleChangeBirthDay = (e) => {
        setUser({
            ...user,
            birthDay: e.target.value,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <TitleAdmin title={'Profile'} hasBtn={false} />
            <ContainerAdmin>
                <div className={cx('container')}>
                    <div className={cx('img-container')}>
                        <PreviewImg
                            handleClick={handleChooseFile}
                            imageSrc={image ? image.preview : user.avatar || ''}
                        />
                        <Button btnName="Upload Image" className={cx('upload-img')} handleClick={handleChooseFile} />
                        <input ref={fileRef} onChange={handlePreviewFile} hidden type="file" />
                    </div>

                    <Field name={'User Name'} value={user.userName || ''} readOnly />
                    <Field
                        name={'Password'}
                        type="password"
                        value={user.password || ''}
                        handleChange={handleChangePassword}
                    />
                    <Field name={'Full Name'} value={user.fullName || ''} handleChange={handleChangeFullName} />
                    <Field
                        name={'Phone Number'}
                        value={user.phoneNumber || ''}
                        handleChange={handleChangePhoneNumber}
                    />
                    <Field name={'Address'} value={user.address || ''} handleChange={handleChangeAddress} />
                    <Field name={'Birth Day'} value={user.birthDay || ''} handleChange={handleChangeBirthDay} />
                </div>
                <div className={cx('btn-form')}>
                    <Button btnName="Save" className={cx('btn-submit')} handleClick={handleUpdate} />
                </div>
            </ContainerAdmin>
            <ToastContainer />
        </div>
    );
}

export default ProfileForm;
