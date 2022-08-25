import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './NavbarMenu.module.scss';

const cx = classNames.bind(styles);

function NavbarMenu() {
    const apiMenu = [
        {
            name: 'Jewelry & Accessories',
            path: '/jewelry',
        },
        {
            name: 'Clothing & Shoes',
            path: '/clothing',
        },
        {
            name: 'Home & Living',
            path: '/living',
        },
        {
            name: 'Wedding & Party',
            path: '/wedding',
        },
        {
            name: 'Toys & Entertainment',
            path: '/toys',
        },
        {
            name: 'Art & Collectibles',
            path: '/art',
        },
        {
            name: 'Craft Supplies & Tools',
            path: '/craft',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('menu-list')}>
                {apiMenu.map((menu, index) => {
                    return (
                        <li className={cx('menu-item')} key={index}>
                            <Link className={cx('')} to={menu.path}>
                                {menu.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default NavbarMenu;
