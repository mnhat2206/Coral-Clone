import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './NavbarMenu.module.scss';
import { useStore } from '~/hooks';
import { param_category_id } from '~/store/actions';

const cx = classNames.bind(styles);

function NavbarMenu() {
    const [menu, setMenu] = useState([]);

    const [, dispatch] = useStore();

    useEffect(() => {
        fetch('https://coral-server.onrender.com/api/categories?_sort=updateAt&_order=desc&isParent=true&isMenu=true')
            .then((res) => res.json())
            .then((data) => {
                setMenu(data);
            });
    }, []);

    const handleClick = (categoryId) => {
        dispatch(param_category_id(categoryId));
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('menu-list')}>
                {menu.map((menu, index) => {
                    if (index >= 7) return <></>;

                    return (
                        <li className={cx('menu-item')} key={menu.id}>
                            <Link
                                onClick={() => handleClick(menu.id)}
                                className={cx('')}
                                to={`/category/${encodeURIComponent(menu.name)}`}
                            >
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
