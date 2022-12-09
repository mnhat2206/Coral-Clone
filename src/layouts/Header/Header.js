import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import { SearchIcon, Logo, Account, Shopping } from '~/components/Icons';
import noProduct from '~/asset/img/shopping-cart/no-product.png';
import NavbarMenu from '~/layouts/components/NavbarMenu';
import { useStore, useDebounce } from '~/hooks';
import { user_logout } from '~/store/actions';

const cx = classNames.bind(styles);

function Header() {
    const [showInputSearch, setShowInputSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState([]);
    const [productsToCart, setProductsToCart] = useState([]);

    const searchBoxRef = useRef();

    const navigate = useNavigate();

    const debounceValue = useDebounce(searchValue);

    const [state, dispatch] = useStore();
    const user = state.user;
    const lengthObjectKey = Object.keys(user).length;

    useEffect(() => {
        if (!debounceValue.trim()) {
            setProducts([]);
            return;
        }

        fetch(`https://coral-server.onrender.com/api/products?name_like=${encodeURIComponent(debounceValue)}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.filter((item, index) => index < 5));
            });
    }, [debounceValue]);

    const handleShowSearch = (delay = true) => {
        if (delay) {
            setTimeout(() => {
                setShowInputSearch(!showInputSearch);
            }, 500);
        } else {
            setShowInputSearch(!showInputSearch);
        }
    };

    const handleToProductDetail = (e) => {
        navigate(`/${e.currentTarget.id}`, { replace: true });
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

    useEffect(() => {
        const productIdToCarts = [];
        state.carts.forEach((item) => {
            productIdToCarts.push(item.productId);
        });
        fetch(`https://coral-server.onrender.com/api/products?id=${productIdToCarts.join('&id=')}`)
            .then((res) => res.json())
            .then((data) => {
                const result = [];
                data.forEach((product) => {
                    const productLocal = state.carts.find((item) => item === product.id);
                    result.push({
                        ...productLocal,
                        ...product,
                    });
                });

                setProductsToCart(result);
            });
    }, [state.carts]);

    const handleLogout = () => {
        dispatch(user_logout());
        navigate('/', { replace: true });
    };

    const handleProfile = () => {
        navigate('/profile', { replace: true });
    };

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

                            <div className={cx('search-item')}>
                                <ul>
                                    {products.map((item) => {
                                        return (
                                            <li
                                                onClick={handleToProductDetail}
                                                key={item.id}
                                                id={item.id}
                                                className={cx('box-item')}
                                            >
                                                <img src={item.srcImage} className={cx('img-item')} alt="" />
                                                <h4 className={cx('title-item')}>{item.name}</h4>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
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
                        {lengthObjectKey < 1 && (
                            <Link to="/login" className={cx('account-text')}>
                                <Account />
                                <p>Login</p>
                            </Link>
                        )}

                        {lengthObjectKey > 0 && (
                            <span className={cx('account-text')}>
                                <Account />
                                <p>{user.userName}</p>
                            </span>
                        )}
                        {lengthObjectKey > 0 && (
                            <div className={cx('account-sub')}>
                                <ul className={cx('account-sub-list')}>
                                    <li onClick={handleProfile}>Profile</li>
                                    <li onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className={cx('shopping')}>
                        <Shopping />
                        <span className={cx('shopping-text')}>Shopping</span>
                        {/* Shopping Cart */}
                        <div className={cx('shopping-cart-container')}>
                            {productsToCart.length < 1 && <img className={cx('cart-img')} src={noProduct} alt="" />}
                            {productsToCart.length > 0 && (
                                <ul className={cx('cart-product')}>
                                    {productsToCart.map((product) => (
                                        <li key={product.id} className={cx('product-item')}>
                                            <img className={cx('product-img')} src={product.srcImage} alt="" />
                                            <div className={cx('product-description')}>
                                                <h4 className={cx('product-title')}>{product.name}</h4>
                                                <span className={cx('product-price')}>{`$${product.price}`}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {productsToCart.length > 0 && (
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
