import { useMemo } from 'react';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ShoppingCart.module.scss';
import { Favorite, Delete } from '~/components/Icons';
import CustomSelect from '~/layouts/components/CustomSelect';
import CustomQuantity from '~/layouts/components/CustomQuantity';
import { Link } from 'react-router-dom';
import { useCart, useStore } from '~/hooks';
import { actions } from '~/store';

const cx = classNames.bind(styles);

function ShoppingCart() {
    const productToCarts = useCart();

    const size = ['XS', 'S', 'M', 'L'];
    const color = ['White', 'Black', 'Blue', 'Gray'];

    const total = useMemo(() => {
        const result = productToCarts.reduce((prevValue, currentObject) => {
            const currentValue = currentObject.price * currentObject.quantity;
            return (prevValue += currentValue);
        }, 0);
        return result;
    }, [productToCarts]);

    const [, dispatch] = useStore();

    function getParent(inputElement) {
        while (inputElement.parentElement) {
            if (inputElement.parentElement.id) {
                return inputElement.parentElement.id;
            }
            inputElement = inputElement.parentElement;
        }
    }
    const handleSave = (e) => {
        const target = e.currentTarget;
        let parentElementId = getParent(target);
        dispatch(actions.save_product_to_cart(parentElementId));
    };

    const handleDelete = (e) => {
        const target = e.currentTarget;
        let parentElementId = getParent(target);
        dispatch(actions.delete_product_to_cart(parentElementId));
    };

    const handleCheckout = () => {
        const productConfirm = productToCarts.filter((item) => item.isConfirm === true);
        if (productConfirm.length > 0) {
            dispatch(actions.proceed_to_checkout(productConfirm));
            toast.success('Checkout Success', {
                position: 'top-right',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.warn('You need to select the product you want to pay for', {
                position: 'top-right',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('cart-title')}>Cart</h3>
            <ul className={cx('cart-container')}>
                {productToCarts.map((product) => (
                    <li key={product.id} id={product.id} className={cx('cart-item')}>
                        <img className={cx('product-img')} src={product.srcImage} alt="" />
                        <div className={cx('product-wrapper')}>
                            <div className={cx('info-container')}>
                                <h4 className={cx('product-title')}>{product.title}</h4>
                                <span className={cx('product-price')}>{`$${product.price}`}</span>
                            </div>
                            <div className={cx('product-action-wrapper')}>
                                <div>
                                    <CustomSelect
                                        productId={product.id}
                                        initValue={product.size}
                                        type="size"
                                        selectList={size}
                                    />
                                    <CustomSelect
                                        productId={product.id}
                                        initValue={product.color}
                                        type="color"
                                        selectList={color}
                                    />
                                    <CustomQuantity productId={product.id} initValue={product.quantity} />
                                </div>
                                <div className={cx('action-container')}>
                                    <span
                                        onClick={handleSave}
                                        className={cx('action', 'favorite', product.isConfirm && 'active')}
                                    >
                                        <Favorite fill="currentColor" color="currentColor" />
                                        <p>Save</p>
                                    </span>
                                    <div className={cx('separate')}></div>
                                    <span onClick={handleDelete} className={cx('action', 'delete')}>
                                        <Delete />
                                        <p>Delete</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={cx('cart-footer')}>
                <span className={cx('total')}>{`Total: $${total || 0}`}</span>
                <div className={cx('button-container')}>
                    <Link to={'/jewelry'}>
                        <span className={cx('button-cart', 'button-continue')}>Continue shopping</span>
                    </Link>
                    {productToCarts.length > 0 && (
                        <span onClick={() => handleCheckout()} className={cx('button-cart', 'button-checkout')}>
                            Proceed to checkout
                        </span>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ShoppingCart;
