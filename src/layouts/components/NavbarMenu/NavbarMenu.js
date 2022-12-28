import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './NavbarMenu.module.scss';
import { useStore } from '~/hooks';
import { param_category_id } from '~/store/actions';

const cx = classNames.bind(styles);

function NavbarMenu() {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState('ide');

    const [, dispatch] = useStore();

    const skeletonList = [1, 2, 3, 4, 5, 6];

    useEffect(() => {
        setLoading('loading');
        fetch('https://coral-server.onrender.com/api/categories?_sort=updateAt&_order=desc&isParent=true&isMenu=true')
            .then((res) => res.json())
            .then((data) => {
                setLoading('ide');
                setMenu(data);
            });
    }, []);

    const handleClick = (categoryId) => {
        dispatch(param_category_id(categoryId));
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('menu-list')}>
                {loading === 'loading'
                    ? skeletonList.map((ske) => (
                          <Skeleton
                              key={ske}
                              style={{
                                  width: '150px',
                              }}
                          />
                      ))
                    : menu.map((menu, index) => {
                          if (index >= 7) return <></>;

                          return (
                              <li className={cx('menu-item')} key={menu.id}>
                                  <Link
                                      onClick={() => handleClick(menu.id)}
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
