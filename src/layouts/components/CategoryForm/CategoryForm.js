import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { RiListCheck } from 'react-icons/ri';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './CategoryForm.module.scss';
import Field from '~/components/Field';
import Switch from '~/components/Switch';
import Button from '~/components/Button';
import PreviewImg from '~/components/PreviewImg';
import { TitleAdmin, ContainerAdmin } from '~/components/templates';
import { storage } from '~/firebase';
import Select from '~/components/Select';

const cx = classNames.bind(styles);

function CategoryForm() {
    const [category, setCategory] = useState({
        name: '',
        isActive: true,
        isMenu: false,
        isMain: false,
        categoryParentId: '',
    });
    // Handle Select
    const [options, setOptions] = useState([]);

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

    // START: handle when to edit
    const imgSrcCurrent = useRef();
    const fileRef = useRef();
    const params = useParams();

    useEffect(() => {
        if (params.categoryId) {
            fetch(`https://coral-server.onrender.com/api/category/categoryParent?id=${params.categoryId}`)
                .then((res) => res.json())
                .then((data) => {
                    setOptions(
                        data.categoryParentOptions.map((category) => {
                            return {
                                value: category.id,
                                label: category.name,
                            };
                        }),
                    );
                    const convertData = data.data;
                    setCategory(convertData);
                    imgSrcCurrent.current = convertData.thumbnailUrl;
                });
        } else {
            fetch(`https://coral-server.onrender.com/api/category/categoryParent`)
                .then((res) => res.json())
                .then((data) => {
                    setOptions(
                        data.categoryParentOptions.map((category) => {
                            return {
                                value: category.id,
                                label: category.name,
                            };
                        }),
                    );
                });
        }
    }, [params]);
    // END: handle when to edit

    // create and upload file to firebase
    const handleCreate = async () => {
        const id = v4();
        let urlImg;
        const imageRef = ref(storage, `images/categories/${id}`);
        if (fileRef.current.value) {
            urlImg = await uploadBytes(imageRef, image).then((snapshot) => {
                return getDownloadURL(snapshot.ref).then((url) => {
                    return url;
                });
            });
        }

        const { name, isActive, isMenu, isMain, categoryParentId } = category;
        const data = {
            id,
            name,
            isActive,
            isMenu,
            isMain,
            thumbnailUrl: urlImg,
            categoryParentId,
            isParent: false,
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        };
        fetch('https://coral-server.onrender.com/api/categories', options)
            .then(() => {
                setCategory({
                    name: '',
                    isActive: true,
                    isMenu: false,
                    isMain: false,
                });
                toast.success('Create is successfully', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((e) => {
                toast.error(`Error: ${e}`, {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    const handleUpload = async () => {
        const id = params.categoryId;
        let urlImg;
        const desertRef = ref(storage, `images/categories/${id}`);
        if (fileRef.current.value) {
            urlImg = await uploadBytes(desertRef, image).then((snapshot) => {
                return getDownloadURL(snapshot.ref).then((url) => {
                    return url;
                });
            });
        }

        const { name, isActive, isMenu, thumbnailUrl, isMain, categoryParentId } = category;
        const data = {
            name,
            isActive,
            isMenu,
            isMain,
            thumbnailUrl: urlImg || thumbnailUrl,
            categoryParentId,
        };
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        };
        fetch(`https://coral-server.onrender.com/api/categories/${id}`, options)
            .then(() => {
                toast.success('Update is successfully', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((e) => {
                toast.error(`Error: ${e}`, {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    // Click to choose File
    const handleChooseFile = () => {
        fileRef.current.click();
    };

    // Handle input
    const handleChangeName = (e) => {
        setCategory({
            ...category,
            name: e.target.value,
        });
    };

    const handleIsActive = (e) => {
        setCategory({
            ...category,
            isActive: e.target.checked,
        });
    };
    const handleIsNew = (e) => {
        setCategory({
            ...category,
            isMenu: e.target.checked,
        });
    };

    const handleIsMain = (e) => {
        setCategory({
            ...category,
            isMain: e.target.checked,
        });
    };

    // Selected
    const handleSelectChange = (e) => {
        setCategory({
            ...category,
            categoryParentId: e.value,
            categoryParentName: {
                id: e.value,
                name: e.label,
            },
        });
    };

    return (
        <div className={cx('wrapper')}>
            <TitleAdmin title={'Category'} btnName="List" btnIcon={<RiListCheck />} linkTo="/admin/categories" />
            <ContainerAdmin>
                <div className={cx('container')}>
                    <div className={cx('img-container')}>
                        <PreviewImg
                            handleClick={handleChooseFile}
                            imageSrc={image ? image.preview : category.thumbnailUrl || ''}
                        />
                        <Button btnName="Upload Image" className={cx('upload-img')} handleClick={handleChooseFile} />
                        <input ref={fileRef} onChange={handlePreviewFile} hidden type="file" />
                    </div>

                    <Field name={'Name'} value={category.name || ''} handleChange={handleChangeName} />
                    <Select
                        name="Category"
                        options={options}
                        defaultValue={category.categoryParentName || {}}
                        handleSelectChange={handleSelectChange}
                    />

                    <Switch name={'Active'} value={category.isActive} handleChange={handleIsActive} />
                    <Switch name={'Menu'} value={category.isMenu} handleChange={handleIsNew} />
                    <Switch name={'Main'} value={category.isMain} handleChange={handleIsMain} />
                </div>
                <div className={cx('btn-form')}>
                    {!params.categoryId && (
                        <Button btnName="Save" className={cx('btn-submit')} handleClick={handleCreate} />
                    )}
                    {params.categoryId && (
                        <Button btnName="Save" className={cx('btn-submit')} handleClick={handleUpload} />
                    )}
                </div>
            </ContainerAdmin>
            <ToastContainer />
        </div>
    );
}

export default CategoryForm;
