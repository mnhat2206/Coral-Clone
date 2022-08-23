import classNames from 'classnames/bind';

import styles from './NavbarProduct.module.scss';
import { Filter } from '~/components/Icons';

const cx = classNames.bind(styles);

function NavbarProduct({ btnShowAll = false }) {
    const categoryApi = [
        {
            id: 1,
            categoryName: 'All Products',
        },
        {
            id: 2,
            categoryName: 'T-Shift',
        },
        {
            id: 3,
            categoryName: 'Hoodies',
        },
        {
            id: 4,
            categoryName: 'Jacket',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('category')}>
                {categoryApi.map((category, index) => {
                    return (
                        <li key={category.id} className={cx('category-item', index === 0 && 'active')}>
                            {category.categoryName}
                        </li>
                    );
                })}
            </ul>
            {!btnShowAll && (
                <button className={cx('btn-container')}>
                    <div className={cx('icon-btn')}>
                        <Filter />
                    </div>
                    <span className={cx('btn-text')}>Filter</span>
                </button>
            )}
            {btnShowAll && (
                <button className={cx('btn-container')}>
                    <span className={cx('btn-text', 'btn-show-all')}>Show All</span>
                </button>
            )}
        </div>
    );
}

export default NavbarProduct;
