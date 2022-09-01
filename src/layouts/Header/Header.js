import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { SearchIcon, Logo, Account, Shopping } from '~/components/Icons';
import noProduct from '~/asset/img/shopping-cart/no-product.png';
import NavbarMenu from '~/layouts/components/NavbarMenu';
import { useCart } from '~/hooks';

const cx = classNames.bind(styles);

function Header() {
    const [showInputSearch, setShowInputSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const searchBoxRef = useRef();

    const handleShowSearch = (delay = true) => {
        if (delay) {
            setTimeout(() => {
                setShowInputSearch(!showInputSearch);
            }, 500);
        } else {
            setShowInputSearch(!showInputSearch);
        }
    };

    const handleCancelSearch = () => {
        const divElement = searchBoxRef.current;
        setSearchValue('');
        divElement.style.width = 0;
        divElement.blur();
    };

    const handleChange = (e) => {
        let value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    };

    // Cart
    const productToCarts = useCart();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-wrapper')}>
                <div className={cx('search-wrapper')}>
                    {!showInputSearch && (
                        <span className={cx('icon-search')} onClick={() => handleShowSearch(false)}>
                            <SearchIcon />
                        </span>
                    )}
                    {showInputSearch && (
                        <div
                            className={cx('search-box')}
                            autoFocus
                            onBlur={() => handleShowSearch()}
                            ref={searchBoxRef}
                        >
                            <input
                                className={cx('input-search')}
                                placeholder="Search product ..."
                                value={searchValue}
                                onChange={handleChange}
                                autoFocus
                            />
                            <button className={cx('button-search')} onClick={handleCancelSearch}>
                                <MdOutlineCancel />
                            </button>
                        </div>
                    )}
                </div>
                <div className={cx('logo')}>
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className={cx('right-header')}>
                    <div className={cx('account')}>
                        <Account />
                        <span className={cx('account-text')}>Account</span>
                    </div>
                    <div className={cx('shopping')}>
                        <Shopping />
                        <span className={cx('shopping-text')}>Shopping</span>
                        {/* Shopping Cart */}
                        <div className={cx('shopping-cart-container')}>
                            {productToCarts.length < 1 && <img className={cx('cart-img')} src={noProduct} alt="" />}
                            {productToCarts.length > 0 && (
                                <ul className={cx('cart-product')}>
                                    {productToCarts.map((product) => (
                                        <li key={product.id} className={cx('product-item')}>
                                            <img className={cx('product-img')} src={product.srcImage} alt="" />
                                            <div className={cx('product-description')}>
                                                <h4 className={cx('product-title')}>{product.title}</h4>
                                                <span className={cx('product-price')}>{`$${product.price}`}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {productToCarts.length > 0 && (
                                <div className={cx('btn-cart-container')}>
                                    <Link to={'/cart'}>
                                        <button className={cx('btn-cart')}>Go to cart</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                        {/* End Shopping Cart */}
                    </div>
                </div>
            </div>
            <div className={cx('line')}></div>
            <NavbarMenu />
        </div>
    );
}

export default Header;
