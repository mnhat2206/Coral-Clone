import classNames from 'classnames/bind';

import styles from './NavbarMenu.module.scss';

const cx = classNames.bind(styles);

function NavbarMenu() {
    const apiMenu = [
        'Jewelry & Accessories',
        'Clothing & Shoes',
        'Home & Living',
        'Wedding & Party',
        'Toys & Entertainment',
        'Art & Collectibles',
        'Craft Supplies & Tools',
    ];
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('menu-list')}>
                {apiMenu.map((menu, index) => {
                    return (
                        <li className={cx('menu-item')} key={index}>
                            {menu}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default NavbarMenu;
