import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ProductDetail.module.scss';
import { Favorite } from '~/components/Icons';
// import { products } from '~/api/product';
import { useStore } from '~/hooks';
import { actions } from '~/store';

const cx = classNames.bind(styles);

function ProductDetail() {
    const [product, setProduct] = useState([]);
    const [color, setColor] = useState('white');
    const [size, setSize] = useState('XS');
    const [quantity, setQuantity] = useState(1);

    const getParams = useParams();
    const productId = getParams.productId;
    useEffect(() => {
        fetch(`https://json-server-coral.herokuapp.com/api/products?id=${productId}`)
            .then((res) => res.json())
            .then((data) => setProduct(data[0]));
    }, [productId]);

    const [, dispatch] = useStore();

    const handleCart = () => {
        dispatch(
            actions.add_to_cart({
                productId,
                color,
                size,
                quantity,
                isConfirm: false,
            }),
        );
        toast.success('Add to cart success', {
            position: 'top-right',
            autoClose: 600,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleColor = (e) => {
        setColor(e.currentTarget.attributes.color.value);
    };

    const handleSize = (e) => {
        setSize(e.currentTarget.attributes.sizevalue.value);
    };

    const handleChange = (e) => {
        const value = e.currentTarget.value;
        if (value > 0) {
            setQuantity(e.currentTarget.value);
        } else {
            setQuantity(1);
        }
    };

    const handleCalc = (calc) => {
        if (calc === 'plus') {
            setQuantity((prev) => prev + 1);
        } else {
            setQuantity((prev) => {
                let result = prev - 1;
                if (result < 1) return (result = 1);
                return result;
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-container')}>
                <img className={cx('image-product')} src={product.srcImage} alt="" />
            </div>
            <div className={cx('info-container')}>
                <h3 className={cx('title')}>{product.title}</h3>
                <span className={cx('sub-title')}>Color :</span>
                <div className={cx('color')}>
                    <span
                        onClick={handleColor}
                        color="white"
                        className={cx('common-border-color', 'color-white', color === 'white' && 'active')}
                    ></span>
                    <span
                        onClick={handleColor}
                        color="black"
                        className={cx('common-border-color', 'color-black', color === 'black' && 'active')}
                    ></span>
                    <span
                        onClick={handleColor}
                        color="blue"
                        className={cx('common-border-color', 'color-blue', color === 'blue' && 'active')}
                    ></span>
                    <span
                        onClick={handleColor}
                        color="gray"
                        className={cx('common-border-color', 'color-gray', color === 'gray' && 'active')}
                    ></span>
                </div>
                <span className={cx('sub-title')}>Size :</span>
                <div className={cx('size')}>
                    <span onClick={handleSize} sizevalue="XS" className={cx('size-border', size === 'XS' && 'active')}>
                        <span>XS</span>
                    </span>
                    <span onClick={handleSize} sizevalue="S" className={cx('size-border', size === 'S' && 'active')}>
                        <span>S</span>
                    </span>
                    <span onClick={handleSize} sizevalue="M" className={cx('size-border', size === 'M' && 'active')}>
                        <span>M</span>
                    </span>
                    <span onClick={handleSize} sizevalue="L" className={cx('size-border', size === 'L' && 'active')}>
                        <span>L</span>
                    </span>
                </div>
                <div className={cx('quantity-container')}>
                    <span className={cx('sub-title', 'text')}>Quantity :</span>
                    <label className={cx('action-quantity')}>
                        <span onClick={() => handleCalc('plus')} className={cx('plus')}>
                            +
                        </span>
                        <input className={cx('quantity')} onChange={handleChange} value={quantity} />
                        <span onClick={() => handleCalc('minus')} className={cx('less')}>
                            -
                        </span>
                    </label>
                </div>
                <div className={cx('btn-container')}>
                    <button onClick={() => handleCart()} className={cx('btn-action')}>
                        Add to cart
                    </button>
                    <button className={cx('btn-action')}>
                        <Favorite />
                    </button>
                </div>
                <span className={cx('sub-title')}>{`Price : $${product.discount || product.price}`}</span>
                <span className={cx('description')}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec consequat lorem. Maecenas
                    elementum at diam consequat bibendum. Mauris iaculis fringilla ex, sit amet semper libero facilisis
                    sit amet. Nunc ut aliquet metus.
                </span>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ProductDetail;
