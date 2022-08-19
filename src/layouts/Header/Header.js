import { useState, useRef } from 'react';

import classNames from 'classnames/bind';
import { MdOutlineCancel } from 'react-icons/md';

import styles from './Header.module.scss';
import { SearchIcon, Logo, Account, Shopping } from '~/components/Icons';
import NavbarMenu from '~/layouts/components/NavbarMenu';

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
                    <Logo />
                </div>
                <div className={cx('right-header')}>
                    <div className={cx('account')}>
                        <Account />
                        <span className={cx('account-text')}>Account</span>
                    </div>
                    <div className={cx('shopping')}>
                        <Shopping />
                        <span className={cx('shopping-text')}>Shopping</span>
                    </div>
                </div>
            </div>
            <div className={cx('line')}></div>
            <NavbarMenu />
        </div>
    );
}

export default Header;
