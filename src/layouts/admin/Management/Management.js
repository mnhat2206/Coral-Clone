import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FiLogOut } from 'react-icons/fi';

import styles from './Management.module.scss';
import {
    DashboardIcons,
    CustomersIcons,
    ProductsIcons,
    CategoriesIcons,
    OrdersIcons,
    ProfileIcons,
} from '~/components/Icons';
// import avatar from '~/asset/img/follow-on-instagram/fio1.png';
import { Link } from 'react-router-dom';
import { useStore } from '~/hooks';
import { user_logout } from '~/store/actions';

const cx = classNames.bind(styles);

function Management({ menuId, children }) {
    const [state, dispatch] = useStore();
    const user = state.user;

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(user_logout());
        navigate('/', { replace: true });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('user-container')}>
                    <img className={cx('avatar')} src={user.avatar} alt="" />
                    <span className={cx('user-name')}>{user.userName}</span>
                </div>
                <ul className={cx('menu')}>
                    {/* <li id={1} className={cx('menu-item', +menuId === 1 && 'active')}>
                        <Link to={'/admin/dashboard'} className={cx('link')}>
                            <div className={cx('item-wrapper')}>
                                <DashboardIcons />
                                <span>Dashboard</span>
                            </div>
                        </Link>
                    </li> */}
                    <li id={2} className={cx('menu-item', +menuId === 2 && 'active')}>
                        <Link to={'/admin/customers'} className={cx('link')}>
                            <div className={cx('item-wrapper')}>
                                <CustomersIcons />
                                <span>Customers</span>
                            </div>
                        </Link>
                    </li>
                    <li id={3} className={cx('menu-item', +menuId === 3 && 'active')}>
                        <Link to={'/admin/products'} className={cx('link')}>
                            <div className={cx('item-wrapper')}>
                                <ProductsIcons />
                                <span>Products</span>
                            </div>
                        </Link>
                    </li>
                    <li id={4} className={cx('menu-item', +menuId === 4 && 'active')}>
                        <Link to={'/admin/categories'} className={cx('link')}>
                            <div className={cx('item-wrapper')}>
                                <CategoriesIcons />
                                <span>Categories</span>
                            </div>
                        </Link>
                    </li>
                    {/* <li id={5} className={cx('menu-item', +menuId === 5 && 'active')}>
                        <Link to={'/admin/orders'} className={cx('link')}>
                            <div className={cx('item-wrapper')}>
                                <OrdersIcons />
                                <span>Orders</span>
                            </div>
                        </Link>
                    </li> */}
                </ul>
                <ul className={cx('menu', 'menu-bottom')}>
                    <li id={6} className={cx('menu-item', +menuId === 6 && 'active')}>
                        <Link to={'/admin/profile'} className={cx('link')}>
                            <div className={cx('item-wrapper')}>
                                <ProfileIcons />
                                <span>Profile</span>
                            </div>
                        </Link>
                    </li>
                    <li onClick={handleLogout} className={cx('menu-item')}>
                        <div className={cx('item-wrapper')}>
                            <FiLogOut />
                            <span>Logout</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={cx('main')}>{children}</div>
        </div>
    );
}

export default Management;
