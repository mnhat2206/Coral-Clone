import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { RiListCheck } from 'react-icons/ri';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ProductForm.module.scss';
import Field from '~/components/Field';
import Switch from '~/components/Switch';
import Button from '~/components/Button';
import PreviewImg from '~/components/PreviewImg';
import { TitleAdmin, ContainerAdmin } from '~/components/templates';
import { storage } from '~/firebase';
import Select from '~/components/Select';

const cx = classNames.bind(styles);

function ProductForm() {
    const [product, setProduct] = useState({
        price: 0,
        discount: 0,
        isActive: true,
        isNew: true,
        isBestSeller: false,
        label: '',
    });

    // Handle Select
    const [options, setOptions] = useState([]);
    // const [defaultSelect, setDefaultSelect] = useState(null);

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
        if (params.productId) {
            fetch(`https://json-server-coral.herokuapp.com/api/product/categories/?productId=${params.productId}`)
                .then((res) => res.json())
                .then((data) => {
                    setOptions(
                        data.categories.map((category) => {
                            return {
                                value: category.id,
                                label: category.name,
                            };
                        }),
                    );
                    const convertData = data.product;
                    setProduct(convertData);
                    imgSrcCurrent.current = convertData.srcImage;
                });
        } else {
            fetch(`https://json-server-coral.herokuapp.com/api/product/categories`)
                .then((res) => res.json())
                .then((data) => {
                    setOptions(
                        data.categories.map((category) => {
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
        const imageRef = ref(storage, `images/products/${id}`);
        const urlImg = await uploadBytes(imageRef, image).then((snapshot) => {
            return getDownloadURL(snapshot.ref).then((url) => {
                return url;
            });
        });

        const { name, categoryId, price, discount, isActive, isNew, isBestSeller, label } = product;
        const data = {
            id,
            name,
            categoryId,
            price: +price,
            discount: +discount,
            isActive,
            isNew,
            isBestSeller,
            srcImage: urlImg,
            label,
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        };
        fetch('https://json-server-coral.herokuapp.com/api/products', options)
            .then(() => {
                toast.success('Create is successfully', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setProduct({
                    price: 0,
                    discount: 0,
                    isActive: true,
                    isNew: true,
                    isBestSeller: false,
                });
                fileRef.current.value = null;
                setImage(null);
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
        const id = params.productId;
        let urlImg;
        const desertRef = ref(storage, `images/products/${id}`);
        if (fileRef.current.value) {
            urlImg = await uploadBytes(desertRef, image).then((snapshot) => {
                return getDownloadURL(snapshot.ref).then((url) => {
                    return url;
                });
            });
        }

        const { name, categoryId, price, discount, isActive, isNew, isBestSeller, srcImage, label } = product;
        const data = {
            name,
            categoryId,
            price: +price,
            discount: +discount,
            isActive,
            isNew,
            isBestSeller,
            srcImage: urlImg || srcImage,
            label,
        };
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        };
        fetch(`https://json-server-coral.herokuapp.com/api/products/${id}`, options)
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
        setProduct({
            ...product,
            name: e.target.value,
        });
    };
    const handleChangePrice = (e) => {
        setProduct({
            ...product,
            price: e.target.value,
        });
    };
    const handleChangeDiscount = (e) => {
        setProduct({
            ...product,
            discount: e.target.value,
        });
    };
    const handleIsActive = (e) => {
        setProduct({
            ...product,
            isActive: e.target.checked,
        });
    };
    const handleIsNew = (e) => {
        setProduct({
            ...product,
            isNew: e.target.checked,
        });
    };
    const handleIsBestSeller = (e) => {
        setProduct({
            ...product,
            isBestSeller: e.target.checked,
        });
    };

    const handleSelectChange = (e) => {
        setProduct({
            ...product,
            categoryId: e.value,
            categoryOption: {
                id: e.value,
                name: e.label,
            },
        });
    };

    const handleSelectChangeLabel = (e) => {
        setProduct({
            ...product,
            label: e.value,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <TitleAdmin title={'Product'} btnName="List" btnIcon={<RiListCheck />} linkTo="/admin/products" />
            <ContainerAdmin>
                <div className={cx('container')}>
                    <div className={cx('img-container')}>
                        <PreviewImg
                            handleClick={handleChooseFile}
                            imageSrc={image ? image.preview : product.srcImage || ''}
                        />
                        <Button btnName="Upload Image" className={cx('upload-img')} handleClick={handleChooseFile} />
                        <input ref={fileRef} onChange={handlePreviewFile} hidden type="file" />
                    </div>

                    <Field name={'Name'} value={product.name || ''} handleChange={handleChangeName} />
                    <Select
                        name="Category"
                        options={options}
                        defaultValue={product.categoryOption || {}}
                        handleSelectChange={handleSelectChange}
                    />
                    <Field type="number" name={'Price'} value={product.price} handleChange={handleChangePrice} />
                    <Field
                        type="number"
                        name={'Discount'}
                        value={product.discount}
                        handleChange={handleChangeDiscount}
                    />
                    <Select
                        name="Category"
                        options={[
                            {
                                value: 'hot',
                                label: 'hot',
                            },
                            {
                                value: 'sale',
                                label: 'sale',
                            },
                        ]}
                        defaultValue={{ id: product.label, name: product.label }}
                        handleSelectChange={handleSelectChangeLabel}
                    />
                    <Switch name={'Active'} value={product.isActive} handleChange={handleIsActive} />
                    <Switch name={'New'} value={product.isNew} handleChange={handleIsNew} />
                    <Switch name={'Best Seller'} value={product.isBestSeller} handleChange={handleIsBestSeller} />
                </div>
                <div className={cx('btn-form')}>
                    {!params.productId && (
                        <Button btnName="Save" className={cx('btn-submit')} handleClick={handleCreate} />
                    )}
                    {params.productId && (
                        <Button btnName="Save" className={cx('btn-submit')} handleClick={handleUpload} />
                    )}
                </div>
            </ContainerAdmin>
            <ToastContainer />
        </div>
    );
}

export default ProductForm;
